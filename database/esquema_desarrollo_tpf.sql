
CREATE DATABASE IF NOT EXISTS desarrollo_tpf;
USE desarrollo_tpf;

-- Tabla de eventos
CREATE TABLE eventos (
    id_evento INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME NOT NULL,
    lugar VARCHAR(255) NOT NULL,
    descripcion TEXT,
    tematica VARCHAR(255)
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
	id_evento INT UNSIGNED NOT NULL,
	id_escultor INT UNSIGNED NOT NULL,
	CONSTRAINT fk_obras_eventos FOREIGN KEY (id_evento) REFERENCES eventos(id_evento),
	CONSTRAINT fk_obras_escultores FOREIGN KEY (id_obra) REFERENCES escultores(id_escultor),
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

-- Tabla imágenes

CREATE TABLE imagenes (
	id_imagen INT UNSIGNED AUTO_INCREMENT,
	fotografia BLOB NOT NULL,
	id_obra INT UNSIGNED,
	PRIMARY KEY(id_obra, id_imagen),
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

