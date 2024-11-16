const db = require('../config/db');

// Delete an employee
exports.deleteEmployee = (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM employees WHERE id = ?`;

    db.run(query, [id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted successfully' });
    });
};
