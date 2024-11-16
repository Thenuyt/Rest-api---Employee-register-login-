const db = require('../database');

const Employee = {
    create: (employee, callback) => {
        const query = `INSERT INTO employees (employeeId, name, email, password) VALUES (?, ?, ?, ?)`;
        db.run(query, [employee.employeeId, employee.name, employee.email, employee.password], callback);
    },
    delete: (employeeId, callback) => {
        const query = `DELETE FROM employees WHERE employeeId = ?`;
        db.run(query, [employeeId], callback);
    }
};

module.exports = Employee;
