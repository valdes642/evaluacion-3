    const ticketService = require('../services/ticketService');

    const getAllTickets = async (req, res) => {
        try {
            const tickets = await ticketService.getAllTickets();
            res.json(tickets);
        } catch (error) {
            res.status(500).json({ message: 'Error interno de la base de datos', error: error.message });
        }
    };

    const getTicketById = async (req, res) => {
        try {
            const ticket = await ticketService.getTicketById(req.params.id);
            if (ticket) {
                res.json(ticket);
            } else {
                res.status(404).json({ message: 'Ticket no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al consultar el ticket', error: error.message });
        }
    };

    const createTicket = async (req, res) => {
        try {
            const newTicket = await ticketService.createTicket(req.body);
            res.status(201).json(newTicket);
        } catch (error) {
            res.status(500).json({ message: 'Error al insertar el ticket en BD', error: error.message });
        }
    };

    const updateTicket = async (req, res) => {
        try {
            const updatedTicket = await ticketService.updateTicket(req.params.id, req.body);
            if (updatedTicket) {
                res.json(updatedTicket);
            } else {
                res.status(404).json({ message: 'Ticket no encontrado para actualizar' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar', error: error.message });
        }
    };

    const deleteTicket = async (req, res) => {
        try {
            const success = await ticketService.deleteTicket(req.params.id);
            if (success) {
                res.status(204).send(); // 204 significa Eliminado con éxito
            } else {
                res.status(404).json({ message: 'Ticket no encontrado' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el ticket', error: error.message });
        }
    };

    module.exports = {
        getAllTickets,
        getTicketById,
        createTicket,
        updateTicket,
        deleteTicket
    };