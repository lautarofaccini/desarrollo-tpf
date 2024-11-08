-- ¡Atención! Este script funciona para comprobar los triggers definidos a partir de los datos que se cargan en el archivo ./esquema_y_datos_desarrollo_tpf.sql 
USE desarrollo_tpf;

-- Aviso sobre el event scheduler
SELECT 'Aviso: Asegúrate de que el programador de eventos esté activado ejecutando: SET GLOBAL event_scheduler = ON;' AS mensaje;

-- Prueba del trigger calcular_edad_al_insertar en la tabla escultores
SELECT 'Prueba: Trigger calcular_edad_al_insertar' AS mensaje;
INSERT INTO escultores (nombre, apellido, nacionalidad, fecha_nacimiento, biografia, email, telefono) VALUES
('Jay', 'Kay', 'Sudafricano', '1980-08-12', 'Escultor especializado en arte surrealista.', 'jamiroquai@space.cowboy.ar', '+56900000004');
SELECT 'Resultado: Edad calculada para nuevo escultor' AS mensaje;
SELECT * FROM escultores WHERE  email = 'jamiroquai@space.cowboy.ar';

-- Prueba del trigger calcular_edad_al_actualizar en la tabla escultores
SELECT 'Prueba: Trigger calcular_edad_al_actualizar' AS mensaje;
UPDATE escultores SET fecha_nacimiento = '1985-08-12' WHERE email = 'jamiroquai@space.cowboy.ar';
SELECT 'Resultado: Edad recalculada tras actualización de fecha de nacimiento' AS mensaje;
SELECT * FROM escultores WHERE email = 'jamiroquai@space.cowboy.ar'; 

-- Prueba del trigger fecha_inicio_unica_in en la tabla eventos
-- Este trigger debería lanzar un error si intentamos insertar un evento con el mismo año de fecha de inicio de otro evento ya existente (2024).
SELECT 'Prueba: Trigger fecha_inicio_unica_in (se espera error de año único en inicio)' AS mensaje;
INSERT INTO eventos (fecha_inicio, fecha_fin, lugar, descripcion, tematica) VALUES
('2024-07-15 10:00:00', '2024-07-15 18:00:00', 'Parque Nacional', 'Exposición de esculturas al aire libre', 'Naturaleza');

-- Prueba del trigger fecha_fin_unica_in en la tabla eventos
-- Este trigger debería lanzar un error si intentamos insertar un evento con el mismo año de fecha de fin de otro evento ya existente (2025).
SELECT 'Prueba: Trigger fecha_fin_unica_in (se espera error de año único en fin)' AS mensaje;
INSERT INTO eventos (fecha_inicio, fecha_fin, lugar, descripcion, tematica) VALUES
('2023-06-15 10:00:00', '2025-04-20 18:00:00', 'Plaza Central', 'Exposición de esculturas históricas', 'Historia');

-- Prueba del trigger check_fecha_actualizacion en la tabla eventos
-- Este trigger debería lanzar un error si intentamos actualizar un evento con una fecha de inicio o fin que coincida en el año con otro evento.
SELECT 'Prueba: Trigger check_fecha_actualizacion (se espera error de año único en inicio)' AS mensaje;
UPDATE eventos SET fecha_inicio = '2025-01-01 10:00:00' WHERE id_evento = 3;

SELECT 'Prueba: Trigger check_fecha_actualizacion (se espera error de año único en fin)' AS mensaje;
UPDATE eventos SET fecha_fin = '2025-04-15 18:00:00' WHERE id_evento = 3;

-- Prueba de la CONSTRAINT chk_fecha_valida
SELECT 'Prueba: Trigger chk_fecha_valida (se espera error de fecha de inicio mayor a la fecha de fin en la inserción)' AS mensaje;
INSERT INTO eventos (fecha_inicio, fecha_fin, lugar, descripcion, tematica) VALUES 
('2004-01-01 00:00:00', '2003-01-01 00:00:00', 'Too Cool Queenie', "She's too cool...", "Rock n' Roll"); 

SELECT 'Prueba: Trigger chk_fecha_valida (se espera error de fecha de inicio mayor a la fecha de fin en la actualización)' AS mensaje;
UPDATE eventos SET fecha_inicio = '2027-01-01' WHERE id_evento = 3;

-- Comprobamos que tenemos los mismos tres registros en nuestra base de datos
SELECT 'En caso de estar los tres registros iniciales, esta prueba resultó exitosa... ' AS mensaje; 
SELECT * FROM eventos; 
