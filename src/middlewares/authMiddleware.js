const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log('Authorization header recibido:', authHeader);
    if (authHeader && authHeader === 'Bearer token-seguro-12345') {
        console.log('Autenticación exitosa');
        next();
    } else {
        console.log('Autenticación fallida');  
        res.status(401).json({ error: 'Acceso no autorizado' });
    }
};

module.exports = authMiddleware;