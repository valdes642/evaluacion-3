const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Esto creará un archivo 'database.sqlite' en tu carpeta data
const dbPath = path.resolve(__dirname, '../data/database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite de HelpDesk.');
        
        // Crea la tabla automáticamente si es la primera vez que se ejecuta
        db.run(`CREATE TABLE IF NOT EXISTS tickets (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT,
            priority TEXT,
            status TEXT DEFAULT 'Abierto',
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
    }
});

module.exports = db;