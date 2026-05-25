// app.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const ticketRoutes = require('./routes/tickets');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Sirve el frontend

// Rutas
app.use('/login', authRoutes);
app.use('/tickets', ticketRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});