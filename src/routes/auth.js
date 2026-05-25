const express = require('express');
const router = express.Router(); // <--- ESTA ES LA LÍNEA QUE FALTABA
const db = require('../config/db'); // Importa tu conexión MySQL

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        // Consultamos la tabla 'users' que definiste en tu SQL
        const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
        const [users] = await db.query(query, [username, password]);
        
        if (users.length > 0) {
            const user = users[0];
            res.status(200).json({ 
                mensaje: `Bienvenido, ${user.nombre}`,
                token: 'token-seguro-12345',
                user: user.nombre
            });
        } else {
            res.status(401).json({ error: 'Credenciales inválidas' });
        }
    } catch (err) {
        console.error('Error en el login:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;