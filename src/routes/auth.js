const express = require('express');
const router = express.Router();

// POST /login [cite: 80, 81]
router.post('/', (req, res) => {
    const { username, password } = req.body;
    // Login simple quemado para evaluación
    if (username === 'admin' && password === '1234') {
        res.status(200).json({ token: 'token-seguro-12345' });
    } else {
        res.status(401).json({ error: 'Credenciales inválidas' }); // 401 Acceso no autorizado [cite: 130, 131]
    }
});

module.exports = router;