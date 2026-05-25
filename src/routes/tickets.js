const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const authMiddleware = require('../middlewares/authMiddleware');
const validateTicket = require('../middlewares/validateTicket');

// Endpoints protegidos con authMiddleware [cite: 18]
router.use(authMiddleware);

router.get('/', ticketController.getAllTickets); // GET /tickets [cite: 83, 84]
router.get('/:id', ticketController.getTicketById); // GET /tickets/:id [cite: 85, 86]
router.post('/', validateTicket, ticketController.createTicket); // POST /tickets [cite: 87, 88]
router.put('/:id', ticketController.updateTicket); // PUT /tickets/:id [cite: 89]
router.delete('/:id', ticketController.deleteTicket); // DELETE /tickets/:id [cite: 90, 91]

module.exports = router;