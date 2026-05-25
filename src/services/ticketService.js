const db = require('../config/db');
const { v4: uuidv4 } = require('uuid');

const getAllTickets = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM tickets', [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

const getTicketById = (id) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM tickets WHERE id = ?', [id], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

const createTicket = (ticketData) => {
    return new Promise((resolve, reject) => {
        const id = uuidv4();
        const { title, description, priority, status } = ticketData;
        const finalStatus = status || 'Abierto';
        const query = `INSERT INTO tickets (id, title, description, priority, status) VALUES (?, ?, ?, ?, ?)`;
        
        db.run(query, [id, title, description, priority, finalStatus], function(err) {
            if (err) reject(err);
            else resolve({ id, title, description, priority, status: finalStatus });
        });
    });
};

const updateTicket = (id, ticketData) => {
    return new Promise((resolve, reject) => {
        const { title, description, priority, status } = ticketData;
        const query = `UPDATE tickets SET title = ?, description = ?, priority = ?, status = ? WHERE id = ?`;
        
        db.run(query, [title, description, priority, status, id], function(err) {
            if (err) reject(err);
            else if (this.changes === 0) resolve(null); // Si cambios es 0, no se encontró el ticket
            else resolve({ id, title, description, priority, status });
        });
    });
};

const deleteTicket = (id) => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM tickets WHERE id = ?', [id], function(err) {
            if (err) reject(err);
            else resolve(this.changes > 0); // Retorna true si eliminó algo
        });
    });
};

module.exports = {
    getAllTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket
};