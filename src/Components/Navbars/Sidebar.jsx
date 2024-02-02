// Sidebar.jsx
import React, { useState, useEffect } from "react";
import "../../Styles/Home.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ children , userRole }) => {
  const [isSidebarClosed, setSidebarClosed] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const excludedRoutes = [
    "/login",
    "/verify-otp",
    "/forgotPassword",
    "/resetPassword",
    "/course-builder"
  ];
  const shouldExcludeSidebar = excludedRoutes.includes(location.pathname);

  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (!token) {
      navigate("/login");
    } else{
      // decodeToken
    }
  }, [navigate]);

  // const handleArrowClick = (e) => {
  //   const arrowParent = e.target.parentElement.parentElement;
  //   arrowParent.classList.toggle("showMenu");
  // };

  const handleSidebarToggle = () => {
    setSidebarClosed(!isSidebarClosed);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
  };

  return (
    <div>
      {!shouldExcludeSidebar && (
        <div className={`sidebar ${isSidebarClosed ? "close" : ""}`}>
          <div className="logo-details">
            <i className="bx bx-menu" onClick={handleSidebarToggle}></i>
            <span className="logo_name">
              Knowledge<span className="light">Nest</span>
            </span>
          </div>
          <ul className="nav-links">
            {userRole === "teacher" && (
              <>
                <li>
                  <Link to="/home">
                    <i className="bx bx-home-alt"></i>
                    <span className="link_name">Home</span>
                  </Link>
                </li>
                <li>
                  <Link to="/courses">
                    <i className="bx bx-collection"></i>
                    <span className="link_name">All Courses</span>
                  </Link>
                </li>
                <li>
                  <Link to="/publish-course">
                    <i className="bx bx-grid-alt"></i>
                    <span className="link_name">Publish Course</span>
                  </Link>
                </li>
              </>
            )}
            {userRole === "admin" && (
              <>
                {/* Admin-specific links */}
                <li>
                  <Link to="/admin/home">
                    <i className="bx bx-home-alt"></i>
                    <span className="link_name">Home</span>
                  </Link>
                </li>
                <li>
                  <Link to="/admin/allSchools">
                    <i className="bx bxs-school"></i>
                    <span className="link_name">Schools</span>
                  </Link>
                </li>
              </>
            )}
            {/* ... (other common links) */}
            <li>
              <Link to="/teacher-profile">
                <i className="bx bx-info-circle"></i>
                <span className="link_name">Personal Info</span>
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={handleLogout}>
                <i className="bx bx-log-out logout_btn"></i>
                <span className="link_name">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
      {/* Main Content Section */}
      <section className="home-section">
        {/* Render the child components (e.g., Home, CourseBuilder) */}
        {children}
      </section>
    </div>
  );
};

export default Sidebar;
