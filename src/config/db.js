// src/config/db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root', // <--- Prueba dejando esto vacío primero
    database: 'helpdesk_db'
});

module.exports = pool;