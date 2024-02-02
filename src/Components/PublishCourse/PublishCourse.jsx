import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Styles/PublishCourse.css";

const PublishCourse = () => {
  const [userCourses, setUserCourses] = useState([]);

  useEffect(() => {
    try {
      // Retrieve the JWT token from localStorage
      const userId = localStorage.getItem("auth");

      if (userId) {
        axios
          .post("http://localhost:3001/api/fetch-user-data", {
            user_id: userId,
          })
          .then((res) => {
            setUserCourses(res.data.userData || []);
          })
          .catch((error) => {
            console.error("Error fetching user courses:", error);
          });
      }
    } catch (error) {
      console.error("Error parsing JWT token:", error);
    }
  }, []); // Empty dependency array to trigger the effect once on mount

  // Tempropary functions : delete later

  // Function to generate a random number between min and max (inclusive)
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Function to generate dummy data for the "Students Enrolled" and "Completion Rate" columns
  const generateDummyData = () => {
    return {
      studentsEnrolled: getRandomNumber(10, 100),
      completionRate: getRandomNumber(50, 100),
    };
  };

  // Tempropary functions : delete later

  // JSX rendering of the component
  return (
    <section className="publish__course">
      <div className="publish__course-header">
        <h3 className="publish__course-heading h-text ">Publish Course</h3>

        <div className="buttons">
          <div class="container-input">
            <input type="text" placeholder="Search" name="text" class="search-input" />
            <svg
              fill="#000000"
              width="20px"
              height="20px"
              viewBox="0 0 1920 1920"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z"
                fill-rule="evenodd"
              ></path>
            </svg>
          </div>
          <div className="icons">
            <div className="filter-icon">
              <i class="bx bx-filter-alt "></i>
            </div>
            <div className="order-icon">
              <i class="bx bx-objects-vertical-bottom"></i>
            </div>
          </div>
          {/* <button className="cta_button">Create Course</button> */}
        </div>
      </div>

      <div className="publish__course-details">
        <div className="content__card-full-length"></div>
        <div className="cards">
          <table className="content__card-table">
            <tbody>
              <tr>
                <th className="content__table-col-heading">Subject</th>
                <th className="content__table-col-heading">Course Name</th>
                <th className="content__table-col-heading">Total Chapters</th>
                <th className="content__table-col-heading">
                  Students Enrolled
                </th>
                <th className="content__table-col-heading">Completion Rate</th>
              </tr>
              
              {userCourses.map((course, index) => {
                const dummyData = generateDummyData(); // Generate dummy data for each course

                return (
                  <tr key={index} className="content__table">
                    <td className="content__table-data">{course.subject_name}</td>
                    <td className="content__table-data">{course.course_name}</td>
                    <td className="content__table-data">{course.total_chapters}</td>
                    <td className="content__table-data">{dummyData.studentsEnrolled}</td>
                    <td className="content__table-data">{dummyData.completionRate}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PublishCourse;
