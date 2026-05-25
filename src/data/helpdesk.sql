-- 1. Crear la base de datos
CREATE DATABASE IF NOT EXISTS helpdesk;

-- 2. Seleccionar la base de datos para usarla
USE helpdesk;

-- 3. Crear la tabla de tickets con todos los campos necesarios
CREATE TABLE IF NOT EXISTS tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombreSolicitante VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    categoria ENUM('hardware', 'software', 'red', 'cuenta', 'otro') NOT NULL,
    descripcion TEXT NOT NULL,
    impacto ENUM('bajo', 'medio', 'alto') NOT NULL,
    urgencia ENUM('baja', 'media', 'alta') NOT NULL,
    tiempoEstimado INT NOT NULL,
    estado ENUM('pendiente', 'en proceso', 'resuelto') DEFAULT 'pendiente',
    prioridad VARCHAR(20) NOT NULL,
    fechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
