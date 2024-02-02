import React, { useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "../../Styles/AdminCreateUsers.css";

const AdminAddStudent = () => {
  const { schoolId } = useParams(); // Extract schoolId from URL params
  const navigate = useNavigate();

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
    permanentAddress: "",
    city: "",
    state: "",
    fatherName: "",
    fatherContactNumber: "",
    fatherEmail: "",
    motherName: "",
    motherContactNumber: "",
    motherEmail: "",
    guardianName: "",
    guardianNumber: "",
    guardianEmail: "",
    bankName: "",
    bankBranchName: "",
    accountNumber: "",
    accountHolderName: "",
    ifscCode: "",
    accountType: "",
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
        `http://localhost:3001/api/add-student/${schoolId}`, // Updated endpoint
        {
          ...formData,
          schoolId: schoolId, // Use extracted schoolId
        }
      );

      console.log("Student added successfully", response.data);
      notify();
      navigate(`/admin/allStudents/${schoolId}`);
    } catch (error) {
      console.error("Error adding student:", error.message);
    }
  };

  return (
    <section>
      <Toaster />
      <div className="add__teacher-container">
        <div className="h-text admin__add-school-heading">
          Create Student Profile
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form">
            <div className="details__personal">
              <span className="title__heading">Personal Details</span>
              <div className="fields">
                <div className="input-field">
                  <label>First Name</label>
                  <input
                    type="text"
                    placeholder="Ex: John"
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
                    placeholder="Ex: Doe"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-field">
                  <label>Last Name</label>
                  <input
                    type="text"
                    placeholder="Ex: Smith"
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
                    placeholder="Ex: john.doe@email.com"
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
                  <label>Upload Picture</label>
                  <input
                    type="file"
                    placeholder="Upload picture"
                    // name="aadharCardNumber"
                    // value={formData.aadharCardNumber}
                    // onChange={handleChange}
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
                      placeholder="Ex: New York"
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
                      placeholder="Ex: New York"
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
                    <label>Father Contact Number</label>
                    <input
                      type="tel"
                      placeholder="Enter contact number"
                      name="fatherContactNumber"
                      value={formData.fatherContactNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Father Email</label>
                    <input
                      type="email"
                      placeholder="Enter email"
                      name="fatherEmail"
                      value={formData.fatherEmail}
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
                    <label>Mother Contact Number</label>
                    <input
                      type="tel"
                      placeholder="Enter contact number"
                      name="motherContactNumber"
                      value={formData.motherContactNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Mother Email</label>
                    <input
                      type="email"
                      placeholder="Enter email"
                      name="motherEmail"
                      value={formData.motherEmail}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Guardian Name</label>
                    <input
                      type="text"
                      placeholder="Enter guardian name"
                      name="guardianName"
                      value={formData.guardianName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Guardian Contact Number</label>
                    <input
                      type="tel"
                      placeholder="Enter contact number"
                      name="guardianNumber"
                      value={formData.guardianNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Guardian Email</label>
                    <input
                      type="email"
                      placeholder="Enter email"
                      name="guardianEmail"
                      value={formData.guardianEmail}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="details__account">
                <span className="title__heading">Account Details</span>
                <div className="fields">
                  <div className="input-field">
                    <label>Bank Name</label>
                    <input
                      type="text"
                      placeholder="Enter bank name"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Bank Branch Name</label>
                    <input
                      type="text"
                      placeholder="Enter branch name"
                      name="bankBranchName"
                      value={formData.bankBranchName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Account Holder Name</label>
                    <input
                      type="text"
                      placeholder="Enter account number"
                      name="accountHolderName"
                      value={formData.accountHolderName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Account Number</label>
                    <input
                      type="text"
                      placeholder="Enter account number"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>IFSC Code</label>
                    <input
                      type="text"
                      placeholder="Enter IFSC code"
                      name="ifscCode"
                      value={formData.ifscCode}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="input-field">
                    <label>Account Type</label>
                    <input
                      type="text"
                      placeholder="Enter account type"
                      name="accountType"
                      value={formData.accountType}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

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
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AdminAddStudent;
