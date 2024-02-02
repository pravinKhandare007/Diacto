// App.jsx
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Components/Navbars/Sidebar.jsx";
import Login from "./Components/UserLogin/Login";
import AdminLogin from "./Components/Admin/AdminLogin.jsx";
import AdminHome from "./Components/Admin/AdminHome.jsx";
import AdminAllTeachers from "./Components/Admin/AdminAllTeachers.jsx";
import AdminAddTeacher from "./Components/Admin/AdminAddTeacher.jsx";
import AdminAddStudent from "./Components/Admin/AdminAddStudent.jsx";
import ForgotPassword from "./Components/UserLogin/ForgotPassword";
import Otp from "./Components/UserLogin/Otp";
import ResetPassword from "./Components/UserLogin/ResetPassword";
import Home from "./Components/Dashboard/Home";
import AllCourses from "./Components/Dashboard/AllCourses.jsx";
import CreateCourse from "./Components/Dashboard/CreateCourse.jsx";

import TeacherProfile from "./Components/Profile/TeacherProfile.jsx";
import PublishCourse from "./Components/PublishCourse/PublishCourse.jsx";
import PublishCourseDetails from "./Components/PublishCourse/PublishCourseDetails.jsx";
import { Toaster } from "react-hot-toast";
import AdminAddSchool from "./Components/Admin/AdminAddSchool.jsx";
import AdminAllSchools from "./Components/Admin/AdminAllSchools.jsx";
import AdminAllStudents from "./Components/Admin/AdminAllStudents.jsx";
import AdminSchoolDetails from "./Components/Admin/AdminSchoolDetails.jsx";
import AdminTeacherDetails from "./Components/Admin/AdminTeacherDetails.jsx";
import AdminStudentDetails from "./Components/Admin/AdminStudentDetails.jsx";
import CourseBuilder from "./Components/CourseBuilder/CourseBuilder.jsx";

const App = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("auth");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  useEffect(() => {
    // Function to decode the JWT token
    const decodeToken = (token) => {
      const decoded = jwtDecode(token);
      return decoded;
    };

    // Fetch the token from localStorage when the component mounts
    const token = localStorage.getItem("auth");

    // If the token exists, update the userRole
    if (token) {
      const decoded = decodeToken(token);
      const role = decoded.role;

      setUserRole(role);
    }

    // Monitor changes in the token (e.g., user login/logout)
    const tokenChangeHandler = (e) => {
      const newToken = localStorage.getItem("auth");

      if (newToken) {
        const decoded = decodeToken(newToken);
        const role = decoded.role;

        setUserRole(role);
      }
    };

    // Add an event listener to handle changes in the token
    window.addEventListener("storage", tokenChangeHandler);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("storage", tokenChangeHandler);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/adminLogin" element={<AdminLogin />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<Otp />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/course-builder" element={<CourseBuilder/>} />
          <Route path="/course-builder/:courseId" element={<CourseBuilder/>} />
          {/* Wrap routes that should have the Sidebar with a Sidebar component */}
          <Route
            path="/*"
            element={
              <Sidebar userRole={userRole}>
                <Routes>
                  {/* Teacher Portal Routes */}
                  <Route path="/home" element={<Home />} />
                  <Route path="/courses" element={<AllCourses />} />
                  <Route path="/create-course" element={<CreateCourse />} />
                  <Route path="/teacher-profile" element={<TeacherProfile />} />
                  <Route path="/publish-course" element={<PublishCourse />} />
                  <Route
                    path="/publish-course-details"
                    element={<PublishCourseDetails />}
                  />

                  {/* Admin Portal Routes  */}
                  <Route path="/admin/home" element={<AdminHome />} />

                  <Route
                    path="/admin/allSchools"
                    element={<AdminAllSchools />}
                  />

                  <Route
                    path="/admin/allSchools/:schoolId"
                    element={<AdminSchoolDetails />}
                  />
                  <Route
                    path="/admin/add-school"
                    element={<AdminAddSchool />}
                  />

                  <Route
                    path="/admin/allTeachers/:schoolId"
                    element={<AdminAllTeachers />}
                  />

                  <Route
                    path="/admin/allTeachers/:schoolId/:userId"
                    element={<AdminTeacherDetails/>}
                  />

                  <Route
                    path="/admin/add-teacher/:schoolId"
                    element={<AdminAddTeacher />}
                  />

                  <Route
                    path="/admin/allStudents/:schoolId"
                    element={<AdminAllStudents />}
                  />

                  <Route
                    path="/admin/allStudents/:schoolId/:userId"
                    element={<AdminStudentDetails />}
                  />

                  <Route
                    path="/admin/add-student/:schoolId"
                    element={<AdminAddStudent />}
                  />
                </Routes>
              </Sidebar>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
