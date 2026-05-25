const express = require('express');
const cors = require('cors');
// Agregar 'src/' a las rutas
const authRoutes = require('./src/routes/auth'); 
const ticketRoutes = require('./src/routes/tickets');

const app = express();
app.use(cors());
app.use(express.json());
// Cambiar public por src/public
app.use(express.static('src/public')); 

// Rutas
app.use('/auth', authRoutes);
app.use('/tickets', ticketRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});