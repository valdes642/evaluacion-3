const express = require('express');
const router = express.Router();
// Si usas JSON Web Tokens, asegúrate de tenerlo importado: const jwt = require('jsonwebtoken');

// 1. Lista de administradores permitidos (Diferentes usuarios y contraseñas)
const administradores = [
    { username: 'victor', password: 'F1', nombre: 'Victor' },
    { username: 'Zommy', password: '1107', nombre: 'Zommy' },
    { username: 'admin', password: '1234', nombre: 'Administrador Principal' }
];

// POST /auth/login (Ajusta la ruta según cómo la llames en app.js)
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // 2. Buscar si existe un admin que coincida con esas credenciales
    const adminValido = administradores.find(
        (admin) => admin.username === username && admin.password === password
    );

    if (adminValido) {
        // Autenticación exitosa
        // Aquí deberías generar tu token si usas JWT
        // const token = jwt.sign({ username: adminValido.username }, 'tu_secreto', { expiresIn: '1h' });
        
        res.status(200).json({ 
            mensaje: `Bienvenido, ${adminValido.nombre}`,
            token: 'aqui_va_tu_token_generado',
            user: adminValido.nombre
        });
    } else {
        // Credenciales inválidas
        res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }
});

module.exports = router;