// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  CreateStudent,
  StudentList,
  StudentDetails,
  UpdateStudent,
  DeleteStudent,
} from './components/student/student';
import {
  CreateCourse,
  CourseList,
  CourseDetails,
  UpdateCourse,
  DeleteCourse,
} from './components/course/course';

const App = () => {
  return (
    <Router>
      <div>
      <Routes>
        <Route path="/students/create" element={<CreateStudent />} />
        <Route path="/students/:id" element={<StudentDetails />} />
          <Route path="/students/:id/update" element={<UpdateStudent />} />
          <Route path="/students/:id/delete" element={<DeleteStudent />} />
          <Route path="/students" element={<StudentList />} />
          <Route path="/courses/create" element={<CreateCourse />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/courses/:id/update" element={<UpdateCourse />} />
          <Route path="/courses/:id/delete" element={<DeleteCourse />} />
          <Route path="/courses" element={<CourseList />} />
          </Routes>
      </div>
    </Router>
  );
};

export default App;
