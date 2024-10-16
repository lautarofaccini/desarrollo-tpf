-- Tabla de eventos
CREATE TABLE eventos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME NOT NULL,
    lugar VARCHAR(255),
    descripcion VARCHAR(300),
    tematica VARCHAR(100)
);

-- Tabla escultores
CREATE TABLE escultores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    nacionalidad VARCHAR(100),
    fecha_nacimiento DATE,
    edad INT,
    biografia VARCHAR(300),
    email VARCHAR(150),
    telefono VARCHAR(20),
    foto_perfil BLOB
);

-- Tabla obras
CREATE TABLE obras (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fecha_creacion DATE,
    descripcion TEXT,
    material VARCHAR(100),
    estilo VARCHAR(100),
    calificacion DECIMAL(3, 2)
);

-- Tabla vota
CREATE TABLE vota (
    
);

