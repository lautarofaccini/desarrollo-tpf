-- Tabla de eventos
CREATE TABLE eventos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME NOT NULL,
    lugar VARCHAR(255),
    descripcion VARCHAR(300),
    tematica VARCHAR(100)
);
