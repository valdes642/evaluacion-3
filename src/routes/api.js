const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');
const { crearTicket, listarTickets, eliminarTicket, actualizarTicket } = require('../controllers/ticketController');
const { verificarToken } = require('../middlewares/authMiddleware');

router.post('/login', login);

router.get('/tickets', verificarToken, listarTickets);
router.post('/tickets', verificarToken, crearTicket);
router.delete('/tickets/:id', verificarToken, eliminarTicket);
router.put('/tickets/:id', verificarToken, actualizarTicket);

module.exports = router;