const Student = require('../models/student');
const Course = require('../models/course');

// Controller Functions
const getStudentEnrolledCourses = async (req, res) => {
  const studentId = req.params.id;

  try {
    const student = await Student.findById(studentId).populate('enrolledCourses');
    if (student) {
      res.json(student.enrolledCourses);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const markCourseAsCompleted = async (req, res) => {
    const studentId = req.params.studentId;
    const courseId = req.params.courseId;
  
    try {
      const student = await Student.findById(studentId);
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
  
      if (!student.enrolledCourses.includes(courseId)) {
        return res.status(404).json({ error: 'Course not found in student\'s enrolled courses' });
      }
  
      const courseIndex = student.enrolledCourses.findIndex(c => c._id.equals(courseId));
      if (courseIndex !== -1) {
        student.enrolledCourses[courseIndex].completed = true;
      }
  
      await student.save();
      res.json({ message: 'Course marked as completed' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getStudentById = async (req, res) => {
  const studentId = req.params.id;

  try {
    const student = await Student.findById(studentId);
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createStudent = async (req, res) => {
  const { name, enrolledCourses } = req.body;

  const newStudent = new Student({
    name,
    enrolledCourses,
  });

  try {
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateStudent = async (req, res) => {
  const studentId = req.params.id;
  const updateData = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(studentId, updateData, { new: true });
    if (updatedStudent) {
      res.json(updatedStudent);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteStudent = async (req, res) => {
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

module.exports = { getStudentEnrolledCourses, markCourseAsCompleted, getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent };
