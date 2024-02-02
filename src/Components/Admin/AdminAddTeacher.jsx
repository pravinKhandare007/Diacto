import React, { useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "../../Styles/AdminCreateUsers.css";

const AdminAddTeacher = () => {
  const { schoolId } = useParams(); // Extract schoolId from URL params
  const navigate = useNavigate();
  const [profileImage , setProfileImage] = useState();
  const [formData, setFormData] = useState({
    // Initial form state
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    birthday: "",
    email: "",
    contactNumber: "",
    alternativeNumber: "",
    aadharCardNumber: "",
    panCard: "",
    permanentAddress: "",
    city: "",
    state: "",
    fatherName: "",
    motherName: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
  });

  const notify = () => toast.success("Successfully created !!");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3001/api/add-teacher/${schoolId}`, // Updated endpoint
        {
          ...formData,
          schoolId: schoolId, // Use extracted schoolId
        }
      );

      console.log("Teacher added successfully", response.data);
      notify();
      navigate(`/admin/allTeachers/${schoolId}`)
    } catch (error) {
      console.error("Error adding teacher:", error.message);
    }
  };

  function handleImageChange(e){
    const file = e.target.files[0];
    
  }

  return (
    <section>
      <Toaster />
      <div className="add__teacher-container">
        <div className="h-text admin__add-school-heading">
          Create Teacher Profile
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form">
            <div className="details__personal">
              <div className="details__personal">
                <span className="title__heading">Personal Details</span>
                <div className="fields">
                  <div className="input-field">
                    <label>First Name</label>
                    <input
                      type="text"
                      placeholder="Ex: Harvey"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="input-field">
                    <label>Middle Name</label>
                    <input
                      type="text"
                      placeholder="Ex: Reginald"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-field">
                    <label>Last Name</label>
                    <input
                      type="text"
                      placeholder="Ex: Spector"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option disabled value="">
                        Select gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                  <div className="input-field">
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      name="birthday"
                      placeholder="Enter birth date"
                      value={formData.birthday}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Email</label>
                    <input
                      type="text"
                      name="email"
                      placeholder="Ex: harvey.spector@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Contact Number</label>
                    <input
                      type="number"
                      name="contactNumber"
                      placeholder="Enter mobile number"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Alternative Contact Number</label>
                    <input
                      type="number"
                      placeholder="Enter mobile number"
                      name="alternativeNumber"
                      value={formData.alternativeNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-field">
                    <label>Aadhar Card Number</label>
                    <input
                      type="number"
                      placeholder="Enter aadhar card number"
                      name="aadharCardNumber"
                      value={formData.aadharCardNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-field">
                    <label>Pancard Number</label>
                    <input
                      type="text"
                      placeholder="Enter pancard number"
                      name="panCard"
                      value={formData.panCard}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="details__address">
                  <span className="title__heading">Address Details</span>
                  <div className="fields">
                    <div className="input-field">
                      <label>Permanent Address</label>
                      <input
                        type="text"
                        placeholder="Enter Address"
                        name="permanentAddress"
                        value={formData.permanentAddress}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="input-field">
                      <label>City</label>
                      <input
                        type="text"
                        placeholder="Ex: Pune"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="input-field">
                      <label>State</label>
                      <input
                        type="text"
                        placeholder="Ex: Maharashtra"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="details__family">
                  <span className="title__heading">Family Details</span>
                  <div className="fields">
                    <div className="input-field">
                      <label>Father Name</label>
                      <input
                        type="text"
                        placeholder="Enter father name"
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="input-field">
                      <label>Mother Name</label>
                      <input
                        type="text"
                        placeholder="Enter mother name"
                        name="motherName"
                        value={formData.motherName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="input-field">
                      <label>Emergency Contact Name</label>
                      <input
                        type="text"
                        placeholder="Enter contact name"
                        name="emergencyContactName"
                        value={formData.emergencyContactName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="input-field">
                      <label>Emergency Contact Number</label>
                      <input
                        type="tel"
                        placeholder="Enter number"
                        name="emergencyContactNumber"
                        onChange={handleImageChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="profile__upload">
                  <span className="title__heading">Profile Photo Upload</span>
                  <div className="fields">
                    <div className="input-field">
                      <label>Upload Image</label>
                      <input
                        type="image"
                        value={formData.fatherName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="input-field">
                      <label>Mother Name</label>
                      <input
                        type="text"
                        placeholder="Enter mother name"
                        name="motherName"
                        value={formData.motherName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="input-field">
                      <label>Emergency Contact Name</label>
                      <input
                        type="text"
                        placeholder="Enter contact name"
                        name="emergencyContactName"
                        value={formData.emergencyContactName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="input-field">
                      <label>Emergency Contact Number</label>
                      <input
                        type="tel"
                        placeholder="Enter number"
                        name="emergencyContactNumber"
                        value={formData.emergencyContactNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  </div>
              </div>
              {/* <Link to={`/admin/allTeachers/${schoolId}`}> */}
                <div className="flex_right">
                  <button
                    type="submit"
                    className="primary_cta_button"
                    style={{ width: "20%" }}
                    onClick={notify}
                  >
                    Submit
                  </button>
                </div>
              {/* </Link> */}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AdminAddTeacher;

