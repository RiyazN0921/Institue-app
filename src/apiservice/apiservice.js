// apiService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

const apiService = {
  // Get all students
  getStudents: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/student`);
      return response.data;
    } catch (error) {
      console.error('Error getting students:', error);
      throw error;
    }
  },

  // Create a new student
  createStudent: async (formData) => {
    try {
      const response = await axios.post(`${BASE_URL}/student`, formData);
      return response.data;
    } catch (error) {
      console.error('Error creating student:', error);
      throw error;
    }
  },

  // Get a specific student by ID
  getStudentById: async (studentId) => {
    try {
      const response = await axios.get(`${BASE_URL}/student/${studentId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting student by ID:', error);
      throw error;
    }
  },

  // Update a specific student by ID
  updateStudent: async (studentId, formData) => {
    try {
      const response = await axios.put(`${BASE_URL}/student/${studentId}`, formData);
      return response.data;
    } catch (error) {
      console.error('Error updating student:', error);
      throw error;
    }
  },

  // Delete a specific student by ID
  deleteStudent: async (studentId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/student/${studentId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting student:', error);
      throw error;
    }
  },
  // Course APIs
  createCourse: async (courseData) => {
    try {
      const response = await axios.post(`${BASE_URL}/course`, courseData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllCourses: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/course/get`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getCourseById: async (courseId) => {
    try {
      const response = await axios.get(`${BASE_URL}/course/${courseId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateCourse: async (courseId, courseData) => {
    try {
      const response = await axios.put(`${BASE_URL}/course/${courseId}`, courseData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteCourse: async (courseId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/course/${courseId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default apiService;
