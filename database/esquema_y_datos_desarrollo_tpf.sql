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


/* Carga de datos de prueba. */
-- Datos para la tabla eventos
INSERT INTO eventos (fecha_inicio, fecha_fin, lugar, descripcion, tematica) VALUES
('2024-01-15 10:00:00', '2024-01-15 18:00:00', 'Museo de Arte Moderno', 'Exposición de esculturas abstractas', 'Abstracto'),
('2025-02-20 09:00:00', '2025-04-20 17:00:00', 'Galería Nacional', 'Esculturas de temática histórica', 'Historia'),
('2026-03-10 14:00:00', '2026-06-10 20:00:00', 'Centro Cultural', 'Esculturas contemporáneas de artistas jóvenes', 'Contemporáneo');

-- Datos para la tabla escultores
INSERT INTO escultores (nombre, apellido, nacionalidad, fecha_nacimiento, biografia, email, telefono) VALUES
('Pablo', 'García', 'Argentino', '1985-07-23', 'Escultor con 15 años de experiencia en arte moderno.', 'pablo.garcia@example.com', '+541100000001'),
('María', 'López', 'Mexicana', '1990-03-12', 'Especialista en esculturas de arcilla y cerámica.', 'maria.lopez@example.com', '+525500000002'),
('Juan', 'Martínez', 'Español', '1978-11-09', 'Artista con enfoque en materiales reciclados.', 'juan.martinez@example.com', '+349100000003');

-- Datos para la tabla obras
INSERT INTO obras (fecha_creacion, descripcion, material, estilo, calificacion, id_evento, id_escultor) VALUES
('2023-01-10', 'Escultura abstracta de metal', 'Metal', 'Abstracto', 0, 1, 1),
('2022-05-15', 'Figura histórica en mármol', 'Mármol', 'Histórico', 0, 2, 2),
('2023-11-03', 'Escultura de madera inspirada en la naturaleza', 'Madera', 'Naturalista', 0, 3, 3),
('2024-04-12', 'Escultura abstracta en vidrio', 'Vidrio', 'Abstracto', 0, 1, 1),
('2023-07-08', 'Figura histórica en bronce', 'Bronce', 'Histórico', 0, 2, 2),
('2023-12-01', 'Escultura moderna de hierro', 'Hierro', 'Moderno', 0, 3, 3),
('2025-10-30', 'Figura geométrica de mármol', 'Mármol', 'Geométrico', 0, 1, 1),
('2025-11-05', 'Escultura naturalista en madera', 'Madera', 'Naturalista', 0, 2, 2),
('2024-01-19', 'Escultura abstracta de arcilla', 'Arcilla', 'Abstracto', 0, 3, 3),
('2026-02-15', 'Figura histórica con detalles dorados', 'Bronce', 'Histórico', 0, 1, 2),
('2023-06-22', 'Escultura minimalista en piedra', 'Piedra', 'Minimalista', 0, 2, 1);

-- Datos para la tabla imagenes
-- INSERT INTO imagenes (url, id_obra) VALUES
-- ('https://example.com/image1.jpg', 1),
-- ('https://example.com/image2.jpg', 2),
-- ('https://example.com/image3.jpg', 3);

-- Datos para la tabla usuarios
INSERT INTO usuarios (email, password, nickname, rol) VALUES
('admin@example.com', 'hashedpassword1', 'admin_user', 'admin'),
('user1@example.com', 'hashedpassword2', 'user1', 'user'),
('user2@example.com', 'hashedpassword3', 'user2', 'user'),
('user3@example.com', 'hashedpassword4', 'user3', 'user'),
('user4@example.com', 'hashedpassword5', 'user4', 'user'),
('user5@example.com', 'hashedpassword6', 'user5', 'user'),
('user6@example.com', 'hashedpassword7', 'user6', 'user'),
('user7@example.com', 'hashedpassword8', 'user7', 'user'),
('user8@example.com', 'hashedpassword9', 'user8', 'user'),
('user9@example.com', 'hashedpassword10', 'user9', 'user'),
('user10@example.com', 'hashedpassword11', 'user10', 'user');

-- Datos para la tabla vota
INSERT INTO vota (id_usuario, id_obra, puntaje) VALUES
(2, 1, 5), (3, 1, 4), (3, 3, 3),
(2, 4, 5), (3, 4, 4), (4, 4, 5), (5, 4, 4),
(2, 5, 3), (3, 5, 5), (6, 5, 4), (7, 5, 5),
(8, 6, 3), (9, 6, 4), (2, 6, 3), (4, 6, 4),
(2, 7, 5), (5, 7, 5), (6, 7, 4), (7, 7, 3),
(3, 8, 5), (4, 8, 4), (5, 8, 4), (8, 8, 5),
(9, 1, 3), (10, 2, 4), (8, 3, 5), (10, 3, 4);

-- Datos para la tabla participa
INSERT INTO participa (id_escultor, id_evento) VALUES
(1, 1),
(2, 2),
(3, 3);
