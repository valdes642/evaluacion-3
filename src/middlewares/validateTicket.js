// src/config/db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root', // <--- Prueba dejando esto vacío primero
    database: 'helpdesk_db'
});

const validateTicket = (req, res, next) => {
    const { nombreSolicitante, correo, categoria, descripcion, impacto, urgencia, tiempoEstimado } = req.body;
    
    // Verificamos que todos los campos requeridos estén presentes
    if (!nombreSolicitante || !correo || !categoria || !descripcion || !impacto || !urgencia || !tiempoEstimado) {
        return res.status(400).json({ 
            error: 'Faltan campos obligatorios en el formulario' 
        });
    }

    next();
};

module.exports = validateTicket;