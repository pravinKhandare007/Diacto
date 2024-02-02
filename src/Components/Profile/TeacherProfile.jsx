import React, { useEffect, useState } from "react";
import avatar from "../../assets/avatar_2.png";
import { jwtDecode } from "jwt-decode";
import "../../Styles/UserProfile.css";

const TeacherProfile = () => {
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    // Fetch and decode the token when the component mounts
    const token = localStorage.getItem("auth");
    if (token) {
      const decoded = jwtDecode(token);
      setDecodedToken(decoded);
    }
  }, []);

  const data = [
    // { columnName: 'School Id', columnKey: 'School_ID' },
    { columnName: "SAP ID", columnKey: "sap_id" },
    { columnName: "School Name", columnKey: "school_name" },
    { columnName: "First Name", columnKey: "first_name" },
    { columnName: "Last Name", columnKey: "last_name" },
    { columnName: "Birthday", columnKey: "birthday" },
    { columnName: "Father Name", columnKey: "father_name" },
    { columnName: "Mother Name", columnKey: "mother_name" },
    { columnName: "Aadhar Card", columnKey: "aadhar_card_number" },
    { columnName: "PAN Card", columnKey: "pan_card" },
    { columnName: "Mobile Number", columnKey: "contact_number" },
    { columnName: "Email", columnKey: "email" },
    { columnName: "City", columnKey: "city" },
    { columnName: "State", columnKey: "state" },
    {
      columnName: "Alternative Mobile Number",
      columnKey: "alternative_number",
    },
    { columnName: "Permanent Address", columnKey: "permanent_address" },
    { columnName: "City", columnKey: "city" },
    { columnName: "State", columnKey: "state" }
  ];

  const replacePlaceholders = (string, dataObject) => {
    return string.replace(/{(\w+)}/g, (match, key) => dataObject[key] || "N/A");
  };

  return (
    <>
      {decodedToken ? (
        <div className="user__info">
          <div className="user__info-container">
            <div className="user__info-card-one">
              <div className="user__profile-img">
                <img src={avatar} alt="" className="image" />
              </div>

              <div className="user__details">
                <div className="user__name">
                  <h2 className="h-text">
                    {replacePlaceholders("{first_name}", decodedToken)}{" "}
                    {replacePlaceholders("{last_name}", decodedToken)}
                  </h2>
                  <div className="location">
                    <i class="bx bx-map-pin location_pin"></i>
                    <span className="city_detail">{replacePlaceholders("{city}", decodedToken)}{" , "}
                    {replacePlaceholders("{state}", decodedToken)}</span>
                  </div>
                </div>

                <div className="user__desc">
                  <p className="p-text">
                    {replacePlaceholders("School Name - {school_name}", decodedToken)}
                    <span className="vertical_bar">|</span>
                  </p>

                  <p className="p-text">
                    {replacePlaceholders(
                      "SAP ID - {sap_id}",
                      decodedToken
                    )}
                  </p>
                </div>
                <div className="user__desc">
                  <p className="p-text role">
                    {replacePlaceholders("{role}", decodedToken)}
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
                    {replacePlaceholders("{first_name}", decodedToken)}{" "}
                    {replacePlaceholders("{last_name}", decodedToken)}
                    </p>
                  </div>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Father Name</h3>
                    <p className="column-detail">
                    {replacePlaceholders("{father_name}", decodedToken)}
                    </p>
                  </div>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Mother Name</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{mother_name}", decodedToken)}
                    </p>
                  </div>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Birthdate</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{birthday}", decodedToken)}
                    </p>
                  </div>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Gender</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{gender}", decodedToken)}
                    </p>
                  </div>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Aadhar Card Number</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{aadhar_card_number}", decodedToken)}
                    </p>
                  </div>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Pancard Number</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{pan_card}", decodedToken)}
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
                      {replacePlaceholders("{email}", decodedToken)}
                    </p>
                  </div>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Contact Number</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{contact_number}", decodedToken)}
                    </p>
                  </div>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Alternative Contact Number</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{alternative_number}", decodedToken)}
                    </p>
                  </div>
                </div>
                
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">Permanent Address</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{permanent_address}", decodedToken)}
                    </p>
                  </div>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">City</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{city}", decodedToken)}
                    </p>
                  </div>
                </div>
                <div className="card__information">
                  <div className="information-column">
                    <h3 className="column-heading">State</h3>
                    <p className="column-detail">
                      {replacePlaceholders("{state}", decodedToken)}
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

export default TeacherProfile;
