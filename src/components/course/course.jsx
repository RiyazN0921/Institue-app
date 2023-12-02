// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import apiService from '../../apiservice/apiservice';
// Create Course Component

const CreateCourse = () => {
    const [formData, setFormData] = useState({
        name: '',
        instructor: '',
        description: '',
        status: '',
        duration: '',
        schedule: '',
        location: '',
        prerequisites: [],
        syllabus: [],
        student: '',
        thumbnail: null,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleArrayChange = (e) => {
        // For array fields, split the input by newline
        const arrayValue = e.target.value.split('\n').map((item) => item.trim());
        setFormData({
            ...formData,
            [e.target.name]: arrayValue,
        });
    };

    const handleThumbnailChange = (e) => {
        setFormData({
            ...formData,
            thumbnail: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const courseData = new FormData();
        for (const key in formData) {
            if (key === 'prerequisites' || key === 'syllabus') {
                // Handle array fields by appending each item separately
                formData[key].forEach((item, index) => {
                    courseData.append(`${key}[${index}]`, item);
                });
            } else {
                courseData.append(key, formData[key]);
            }
        }

        try {
            const response = await apiService.createCourse(courseData);
            console.log('New course created:', response);

            // Display all fields in the response
            alert(
                `Course Created Successfully!\n${JSON.stringify(response.data, null, 2)}`
            );
        } catch (error) {
            console.error('Error creating course:', error);
        }
    };

    return (
        <div>
            <h2>Create Course</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label>Instructor:</label>
                <input type="text" name="instructor" value={formData.instructor} onChange={handleChange} />

                <label>Description:</label>
                <textarea name="description" value={formData.description} onChange={handleChange}></textarea>

                <label>Status:</label>
                <input type="text" name="status" value={formData.status} onChange={handleChange} />

                <label>Duration:</label>
                <input type="text" name="duration" value={formData.duration} onChange={handleChange} />

                <label>Schedule:</label>
                <input type="text" name="schedule" value={formData.schedule} onChange={handleChange} />

                <label>Location:</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} />

                <label>Prerequisites</label>
                <textarea name="prerequisites" value={formData.prerequisites.join('\n')} onChange={handleArrayChange}></textarea>

                <label>Syllabus</label>
                <textarea name="syllabus" value={formData.syllabus.join('\n')} onChange={handleArrayChange}></textarea>

                <label>Thumbnail:</label>
                <input type="file" name="thumbnail" onChange={handleThumbnailChange} required />

                <button type="submit">Create Course</button>
            </form>
        </div>
    );
};

const CourseList = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiService.getAllCourses();
                setCourses(response);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>All Courses</h2>
            <ul>
                {courses.map((course) => (
                    <li key={course._id}>
                        <strong>Name:</strong> {course.name},
                        <strong>Instructor:</strong> {course.instructor},
                        <strong>Description:</strong> {course.description},
                        <strong>Status:</strong> {course.status},
                        <strong>Duration:</strong> {course.duration},
                        <strong>Schedule:</strong> {course.schedule},
                        <strong>Location:</strong> {course.location},
                        <strong>Prerequisites:</strong> {course.prerequisites.join(', ')},
                        <strong>Syllabus:</strong> {course.syllabus.join(', ')},
                        <strong>Student:</strong> {course.student},
                        <img src={course.thumbnail} alt={`Thumbnail for ${course.name}`} />
                    </li>
                ))}
            </ul>
        </div>
    );
};


// Get Course by ID Component
const CourseDetails = ({ match }) => {
    const [course, setCourse] = useState(null);
    const courseId = match.params.id;

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await apiService.getCourseById(courseId);
                setCourse(response);
            } catch (error) {
                console.error('Error fetching course:', error);
                // Handle error appropriately, e.g., display an error message to the user
            }
        };

        fetchCourse();
    }, [courseId]);

    return (
        <div>
            <h2>Course Details</h2>
            {course ? (
                <div>
                    <p>
                        <strong>Name:</strong> {course.name}
                    </p>
                    <p>
                        <strong>Instructor:</strong> {course.instructor}
                    </p>
                    {/* Add other fields as needed */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

//update
const UpdateCourse = ({ match }) => {
    const courseId = match.params.id;

    const [formData, setFormData] = useState({
        name: '',
        instructor: '',
        description: '',
        status: '',
        duration: '',
        schedule: '',
        location: '',
        prerequisites: [],
        syllabus: [],
        student: '',
        thumbnail: null,
    });

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await apiService.getCourseById(courseId);
                setFormData(response);
            } catch (error) {
                console.error('Error fetching course:', error);
                // Handle error appropriately, e.g., display an error message to the user
            }
        };

        fetchCourse();
    }, [courseId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleArrayChange = (e) => {
        const arrayValue = e.target.value.split('\n').map((item) => item.trim());
        setFormData({
            ...formData,
            [e.target.name]: arrayValue,
        });
    };

    const handleThumbnailChange = (e) => {
        setFormData({
            ...formData,
            thumbnail: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const courseData = new FormData();
        for (const key in formData) {
            if (key === 'prerequisites' || key === 'syllabus') {
                formData[key].forEach((item, index) => {
                    courseData.append(`${key}[${index}]`, item);
                });
            } else {
                courseData.append(key, formData[key]);
            }
        }

        try {
            const response = await apiService.updateCourse(courseId, courseData);
            console.log('Course updated successfully:', response);
            // Optionally, you can redirect the user or perform other actions upon success
        } catch (error) {
            console.error('Error updating course:', error);
            // Handle error appropriately, e.g., display an error message to the user
        }
    };

    return (
        <div>
            <h2>Update Course</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label>Instructor:</label>
                <input type="text" name="instructor" value={formData.instructor} onChange={handleChange} />

                <label>Description:</label>
                <textarea name="description" value={formData.description} onChange={handleChange}></textarea>

                <label>Status:</label>
                <input type="text" name="status" value={formData.status} onChange={handleChange} />

                <label>Duration:</label>
                <input type="text" name="duration" value={formData.duration} onChange={handleChange} />

                <label>Schedule:</label>
                <input type="text" name="schedule" value={formData.schedule} onChange={handleChange} />

                <label>Location:</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange} />

                <label>Prerequisites:</label>
                <textarea
                    name="prerequisites"
                    value={formData.prerequisites.join('\n')}
                    onChange={handleArrayChange}
                ></textarea>

                <label>Syllabus:</label>
                <textarea
                    name="syllabus"
                    value={formData.syllabus.join('\n')}
                    onChange={handleArrayChange}
                ></textarea>

                <label>Thumbnail:</label>
                <input type="file" name="thumbnail" onChange={handleThumbnailChange} required />

                <button type="submit">Update Course</button>
            </form>
        </div>
    );
};



// Delete Course by ID Component
const DeleteCourse = ({ match }) => {
    const [course, setCourse] = useState(null);
    const courseId = match.params.id;

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await apiService.getCourseById(courseId);
                setCourse(response);
            } catch (error) {
                console.error('Error fetching course:', error);
                // Handle error appropriately, e.g., display an error message to the user
            }
        };

        fetchCourse();
    }, [courseId]);

    const handleDelete = async () => {
        try {
            await apiService.deleteCourse(courseId);
            console.log('Course deleted successfully');
            // Optionally, you can redirect the user or perform other actions upon success
        } catch (error) {
            console.error('Error deleting course:', error);
            // Handle error appropriately, e.g., display an error message to the user
        }
    };

    return (
        <div>
            <h2>Delete Course</h2>
            {course ? (
                <div>
                    <p>
                        <strong>Name:</strong> {course.name}
                    </p>
                    <p>
                        <strong>Instructor:</strong> {course.instructor}
                    </p>
                    {/* Add other fields as needed */}
                    <button onClick={handleDelete}>Delete Course</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export {
    CreateCourse,
    CourseList,
    CourseDetails,
    UpdateCourse,
    DeleteCourse,
};
