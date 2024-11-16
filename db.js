const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Create Users (Employees) table
db.run(`
    CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        employeeId TEXT UNIQUE,
        email TEXT UNIQUE,
        name TEXT,
        password TEXT
    )
`);

module.exports = db;
