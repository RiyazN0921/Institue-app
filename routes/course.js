// routes/courseRoutes.js
const express = require('express');
const router = express.Router();
const courseController = require('../controller/course');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create a new course
router.post('/', upload.single('thumbnail'),courseController.createCourse);

// Get all courses
router.get('/get', courseController.getAllCourses);

// Get a specific course by ID
router.get('/:id', courseController.getCourseById);

// Update a specific course by ID
router.put('/:id', courseController.updateCourse);

// Delete a specific course by ID
router.delete('/:id', courseController.deleteCourse);

module.exports = router;
