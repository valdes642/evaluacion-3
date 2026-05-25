const jwt = require('jsonwebtoken');
const SECRET_KEY = 'super_secret_key_123';

const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: 'Acceso no autorizado. Token requerido.' }); // [cite: 121, 130, 131]

    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(401).json({ error: 'Token inválido.' }); // [cite: 121, 130, 131]
        req.user = user;
        next();
    });
};

module.exports = { verificarToken, SECRET_KEY };