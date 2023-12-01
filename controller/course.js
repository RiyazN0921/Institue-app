const Course = require('../models/course');

// Controller Functions
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getCourseById = async (req, res) => {
  const courseId = req.params.id;

  try {
    const course = await Course.findById(courseId);
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createCourse = async (req, res) => {
  const {
    name, instructor, description, status, duration, schedule, location, prerequisites, syllabus
  } = req.body;

  const newCourse = new Course({
    name, instructor, description, status, duration, schedule, location, prerequisites, syllabus
  });

  try {
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateCourse = async (req, res) => {
  const courseId = req.params.id;
  const updateData = req.body;

  try {
    const updatedCourse = await Course.findByIdAndUpdate(courseId, updateData, { new: true });
    if (updatedCourse) {
      res.json(updatedCourse);
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteCourse = async (req, res) => {
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

module.exports = { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse };
