-- ============================
--       TABLA: Usuarios
-- ============================
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol ENUM('Asesor', 'Analista') NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================
--       TABLA: Clientes
-- ============================
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(255) NOT NULL,
    documento_id VARCHAR(100) NOT NULL,
    info_adicional TEXT,
    creado_por INT NOT NULL,                         -- Usuario creador
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (creado_por) REFERENCES usuarios(id)
);

-- ============================
--       TABLA: Solicitudes
-- ============================
CREATE TABLE solicitudes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    asesor_id INT NOT NULL,                          -- Usuario asesor que la crea
    estado ENUM('Pendiente', 'En Proceso', 'Completada') NOT NULL DEFAULT 'Pendiente',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Campos movidos desde Evaluaciones:
    resultado ENUM('Aprobado', 'Rechazado'),
    puntaje_riesgo INT,
    comentarios TEXT,
    fecha_evaluacion TIMESTAMP,

    FOREIGN KEY (cliente_id) REFERENCES clientes(id),
    FOREIGN KEY (asesor_id) REFERENCES usuarios(id)
);
