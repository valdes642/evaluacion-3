const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'helpdesk' // Asegúrate de haber creado esta BD con el script anterior
});

module.exports = pool;