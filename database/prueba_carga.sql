
-- Script para cargar datos de prueba.

USE desarrollo_tpf;

-- Insertar datos en la tabla eventos
INSERT INTO eventos (fecha_inicio, fecha_fin, lugar, descripcion, tematica) VALUES
('2024-11-01 10:00:00', '2024-11-01 18:00:00', 'Museo de Arte Moderno', 'Exposición de esculturas modernas', 'Arte Moderno'),
('2024-12-15 09:00:00', '2024-12-15 17:00:00', 'Centro Cultural', 'Encuentro de escultores emergentes', 'Escultura Contemporánea');

-- Insertar datos en la tabla escultores
INSERT INTO escultores (nombre, apellido, nacionalidad, fecha_nacimiento, biografia, email, telefono) VALUES
('Pablo', 'Rodríguez', 'Argentina', '1985-05-20', 'Escultor de estilo moderno con enfoque en materiales reciclados.', 'pablo.rodriguez@example.com', '+54 9 11 1234-5678'),
('Laura', 'Martínez', 'España', '1992-08-15', 'Escultora contemporánea que explora temas de identidad y género.', 'laura.martinez@example.com', '+34 123 456 789');

-- Insertar datos en la tabla obras
INSERT INTO obras (fecha_creacion, descripcion, material, estilo, calificacion, id_evento, id_escultor) VALUES
('2022-10-10', 'Escultura abstracta de acero', 'Acero', 'Abstracto', 4.5, 1, 1),
('2023-01-15', 'Figura de mármol representando la libertad', 'Mármol', 'Clásico', 4.8, 2, 2);

-- Insertar datos en la tabla imagenes
-- INSERT INTO imagenes (fotografia, id_obra) VALUES
-- (LOAD_FILE('/ruta/al/archivo/imagen1.jpg'), 1),
-- (LOAD_FILE('/ruta/al/archivo/imagen2.jpg'), 2);

-- Insertar datos en la tabla usuarios
INSERT INTO usuarios (email, password, nickname, rol) VALUES
('admin@example.com', 'admin_password', 'admin123', 'admin'),
('user@example.com', 'user_password', 'user456', 'user');

-- Insertar datos en la tabla vota
-- INSERT INTO vota (id_usuario, id_obra, puntaje) VALUES
-- (1, 1, 5),
-- (2, 2, 4);

-- Insertar datos en la tabla participa
-- INSERT INTO participa (id_escultor, id_evento) VALUES
-- (1, 1),
-- (2, 2);
