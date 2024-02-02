import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../Styles/PublishCourse.css";
import { Link, useParams, useNavigate } from "react-router-dom";

const AdminAllStudents = () => {
  const { schoolId } = useParams();
  const [studentsData, setStudentsData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // fetch-students data for the specific school
    axios
      .get(`http://localhost:3001/api/fetch-students/${schoolId}`)
      .then((response) => {
        setStudentsData(response.data.studentsData);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, [schoolId]);

  useEffect(() => {
    // fetch-students data for the specific school including bank details
    axios
      .get(`http://localhost:3001/api/fetch-students-with-bank/${schoolId}`)
      .then((response) => {
        setStudentsData(response.data.studentsData);
      })
      .catch((error) => {
        console.error("Error fetching students with bank details:", error);
      });
  }, [schoolId]);


  // Function to handle row click and navigate
  const handleRowClick = (userId) => {
    navigate(`/admin/allStudents/${schoolId}/${userId}`);
  };

  // JSX rendering of the component
  return (
    <section className="publish__course">
      <div className="publish__course-header">
        <h3 className="publish__course-heading h-text ">
          Students Information
        </h3>

        <div className="buttons">
          <div class="container-input">
            <input
              type="text"
              placeholder="Search"
              name="text"
              class="search-input"
            />
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

          <Link to={`/admin/add-student/${schoolId}`}>
            {" "}
            <button className="cta_button">Add Student</button>
          </Link>
        </div>
      </div>

      <div className="publish__course-details">
        <div className="content__card-full-length"></div>
        <div className="cards">
          <table className="content__card-table">
            <tbody>
              <tr>
                <th className="content__table-col-heading">Name</th>
                <th className="content__table-col-heading">Email</th>
                <th className="content__table-col-heading">Contact Info</th>
                <th className="content__table-col-heading">SAP ID</th>
                <th className="content__table-col-heading">Aadhar Card Number</th>
                <th className="content__table-col-heading">Bank Account Number</th>
              </tr>
              {studentsData &&
                studentsData.map((student) => (
                  <tr
                    className="content__table"
                    onClick={() => handleRowClick(student.user_id)}
                    key={student.user_id}
                    style={{ cursor: "pointer" }}
                  >
                    <td className="content__table-data">
                      {student.first_name} {student.last_name}
                    </td>
                    <td className="content__table-data">
                      {student.email}
                    </td>
                    <td className="content__table-data">
                      {student.contact_number}
                    </td>
                    <td className="content__table-data">{student.sap_id}</td>
                    <td className="content__table-data">{student.aadhar_card_number}</td>
                    <td className="content__table-data">{student.account_number}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminAllStudents;
