import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import "../../Styles/AdminAddSchool.css";

const AdminAddSchool = () => {
  const navigate = useNavigate();
  const [schoolData, setSchoolData] = useState({
    schoolName: "",
    schoolAddress: "",
    city: "",
    state: "",
    zipCode: "",
    contactNumber: "",
    alternativeNumber: "",
    principalName: "",
    schoolDocumentNumber: "",
    fundsToDeploy: "",
  });

  const notify = () => toast.success("School created successfully!");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSchoolData({ ...schoolData, [name]: value });
  };

  const handleCreateSchool = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    // Clear any existing toasts before showing a new one
    toast.dismiss();
  
    // Make a request to the backend to add the new school
    axios.post("http://localhost:3001/api/add-school", schoolData)
      .then((response) => {
        console.log(response.data.message);
        notify();
        navigate('/admin/allSchools');
      })
      .catch((error) => {
        console.error("Error adding school:", error);
        toast.error("Error adding school. Please try again.", { duration: 4000 });
      });
  };

  return (
    <section className="admin__add-school">
      <div className="admin__add-school-container">
        <div className="h-text admin__add-school-heading">
          Create New School
        </div>
        <div className="content">
          <form action="#">
            <div className="user-details">
              <div
                className="input-box"
                style={{ display: "block", width: "100%" }}
              >
                <span className="details">School Name</span>
                <input
                  type="text"
                  placeholder="Ex: Saint Pauls Sr. Sec. School"
                  name="schoolName"
                  value={schoolData.schoolName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div
                className="input-box"
                style={{ display: "block", width: "100%" }}
              >
                <span className="details">School Address</span>
                <input
                  type="text"
                  placeholder="Ex: 2, Church Road Behind Police Commissioner's office"
                  name="schoolAddress"
                  value={schoolData.schoolAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">City</span>
                <input
                  type="text"
                  placeholder="Ex: Pune"
                  name="city"
                  value={schoolData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">State</span>
                <input
                  type="text"
                  placeholder="Ex: Maharashtra"
                  name="state"
                  value={schoolData.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Zip Code</span>
                <input
                  type="text"
                  placeholder="Ex: 411001"
                  name="zipCode"
                  value={schoolData.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input
                  type="tel"
                  placeholder="Ex: 020 2612 0757"
                  name="contactNumber"
                  value={schoolData.contactNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Alternative Number</span>
                <input
                  type="tel"
                  placeholder="Ex: 020 2612 0757"
                  name="alternativeNumber"
                  value={schoolData.alternativeNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Principal Name</span>
                <input
                  type="text"
                  placeholder="Ex: Father Mukesh Rawat"
                  name="principalName"
                  value={schoolData.principalName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">School Government Registered ID</span>
                <input
                  type="text"
                  placeholder="Ex: SCH-20220001"
                  name="schoolDocumentNumber"
                  value={schoolData.schoolDocumentNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/* <div className="input-box">
                <span className="details">Funds to deploy</span>
                <input
                  type="text"
                  placeholder="Ex: 25,000"
                  name="fundsToDeploy"
                  value={schoolData.fundsToDeploy}
                  onChange={handleInputChange}
                  required
                />
              </div> */}
            </div>
            <div className="flex_right">
            <button
              className="primary_cta_button"
              onClick={handleCreateSchool}
              style={{width: '25%'}}
            >
              Create School
            </button>
          </div>
          </form>
        </div>
      </div>
      <Toaster />
    </section>
  );
};

export default AdminAddSchool;

