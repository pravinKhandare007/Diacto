import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../../Styles/AdminSchoolDetails.css";

const AdminSchoolDetails = () => {
  const { schoolId } = useParams();
  const [schoolDetails, setSchoolDetails] = useState(null);

  const [userCounts, setUserCounts] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch school details using schoolId
    axios
      .get(`http://localhost:3001/api/fetch-school-data/${schoolId}`)
      .then((response) => {
        setSchoolDetails(response.data.schoolDetails);
      })
      .catch((error) => {
        console.error("Error fetching school details:", error);
      });

    // Fetch user counts using schoolId
    axios
      .get(`http://localhost:3001/api/fetch-user-counts/${schoolId}`)
      .then((response) => {
        setUserCounts(response.data.userCounts);
      })
      .catch((error) => {
        console.error("Error fetching user counts:", error);
      });
  }, [schoolId]);

  const data = [
    { columnName: "School Name", columnKey: "school_name" },
    { columnName: "School Address", columnKey: "school_address" },
    {
      columnName: "School Document Number",
      columnKey: "school_document_number",
    },
    { columnName: "Principal Name", columnKey: "principal_name" },
    { columnName: "City", columnKey: "city" },
    { columnName: "State", columnKey: "state" },
    { columnName: "Zip Code", columnKey: "zip_code" },
    { columnName: "Contact Number", columnKey: "contact_number" },
    { columnName: "Alternative Number", columnKey: "alternative_number" },
  ];

  const replacePlaceholders = (string, dataObject) => {
    return string.replace(/{(\w+)}/g, (match, key) => dataObject[key] || "N/A");
  };

  return (
    <section className="publish__course">
      <div className="publish__course-header">
        <h3 className="publish__course-heading h-text">School Information</h3>
        <div className="buttons">
          <Link to="/admin/add-school">
            <button className="cta_button">Add School</button>
          </Link>
        </div>
      </div>

      <div>
        {schoolDetails ? (
          <div className="school__details">
            <div className="school__details-container">
              <div className="school__details__card__left">
                <div className="school__details__card__information">
                  <div className="information-column">
                    <h3 className="column-heading">School ID</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{school_id}", schoolDetails)}
                    </p>
                  </div>
                </div>
                <div className="school__details__card__information">
                  <div className="information-column">
                    <h3 className="column-heading">School Address</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{school_address}", schoolDetails)}
                    </p>
                  </div>
                </div>
                <div className="school__details__card__information">
                  <div className="information-column">
                    <h3 className="column-heading">School Document Number</h3>
                    <p className="column-detail">
                      {replacePlaceholders(
                        "{school_document_number}",
                        schoolDetails
                      )}
                    </p>
                  </div>
                </div>
                <div className="school__details__card__information">
                  <div className="information-column">
                    <h3 className="column-heading">City</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{city}", schoolDetails)}
                    </p>
                  </div>
                </div>
                <div className="school__details__card__information">
                  <div className="information-column">
                    <h3 className="column-heading">State</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{state}", schoolDetails)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="school__details__card__right">
                <div className="school__details__card__information">
                  <div className="information-column">
                    <h3 className="column-heading">School Name</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{school_name}", schoolDetails)}
                    </p>
                  </div>
                </div>
                <div className="school__details__card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Principal Name</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{principal_name}", schoolDetails)}
                    </p>
                  </div>
                </div>
                <div className="school__details__card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Contact Number</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{contact_number}", schoolDetails)}
                    </p>
                  </div>
                </div>
                <div className="school__details__card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Alternative Number</h3>
                    <p className="column-detail">
                      {replacePlaceholders(
                        "{alternative_number}",
                        schoolDetails
                      )}
                    </p>
                  </div>
                </div>
                <div className="school__details__card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Zip Code</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{zip_code}", schoolDetails)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Repeat the pattern for other columns */}
            </div>
            <div className="publish__course-details">
              <div className="content__card-full-length"></div>
              <div className="cards">
                <table className="content__card-table">
                  <tbody>
                    <tr>
                      <th className="content__table-col-heading">User</th>
                      <th className="content__table-col-heading">Count</th>
                      <th className="content__table-col-heading"></th>
                    </tr>

                    <tr className="content__table">
                      <td className="content__table-data">Teachers</td>
                      <td className="content__table-data">
                        {userCounts ? userCounts.total_teachers : "Loading..."}
                      </td>
                      <td
                        className="content__table-data"
                        style={{ textAlign: "right" }}
                      >
                        <i
                          className="bx bx-edit"
                          onClick={() =>
                            navigate(`/admin/allTeachers/${schoolId}`)
                          }
                        ></i>
                      </td>
                    </tr>

                    <tr className="content__table">
                      <td className="content__table-data">Students</td>
                      <td className="content__table-data">
                        {userCounts ? userCounts.total_students : "Loading..."}
                      </td>
                      <td
                        className="content__table-data"
                        style={{ textAlign: "right" }}
                      >
                        <i
                          className="bx bx-edit"
                          onClick={() =>
                            navigate(`/admin/allStudents/${schoolId}`)
                          }
                        ></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </section>
  );
};

export default AdminSchoolDetails;
