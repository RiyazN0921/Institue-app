// controllers/courseController.js
const Course = require('../models/Course');
const fs = require('fs');

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const {
      name,
      instructor,
      description,
      status,
      duration,
      schedule,
      location,
      prerequisites,
      syllabus,
      student,
    } = req.body;
    const studentId = student || null; 
    const thumbnailData = req.file.buffer;
    const base64Thumbnail = thumbnailData.toString('base64');

    const newCourse = new Course({
      name,
      instructor,
      description,
      status,
      duration,
      schedule,
      location,
      prerequisites,
      syllabus,
      student: studentId,
      thumbnail: `data:${req.file.mimetype};base64,${base64Thumbnail}`,
    });
    console.log(thumbnail)
    const savedCourse = await newCourse.save();

    res.status(201).json(savedCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()

    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);  // Log the error for debugging
    res.status(500).json({ error: 'Internal Server Error' });
  }
};








// Get a specific course by ID
exports.getCourseById = async (req, res) => {
  const courseId = req.params.id;

  try {
    const course = await Course.findById(courseId).populate('Student');
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a specific course by ID
exports.updateCourse = async (req, res) => {
  const courseId = req.params.id;

  try {
    const {
      name,
      instructor,
      description,
      status,
      duration,
      schedule,
      location,
      prerequisites,
      syllabus,
      student,
    } = req.body;

    const studentId = student || null;
    const thumbnailData = fs.readFileSync(req.file.path);
    const base64Thumbnail = thumbnailData.toString('base64');

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        name,
        instructor,
        description,
        status,
        duration,
        schedule,
        location,
        prerequisites,
        syllabus,
        student: studentId,
        thumbnail: `data:${req.file.mimetype};base64,${base64Thumbnail}`,
      },
      { new: true }
    );

    if (updatedCourse) {
      // Delete the temporary file after reading its content
      fs.unlinkSync(req.file.path);
      res.json(updatedCourse);
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a specific course by ID
exports.deleteCourse = async (req, res) => {
  const courseId = req.params.id;

  try {
    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (deletedCourse) {
      res.json({ message: 'Course deleted successfully' });
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
