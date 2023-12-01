// controllers/studentController.js
const Student = require('../models/Student');

// Create a new student
exports.createStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('enrolledCourses');
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a specific student by ID
exports.getStudentById = async (req, res) => {
  const studentId = req.params.id;

  try {
    const student = await Student.findById(studentId).populate('enrolledCourses');
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a specific student by ID
exports.updateStudent = async (req, res) => {
  const studentId = req.params.id;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(studentId, req.body, { new: true });
    if (updatedStudent) {
      res.json(updatedStudent);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a specific student by ID
exports.deleteStudent = async (req, res) => {
  const studentId = req.params.id;

  try {
    const deletedStudent = await Student.findByIdAndDelete(studentId);
    if (deletedStudent) {
      res.json({ message: 'Student deleted successfully' });
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
