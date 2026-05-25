const db = require('../data/db');
const { calcularPrioridad } = require('../services/priorityService');

const crearTicket = async (req, res) => {
    try {
        const { nombreSolicitante, correo, categoria, descripcion, impacto, urgencia, tiempoEstimado } = req.body;
        if (!nombreSolicitante || !correo || !categoria || !descripcion || !impacto || !urgencia || !tiempoEstimado) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
        const prioridad = calcularPrioridad(impacto, urgencia, categoria, tiempoEstimado);
        const [result] = await db.query(
            'INSERT INTO tickets (nombreSolicitante, correo, categoria, descripcion, impacto, urgencia, tiempoEstimado, prioridad) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [nombreSolicitante, correo, categoria, descripcion, impacto, urgencia, tiempoEstimado, prioridad]
        );
        res.status(201).json({ mensaje: 'Ticket creado', id: result.insertId, prioridad });
    } catch (error) { res.status(500).json({ error: 'Error interno' }); }
};

const listarTickets = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM tickets ORDER BY id DESC');
        res.status(200).json(rows);
    } catch (error) { res.status(500).json({ error: 'Error al obtener' }); }
};

const eliminarTicket = async (req, res) => {
    try {
        await db.query('DELETE FROM tickets WHERE id = ?', [req.params.id]);
        res.status(200).json({ mensaje: 'Ticket eliminado' });
    } catch (error) { res.status(500).json({ error: 'Error al eliminar' }); }
};

const actualizarTicket = async (req, res) => {
    try {
        const { estado } = req.body;
        await db.query('UPDATE tickets SET estado = ? WHERE id = ?', [estado, req.params.id]);
        res.status(200).json({ mensaje: 'Ticket actualizado' });
    } catch (error) { res.status(500).json({ error: 'Error al actualizar' }); }
};

module.exports = { crearTicket, listarTickets, eliminarTicket, actualizarTicket };