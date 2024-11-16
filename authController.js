const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
require('dotenv').config();

// Register a new employee
exports.register = (req, res) => {
    const { employeeId, email, name, password } = req.body;

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    const query = `INSERT INTO employees (employeeId, email, name, password) VALUES (?, ?, ?, ?)`;
    db.run(query, [employeeId, email, name, hashedPassword], function (err) {
        if (err) {
            return res.status(400).json({ error: 'Employee already exists or invalid data' });
        }
        res.status(201).json({ message: 'Registration successful' });
    });
};

// Login an existing employee
exports.login = (req, res) => {
    const { employeeId, password } = req.body;

    const query = `SELECT * FROM employees WHERE employeeId = ?`;
    db.get(query, [employeeId], (err, employee) => {
        if (err || !employee) {
            return res.status(400).json({ error: 'Invalid employee ID' });
        }

        // Compare passwords
        const isPasswordValid = bcrypt.compareSync(password, employee.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: employee.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    });
};
