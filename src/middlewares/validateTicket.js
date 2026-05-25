const validateTicket = (req, res, next) => {
    const { nombreSolicitante, correo, categoria, descripcion, impacto, urgencia, tiempoEstimado } = req.body;
    
    if (!nombreSolicitante || !correo || !categoria || !descripcion || !impacto || !urgencia || !tiempoEstimado) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' }); // 400 Error de validación [cite: 128, 129]
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        return res.status(400).json({ error: 'Formato de correo inválido' });
    }

    if (![1, 2, 3].includes(Number(impacto)) || ![1, 2, 3].includes(Number(urgencia))) {
        return res.status(400).json({ error: 'Impacto y urgencia deben ser 1 (bajo), 2 (medio) o 3 (alto)' });
    }

    next();
};
module.exports = validateTicket;