const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type:String
  },
  email: {
    type: String,
  },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
