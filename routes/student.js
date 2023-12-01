// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const studentController = require('../controller/student');

// Create a new student
router.post('/', studentController.createStudent);

// Get all students
router.get('/', studentController.getAllStudents);

// Get a specific student by ID
router.get('/:id', studentController.getStudentById);

// Update a specific student by ID
router.put('/:id', studentController.updateStudent);

// Delete a specific student by ID
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
