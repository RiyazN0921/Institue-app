// controllers/courseController.js
const Course = require('../models/Course');
const fs = require('fs');

// Create a new course
exports.createCourse = async (req, res) => {
  console.log('req.body', req.body);
  console.log('req.file', req.file);

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

    // Assuming Student is a reference to the User model
    const studentId = student || null; // Set to null if it's an empty string

    const thumbnail = {
      data: req.file.buffer.toString('base64'),
      contentType: req.file.mimetype,
    };

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
      thumbnail,
    });

    const savedCourse = await newCourse.save();

    // Convert the thumbnail data to a Base64-encoded data URL
    savedCourse.thumbnail.data = `data:${savedCourse.thumbnail.contentType};base64,${savedCourse.thumbnail.data}`;

    res.status(201).json(savedCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('Student').select('-thumbnail.data'); // Exclude binary data from the thumbnail

    // Convert thumbnail data to Base64-encoded data URL for each course
    const coursesWithBase64Thumbnail = courses.map(course => ({
      ...course._doc,
      thumbnail: `data:${course.thumbnail.contentType};base64,${course.thumbnail.data}`,
    }));

    res.json(coursesWithBase64Thumbnail);
  } catch (error) {
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
    const { name, instructor, description, status, duration, schedule, location, prerequisites, syllabus, student } = req.body;
    const thumbnail = {
      data: fs.readFileSync(req.file.path),
      contentType: req.file.mimetype
    };

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      {
        name,
        instructor,
        description,
        status,
        duration,
        schedule,
        thumbnail,
        location,
        prerequisites,
        syllabus,
        Student: student
      },
      { new: true }
    );

    if (updatedCourse) {
      res.json(updatedCourse);
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
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
