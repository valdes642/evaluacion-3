const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader === 'Bearer token-seguro-12345') {
        next();
    } else {
        res.status(401).json({ error: 'Acceso no autorizado' }); // 401 [cite: 130, 131]
    }
};
module.exports = authMiddleware;