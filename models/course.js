const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: String,
  instructor: String,
  description: String,
  status: String,
  duration: String,
  schedule: String,
  thumbnail: {
    data: Buffer,  
    contentType: String
  },
  location: String,
  prerequisites: {
    type:Array
  },
  syllabus: {
    type:Array
  },
  Student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    default: null
  }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
