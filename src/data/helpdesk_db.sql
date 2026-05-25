-- 1. Crear la base de datos
CREATE DATABASE IF NOT EXISTS helpdesk_db;
USE helpdesk_db;

-- 2. Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    nombre VARCHAR(100)
);

-- 3. Crear tabla de tickets
CREATE TABLE IF NOT EXISTS tickets (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    priority VARCHAR(20),
    status VARCHAR(20) DEFAULT 'Abierto',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. Insertar tus usuarios iniciales
INSERT IGNORE INTO users (username, password, nombre) 
VALUES 
('Victor', 'F12026', 'Victor Peres'),
('Zommy', '1107', 'Zommy'),
('admin', '1234', 'Administrador Principal');


select * from users 