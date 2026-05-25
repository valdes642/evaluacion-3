const ticketService = require('../services/ticketService');

const getAllTickets = (req, res) => {
    try {
        const tickets = ticketService.getTickets();
        res.status(200).json(tickets); // 200 Operación exitosa [cite: 125, 126]
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' }); // 500 Error interno [cite: 133]
    }
};

const getTicketById = (req, res) => {
    const ticket = ticketService.getTicketById(req.params.id);
    if (ticket) {
        res.status(200).json(ticket);
    } else {
        res.status(404).json({ error: 'Ticket no encontrado' }); // 404 Recurso no encontrado [cite: 132]
    }
};

const createTicket = (req, res) => {
    try {
        const newTicket = ticketService.createTicket(req.body);
        res.status(201).json(newTicket); // 201 Recurso creado [cite: 127]
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

const updateTicket = (req, res) => {
    const updatedTicket = ticketService.updateTicket(req.params.id, req.body);
    if (updatedTicket) {
        res.status(200).json(updatedTicket);
    } else {
        res.status(404).json({ error: 'Ticket no encontrado' });
    }
};

const deleteTicket = (req, res) => {
    const success = ticketService.deleteTicket(req.params.id);
    if (success) {
        res.status(200).json({ message: 'Ticket eliminado' });
    } else {
        res.status(404).json({ error: 'Ticket no encontrado' });
    }
};

module.exports = { getAllTickets, getTicketById, createTicket, updateTicket, deleteTicket };