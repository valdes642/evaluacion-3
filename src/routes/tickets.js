const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const validateTicket = require('../middlewares/validateTicket'); // Tu middleware existente

router.get('/', ticketController.getAllTickets);
router.get('/:id', ticketController.getTicketById);
router.post('/', validateTicket, ticketController.createTicket);
router.put('/:id', validateTicket, ticketController.updateTicket);
router.delete('/:id', ticketController.deleteTicket);

module.exports = router;