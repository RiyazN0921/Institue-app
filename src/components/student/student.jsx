
import React, { useState, useEffect } from 'react';
import apiService from '../../apiservice/apiservice';

// Create Student Component
const CreateStudent = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await apiService.createStudent(formData);
            console.log('New student created:', response);

        } catch (error) {
            console.error('Error creating student:', error);
        }
    };

    return (
        <div>
            <h2>Create Student</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                <button type="submit">Create Student</button>
            </form>
        </div>
    );
};

// Get All Students Component
const StudentList = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await apiService.getStudents();
                setStudents(data);
            } catch (error) {
                console.error('Error fetching students:', error);
                // Handle error appropriately, e.g., display an error message to the user
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>All Students</h2>
            <ul>
                {students.map((student) => (
                    <li key={student._id}>
                        <strong>Name:</strong> {student.name}, <strong>Email:</strong> {student.email}
                        {/* Add other fields as needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Get Student by ID Component
const StudentDetails = ({ match }) => {
    const [student, setStudent] = useState(null);
    const studentId = match.params.id;

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const data = await apiService.getStudentById(studentId);
                setStudent(data);
            } catch (error) {
                console.error('Error fetching student:', error);
                // Handle error appropriately, e.g., display an error message to the user
            }
        };

        fetchStudent();
    }, [studentId]);

    return (
        <div>
            <h2>Student Details</h2>
            {student ? (
                <div>
                    <p>
                        <strong>Name:</strong> {student.name}
                    </p>
                    <p>
                        <strong>Email:</strong> {student.email}
                    </p>
                    {/* Add other fields as needed */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

// Update Student by ID Component
const UpdateStudent = ({ match }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        // Add other fields as needed
    });

    const studentId = match.params.id;

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const data = await apiService.getStudentById(studentId);
                setFormData(data);
            } catch (error) {
                console.error('Error fetching student:', error);
                // Handle error appropriately, e.g., display an error message to the user
            }
        };

        fetchStudent();
    }, [studentId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await apiService.updateStudent(studentId, formData);
            console.log('Student updated successfully');
            // Optionally, you can redirect the user or perform other actions upon success
        } catch (error) {
            console.error('Error updating student:', error);
            // Handle error appropriately, e.g., display an error message to the user
        }
    };

    return (
        <div>
            <h2>Update Student</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                {/* Add other input fields for additional student information as needed */}

                <button type="submit">Update Student</button>
            </form>
        </div>
    );
};

// Delete Student by ID Component
const DeleteStudent = ({ match, history }) => {
    const [student, setStudent] = useState(null);
    const studentId = match.params.id;

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const data = await apiService.getStudentById(studentId);
                setStudent(data);
            } catch (error) {
                console.error('Error fetching student:', error);
                // Handle error appropriately, e.g., display an error message to the user
            }
        };

        fetchStudent();
    }, [studentId]);

    const handleDelete = async () => {
        try {
            await apiService.deleteStudent(studentId);
            console.log('Student deleted successfully');

            history.push('/students');
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    return (
        <div>
            <h2>Delete Student</h2>
            {student ? (
                <div>
                    <p>
                        <strong>Name:</strong> {student.name}
                    </p>
                    <p>
                        <strong>Email:</strong> {student.email}
                    </p>
                    {/* Add other fields as needed */}
                    <button onClick={handleDelete}>Delete Student</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export { CreateStudent, StudentList, StudentDetails, UpdateStudent, DeleteStudent };
