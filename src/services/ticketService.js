const db = require('../config/db');

const createTicket = async (data) => {
    // Extraemos todos los campos obligatorios
    const { 
        nombreSolicitante, correo, categoria, descripcion, 
        impacto, urgencia, tiempoEstimado, estado, prioridad 
    } = data;

    // Aseguramos que la consulta tenga todas las columnas
    const query = `
        INSERT INTO tickets 
        (nombreSolicitante, correo, categoria, descripcion, impacto, urgencia, tiempoEstimado, estado, prioridad) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(query, [
        nombreSolicitante, correo, categoria, descripcion, 
        impacto, urgencia, tiempoEstimado, (estado || 'pendiente'), prioridad
    ]);
    
    return { id: result.insertId, ...data };
};

module.exports = { createTicket }; // Asegúrate de exportar la función