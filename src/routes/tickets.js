const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const validateTicket = require('../middlewares/validateTicket');
const authMiddleware = require('../middlewares/authMiddleware');

// Rutas públicas (no necesitan token)
router.get('/', ticketController.getAllTickets);
router.get('/:id', ticketController.getTicketById);

console.log('--- Depurando rutas ---');
console.log('authMiddleware es función:', typeof authMiddleware === 'function');
console.log('validateTicket es función:', typeof validateTicket === 'function');
console.log('ticketController.createTicket es función:', typeof ticketController.createTicket === 'function');

// Rutas protegidas (Añadimos authMiddleware como segundo parámetro)
router.post('/', authMiddleware, validateTicket, ticketController.createTicket);
router.put('/:id', authMiddleware, validateTicket, ticketController.updateTicket);
router.delete('/:id', authMiddleware, ticketController.deleteTicket);

module.exports = router;