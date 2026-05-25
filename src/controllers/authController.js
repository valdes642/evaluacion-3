const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../middlewares/authMiddleware');

const usuariosValidos = [
    { username: 'admin', password: '12345' },
    { username: 'soporte', password: '456' },
    { username: 'Ricardo', password: 'Genio' },
    { username: 'Victor', password: 'F1'},
    { username: 'Zommy', password: '1107' }
];

const login = (req, res) => {
    const { username, password } = req.body;
    const user = usuariosValidos.find(u => u.username === username && u.password === password);

    if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '2h' });
    res.status(200).json({ mensaje: 'Login exitoso', token });
};

module.exports = { login };