import React, { useState, useEffect } from "react";
import "../../Styles/CreateCourse.css";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const CreateCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [className, setClassName] = useState("");
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [classOptions, setClassOptions] = useState("");
  const [courseDescription, setCourseDescription] = useState("");


  const notify = () => toast.success("Course successfully created !!"); 
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch subject options from the backend when the component mounts
    axios
      .get("http://localhost:3001/api/get-subjects")
      .then((response) => setSubjectOptions(response.data.subjects))
      .catch((error) => console.error("Error fetching subjects:", error));

    // Fetch class options from the backend when the component mounts
    axios
      .get("http://localhost:3001/api/get-classes")
      .then((response) => setClassOptions(response.data.classes))
      .catch((error) => console.error("Error fetching classes:", error));
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("auth"); // Replace 'your_jwt_token_key' with your actual token key
      const response = await axios.post(
        "http://localhost:3001/api/create-course",
        {
          courseName,
          courseDescription,
          subjectId: subjectOptions.find(
            (subject) => subject.subject_name === subjectName
          )?.subject_id,
          classId: className,
          // classId: classOptions.find(
          //   (classItem) => classItem.class_name === className
          // )?.class_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ); 
      // Handle the success response as needed
      console.log(response.data);
      localStorage.setItem('courseId' , response.data.courseId );
      notify(); 

      // Redirect to '/courses' after successful creation
      navigate(`/course-builder/${response.data.courseId}`);
      // Add additional logic if required, such as redirecting to another page
    } catch (error) {
      // Handle the error response
      console.error("Error creating course:", error);
    }
  };

  return (
    <section className="create__course">
      <div className="create__course-container">
        <div className="h-text create__course-heading">Create Course</div>
        <div className="content">
          <form onSubmit={handleSubmit}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Course Name</span>
                <input
                  type="text"
                  placeholder="Ex: Chemistry Basics"
                  required
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </div>
              <div className="input-box">
                <span className="details">Subject Name</span>
                <select
                  name="subject"
                  required
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                >
                  <option disabled value="">
                    Select subject
                  </option>
                  {subjectOptions.map((subject) => (
                    <option
                      key={subject.subject_id}
                      value={subject.subject_name}
                    >
                      {subject.subject_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-box">
                <span className="details">Class Name</span>
                <select
                  name="class"
                  required
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                >
                  <option disabled value="">
                    Select class
                  </option>
                  {Array.isArray(classOptions) &&
                    classOptions.map((classItem) => (
                      <option
                        key={classItem.class_id}
                        value={classItem.class_id}
                      >
                        {classItem.class_name}
                      </option>
                    ))}
                </select>
              </div>

              <div
                className="input-box"
                style={{ display: "block", width: "100%", marginTop: "1rem" }}
              >
                <span className="details">Course Description</span>
                <input
                  type="text"
                  placeholder="Ex: Understanding chemical reactions"
                  maxLength="255"
                  required
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                />
              </div>
            </div>
            {/* <Link to='/courses'> */}
            <button type="submit" className="primary_cta_button">
              Create Course
            </button>
            {/* </Link> */}
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateCourse;