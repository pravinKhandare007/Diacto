import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import avatar from "../../assets/avatar_2.png";
// import "../../Styles/AdminTeacherDetails.css";

const AdminTeacherDetails = () => {
  const { schoolId, userId } = useParams();
  const [teacherDetails, setTeacherDetails] = useState(null);

  useEffect(() => {
    // Fetch teacher details for the specific school and user
    axios
      .get(
        `http://localhost:3001/api/fetch-teacher-details/${schoolId}/${userId}`
      )
      .then((response) => {
        setTeacherDetails(response.data.teacherDetails);
      })
      .catch((error) => {
        console.error("Error fetching teacher details:", error);
      });
  }, [schoolId, userId]);

  const replacePlaceholders = (string, dataObject) => {
    return string.replace(/{(\w+)}/g, (match, key) => dataObject[key] || "N/A");
  };

  return (
    <>
      {teacherDetails ? (
        <div className="user__info">
          <div className="user__info-container">
            <div className="user__info-card-one">
              <div className="user__profile-img">
                <img src={avatar} alt="" className="image" />
              </div>

              <div className="user__details">
                <div className="user__name">
                  <h2 className="h-text">
                    {replacePlaceholders("{first_name}", teacherDetails)}{" "}
                    {replacePlaceholders("{last_name}", teacherDetails)}
                  </h2>
                  <div className="location">
                    <i class="bx bx-map-pin location_pin"></i>
                    <span className="city_detail">
                      {replacePlaceholders("{city}", teacherDetails)}
                      {" , "}
                      {replacePlaceholders("{state}", teacherDetails)}
                    </span>
                  </div>
                </div>

                <div className="user__desc">
                  <p className="p-text">
                    {replacePlaceholders(
                      "School Name - {school_name}",
                      teacherDetails
                    )}
                    <span className="vertical_bar">|</span>
                  </p>

                  <p className="p-text">
                    {replacePlaceholders("SAP ID - {sap_id}", teacherDetails)}
                  </p>
                </div>
                <div className="user__desc">
                  <p className="p-text role">
                    Role : Teacher
                  </p>
                </div>
              </div>
            </div>

            <div className="user__info-card-two">
            <div className="card">
                <div className="card__heading">
                  <h3>General Information</h3>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Name</h3>
                    <p className="column-detail">
                    {replacePlaceholders("{first_name}", teacherDetails)}{" "}
                    {replacePlaceholders("{last_name}", teacherDetails)}
                    </p>
                  </div>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Father Name</h3>
                    <p className="column-detail">
                    {replacePlaceholders("{father_name}", teacherDetails)}
                    </p>
                  </div>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Mother Name</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{mother_name}", teacherDetails)}
                    </p>
                  </div>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Birthdate</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{birthday}", teacherDetails)}
                    </p>
                  </div>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Gender</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{gender}", teacherDetails)}
                    </p>
                  </div>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Aadhar Card Number</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{aadhar_card_number}", teacherDetails)}
                    </p>
                  </div>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Pancard Number</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{pan_card}", teacherDetails)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card__heading">
                  <h3>Contact Information</h3>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Email</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{email}", teacherDetails)}
                    </p>
                  </div>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Contact Number</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{contact_number}", teacherDetails)}
                    </p>
                  </div>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Alternative Contact Number</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{alternative_number}", teacherDetails)}
                    </p>
                  </div>
                </div>
                
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Permanent Address</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{permanent_address}", teacherDetails)}
                    </p>
                  </div>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">City</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{city}", teacherDetails)}
                    </p>
                  </div>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">State</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{state}", teacherDetails)}
                    </p>
                  </div>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Emergency Contact Name</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{emergency_contact_name}", teacherDetails)}
                    </p>
                  </div>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Emergency Contact Number</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{emergency_contact_number}", teacherDetails)}
                    </p>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default AdminTeacherDetails;
