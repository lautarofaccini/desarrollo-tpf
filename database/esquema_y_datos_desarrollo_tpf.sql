DROP DATABASE IF EXISTS desarrollo_tpf;
CREATE DATABASE IF NOT EXISTS desarrollo_tpf;
USE desarrollo_tpf;

-- Tabla de eventos
CREATE TABLE eventos (
    id_evento INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME NOT NULL,
    lugar VARCHAR(255) NOT NULL,
    descripcion TEXT,
    tematica VARCHAR(255),
    estado ENUM('activo', 'pausado', 'finalizado', 'inactivo') DEFAULT 'inactivo',
		CONSTRAINT chk_fecha_valida CHECK (fecha_inicio < fecha_fin)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

-- Tabla escultores
CREATE TABLE escultores (
    id_escultor INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    nacionalidad VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    edad INT COMMENT 'Atributo derivado.',
    biografia TEXT NOT NULL,
    email VARCHAR(150),
    telefono VARCHAR(20),
    foto_perfil BLOB
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

-- Tabla obras
CREATE TABLE obras (
  id_obra INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  fecha_creacion DATE,
  descripcion TEXT,
  material VARCHAR(100),
  estilo VARCHAR(100),
  calificacion DECIMAL(3, 2),
	id_evento INT UNSIGNED,
	id_escultor INT UNSIGNED NOT NULL,
	CONSTRAINT fk_obras_eventos FOREIGN KEY (id_evento) REFERENCES eventos(id_evento) ON DELETE SET NULL,
	CONSTRAINT fk_obras_escultores FOREIGN KEY (id_escultor) REFERENCES escultores(id_escultor)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

-- Tabla imágenes
CREATE TABLE imagenes (
	id_imagen INT UNSIGNED AUTO_INCREMENT,
	url VARCHAR(255),
	id_obra INT UNSIGNED,
	PRIMARY KEY(id_imagen, id_obra),
	CONSTRAINT fk_imagenes_obras FOREIGN KEY (id_obra) REFERENCES obras(id_obra) ON DELETE CASCADE ON UPDATE CASCADE
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

-- Tabla usuarios
CREATE TABLE usuarios (
	id_usuario INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	email VARCHAR(100) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	nickname VARCHAR(30) NOT NULL UNIQUE,
	rol ENUM('admin', 'user') NOT NULL
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

-- Tabla vota
CREATE TABLE vota (
	id_usuario INT UNSIGNED,
	id_obra INT UNSIGNED,
	puntaje TINYINT NOT NULL,
	PRIMARY KEY (id_usuario, id_obra),
	CONSTRAINT fk_vota_usuarios FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
	CONSTRAINT fk_vota_obras FOREIGN KEY (id_obra) REFERENCES obras(id_obra),
	CONSTRAINT chk_puntaje CHECK (puntaje BETWEEN 1 AND 5)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

-- Tabla participa
CREATE TABLE participa (
	id_escultor INT UNSIGNED,
	id_evento INT UNSIGNED,
	PRIMARY KEY (id_escultor, id_evento),
	CONSTRAINT fk_participa_escultor FOREIGN KEY (id_escultor) REFERENCES escultores(id_escultor),
	CONSTRAINT fk_participa_evento FOREIGN KEY (id_evento) REFERENCES eventos(id_evento)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

/* Trigger que calcula la edad de un escultor cada vez que se registre uno en la base de datos. */ 
DELIMITER $$
CREATE TRIGGER calcular_edad_al_insertar
BEFORE INSERT ON escultores
FOR EACH ROW
BEGIN
	SET NEW.edad = TIMESTAMPDIFF(YEAR, NEW.fecha_nacimiento, CURDATE());
END $$
DELIMITER ;

/* Trigger que calcula la edad de un escultor cada vez que se actualice la fecha de nacimiento de uno en la base de datos. */ 
DELIMITER $$
CREATE TRIGGER calcular_edad_al_actualizar
BEFORE UPDATE ON escultores
FOR EACH ROW
BEGIN
	IF NEW.fecha_nacimiento <> OLD.fecha_nacimiento THEN
		SET NEW.edad = TIMESTAMPDIFF(YEAR, NEW.fecha_nacimiento, CURDATE());
	END IF;
END $$
DELIMITER ;

/* Evento para calcular la edad. */
CREATE EVENT IF NOT EXISTS actualizar_edad_escultores
ON SCHEDULE EVERY 1 YEAR
STARTS NOW()
DO
	UPDATE escultores
	SET edad = TIMESTAMPDIFF(YEAR, fecha_nacimiento, CURDATE());

/* Trigger para controlar que no se repita la fecha de inicio en la inserción. */ 
DELIMITER $$ 
CREATE TRIGGER fecha_inicio_unica_in
BEFORE INSERT ON eventos
FOR EACH ROW 
BEGIN 
	IF (SELECT COUNT(*) FROM eventos WHERE YEAR(fecha_inicio) = YEAR(NEW.fecha_inicio)) > 0 THEN 
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El año de inicio debe ser único.';
	END IF;
END $$ 
DELIMITER ;

/* Trigger para controlar que nose repita la fecha de fin del evento inserción. */ 
DELIMITER $$ 
CREATE TRIGGER fecha_fin_unica_in
BEFORE INSERT ON eventos
FOR EACH ROW 
BEGIN 
	IF (SELECT COUNT(*) FROM eventos WHERE YEAR(fecha_fin) = YEAR(NEW.fecha_fin)) > 0 THEN 
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El año de fin debe ser único.';
	END IF;
END $$ 
DELIMITER ; 

/* Trigger que controla la fecha de inicio y de fin en la actualización. */
DELIMITER $$

CREATE TRIGGER check_fecha_actualizacion
BEFORE UPDATE ON eventos
FOR EACH ROW
BEGIN
    -- Verificar si la nueva fecha de inicio coincide con alguna otra fecha de inicio en la tabla
    IF EXISTS (
        SELECT 1
        FROM eventos
        WHERE YEAR(fecha_inicio) = YEAR(NEW.fecha_inicio) AND id_evento != NEW.id_evento
    ) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El año de inicio debe ser único.';
    END IF;

    -- Verificar si la nueva fecha de fin coincide con alguna otra fecha de fin en la tabla
    IF EXISTS (
        SELECT 1
        FROM eventos
        WHERE YEAR(fecha_fin) = YEAR(NEW.fecha_fin) AND id_evento != NEW.id_evento
    ) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El año de fin debe ser único.';
    END IF;
END $$

DELIMITER ;

/* Procedimiento para ver todas las obras de un evento. */ 
DELIMITER $$ 

CREATE PROCEDURE obras_del_evento (IN evento_id INT)
BEGIN 
	SELECT * FROM obras AS o WHERE o.id_evento = evento_id;
END $$

DELIMITER ;

/* Procedimiento para calcular las calificaciones de las obras dado un evento. */
DELIMITER $$

CREATE PROCEDURE calcular_calificacion_evento (IN evento_id INT)
BEGIN
    DECLARE promedio_calificacion DECIMAL(10, 2);

    -- Itera sobre cada obra asociada al evento y calcula su calificación promedio
    DECLARE done INT DEFAULT 0;
    DECLARE obra_id INT;

    -- Cursor para seleccionar todas las obras asociadas al evento dado
    DECLARE cur_obras CURSOR FOR
        SELECT id_obra FROM obras WHERE id_evento = evento_id;

    -- Manejo de finalización del cursor
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    -- Abrir cursor
    OPEN cur_obras;

    -- Iterar sobre cada obra
    obra_loop: LOOP
        FETCH cur_obras INTO obra_id;
        IF done THEN
            LEAVE obra_loop;
        END IF;

        -- Calcular el promedio de puntaje para la obra actual
        SELECT AVG(puntaje) INTO promedio_calificacion
        FROM vota
        WHERE id_obra = obra_id;

        -- Actualizar la calificación de la obra con el promedio calculado
        UPDATE obras
        SET calificacion = IFNULL(promedio_calificacion, 0) -- 0 si no hay votos
        WHERE id_obra = obra_id;
    END LOOP;

    -- Cerrar cursor
    CLOSE cur_obras;
END $$

DELIMITER ;

/* Trigger para controlar que un escultor no participe con más de una obra en un evento. */ 
DELIMITER $$

CREATE TRIGGER trg_no_duplicar_obra_evento
BEFORE INSERT ON obras
FOR EACH ROW
BEGIN
    DECLARE contador INT;

    -- Contamos cuántas obras tiene el escultor en el mismo evento
    SELECT COUNT(*)
    INTO contador
    FROM obras
    WHERE id_evento = NEW.id_evento
      AND id_escultor = NEW.id_escultor;

    -- Si ya existe al menos una obra en el mismo evento, lanzamos un error
    IF contador > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: El escultor ya tiene una obra en este evento.';
    END IF;
END $$

DELIMITER ;

/* Triggers para controlar que solamente haya un evento activo. */ 
DELIMITER $$

CREATE TRIGGER tgr_evento_activo_actualizacion BEFORE UPDATE ON eventos FOR EACH ROW
BEGIN
    -- Verificar si el estado está cambiando a 'activo'
    IF NEW.estado = 'activo' THEN
        -- Contar la cantidad de eventos que ya están activos, excluyendo el que se está actualizando
        IF (SELECT COUNT(*) FROM eventos WHERE estado = 'activo' AND id_evento != NEW.id_evento) > 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No se puede activar este evento porque ya existe otro evento activo.';
        END IF;
    END IF;
END;
$$

CREATE TRIGGER tgr_evento_activo_insercion BEFORE INSERT ON eventos FOR EACH ROW
BEGIN
    -- Verificar si se está intentando insertar un evento con el estado 'activo'
    IF NEW.estado = 'activo' THEN
        -- Contar la cantidad de eventos que ya están activos
        IF (SELECT COUNT(*) FROM eventos WHERE estado = 'activo') > 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No se puede insertar este evento porque ya existe otro evento activo.';
        END IF;
    END IF;
END;
$$

DELIMITER ;

/* Creación de índices. */
CREATE INDEX idx_eventos ON eventos (estado);

/* Cargamos datos de prueba en la base de datos. */
-- Inserción de datos en la tabla `eventos`
INSERT INTO eventos (fecha_inicio, fecha_fin, lugar, descripcion, tematica) VALUES
('2023-01-15 10:00:00', '2023-01-20 18:00:00', 'Museo de Arte Abstracto', 'Exposición de esculturas abstractas.', 'Abstracto'),
('2024-01-15 10:00:00', '2024-01-20 18:00:00', 'Museo de Arte Moderno', 'Exposición de esculturas contemporáneas.', 'Contemporáneo'),
('2025-03-10 09:00:00', '2025-03-15 17:00:00', 'Centro Cultural Nacional', 'Festival de arte y cultura.', 'Arte Urbano');

-- Inserción de datos en la tabla `escultores`
INSERT INTO escultores (nombre, apellido, nacionalidad, fecha_nacimiento, biografia, email, telefono, foto_perfil) VALUES
('Juan', 'Pérez', 'Argentino', '1980-06-05', 'Escultor contemporáneo con múltiples exposiciones internacionales.', 'juan.perez@example.com', '+54 9 11 1234 5678', NULL),
('María', 'García', 'Española', '1975-08-22', 'Escultora especializada en obras abstractas.', 'maria.garcia@example.com', '+34 6 789 1234', NULL),
('Carlos', 'Gomez', 'Mexicano', '1990-02-14', 'Artista emergente en el ámbito de las esculturas de materiales reciclados.', 'carlos.gomez@example.com', '+52 55 8765 4321', NULL),
('Ana', 'López', 'Chilena', '1985-03-19', 'Escultora que trabaja con arcilla y técnicas de modelado innovadoras.', 'ana.lopez@example.com', '+56 9 8765 4321', NULL),
('Diego', 'Ramírez', 'Peruano', '1978-11-11', 'Escultor reconocido por su trabajo en mármol.', 'diego.ramirez@example.com', '+51 1 2345 6789', NULL);

-- Inserción de datos en la tabla `obras`
INSERT INTO obras (fecha_creacion, descripcion, material, estilo, id_evento, id_escultor) VALUES
('2023-05-01', 'Escultura de madera tallada con forma abstracta.', 'Madera', 'Abstracto', 1, 1),
('2022-11-10', 'Escultura de metal en forma de espiral.', 'Metal', 'Moderno', 1, 2),
('2023-07-15', 'Escultura hecha con botellas recicladas.', 'Reciclado', 'Sostenible', 1, 3),
('2024-01-20', 'Escultura en arcilla inspirada en formas naturales.', 'Arcilla', 'Orgánico', 1, 4),
('2024-01-22', 'Escultura de mármol blanco con diseño minimalista.', 'Mármol', 'Minimalista', 1, 5),
('2023-03-20', 'Escultura de bronce inspirada en figuras mitológicas.', 'Bronce', 'Clásico', 2, 1),
('2023-08-14', 'Escultura en vidrio de forma geométrica.', 'Vidrio', 'Geometría', 2, 2),
('2024-02-01', 'Escultura hecha con materiales reciclados y luces LED.', 'Reciclado', 'Experimental', 2, 3),
('2023-12-10', 'Escultura en cerámica policromada.', 'Cerámica', 'Colorido', 2, 4),
('2023-10-05', 'Escultura abstracta en piedra negra.', 'Piedra', 'Abstracto', 2, 5);

-- Inserción de datos en la tabla `imagenes`
INSERT INTO imagenes (url, id_obra) VALUES
('https://example.com/imagen1.jpg', 1),
('https://example.com/imagen2.jpg', 2),
('https://example.com/imagen3.jpg', 3),
('https://example.com/imagen4.jpg', 4),
('https://example.com/imagen5.jpg', 5),
('https://example.com/imagen6.jpg', 6),
('https://example.com/imagen7.jpg', 7),
('https://example.com/imagen8.jpg', 8),
('https://example.com/imagen9.jpg', 9),
('https://example.com/imagen10.jpg', 10);

-- Inserción de datos en la tabla `usuarios`
INSERT INTO usuarios (email, password, nickname, rol) VALUES
('admin@example.com', 'hashed_password1', 'admin_user', 'admin'),
('user1@example.com', 'hashed_password2', 'user1', 'user'),
('user2@example.com', 'hashed_password3', 'user2', 'user');

-- Inserción de datos en la tabla `vota`
INSERT INTO vota (id_usuario, id_obra, puntaje) VALUES
(2, 1, 4),
(3, 1, 5),
(2, 2, 3),
(3, 3, 5),
(2, 4, 4),
(3, 5, 5),
(2, 6, 3),
(3, 7, 5),
(2, 8, 4),
(3, 9, 5);

-- Inserción de datos en la tabla `participa`
INSERT INTO participa (id_escultor, id_evento) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(1, 2),
(2, 2),
(3, 2),
(4, 2),
(5, 2);
