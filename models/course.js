const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: String,
  instructor: String,
  description: String,
  status: String,
  duration: String,
  schedule: String,
  location: String,
  prerequisites: String,
  syllabus: String,
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
