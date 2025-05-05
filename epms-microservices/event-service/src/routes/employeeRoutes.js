const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Create
router.post('/', employeeController.createEmployee);

// Read
router.get('/', employeeController.getAllEmployees);
router.get('/:id', employeeController.getEmployeeById);

// Update
router.put('/:id', employeeController.updateEmployee);

// Delete
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
