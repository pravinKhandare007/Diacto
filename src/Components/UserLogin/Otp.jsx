import React, { useState, useRef, createRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEmail } from "./EmailContext.js"; // Adjust the path accordingly
import "../../Styles/Otp.css";

const Otp = () => {
  const [otpValues, setOtpValues] = useState(["", "", "", "", ""]);
  const [error, setError] = useState("");
  const { email: userEmail, setEmail } = useEmail(); // Use useEmail hook
  const inputRefs = useRef([...Array(5)].map(() => createRef()));
  const navigate = useNavigate();

  // Function to handle changes in OTP input fields
  const handleOtpChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);

      if (value !== "" && index < 4) {
        inputRefs.current[index + 1].current.focus();
      }
    }
  };

  // Function to verify OTP
  const verifyOtp = async () => {
    try {
      console.log("Verifying OTP...");

      // Use the email state directly (assumed the user entered it during the password reset process)
      const enteredOTP = otpValues.join("");

      // Send a POST request to the '/verify-otp' endpoint
      console.log("Sending request...");
      const response = await axios.post(
        "http://localhost:3001/api/verify-otp",
        { email: userEmail, enteredOTP }
      );

      console.log("Response:", response.data);

      // Check if the OTP is valid
      if (response.data.isValidOTP) {
        // If the OTP is valid, the server should include the user's email in the response

        // Navigate to the next step (e.g., '/resetPassword') after successful verification
        console.log("OTP is valid. Navigating to /resetPassword...");
        navigate("/resetPassword");
      } else if (response.data.isValidOTP === false) {
        // If the OTP is invalid or expired, set an error message
        console.log("Invalid OTP or OTP expired. Please try again.");
        setError("Invalid OTP or OTP expired. Please try again.");
      } else {
        // If the OTP is invalid or expired, set an error message
        console.log("Invalid OTP or OTP expired. Please try again.");
        setError("Invalid OTP or OTP expired. Please try again.");
      }
    } catch (error) {
      // If there's an error during the OTP verification, log the error and set an error message
      console.error("Error verifying OTP:", error);
      setError("An error occurred while verifying OTP. Please try again.");
    }
  };

  return (
    <div className="otp">
      <div className="otp_container">
        <div className="otp_glass">
          <div className="flex_center">
            <h3 className="heading-text" style={{ color: "black" }}>
              Verification Code{" "}
            </h3>
            <span className="subheading-text">
              Enter the One-Time Password (OTP) sent to your registered mobile
              number or email address to complete the verification process.
            </span>
          </div>

          {/* Display error message if there is an error */}
          {error && <div className="error_message">{error}</div>}

          <div className="form">
            <div className="otp_form">
              {/* Render OTP input fields */}
              {otpValues.map((value, index) => (
                <input
                  key={index}
                  type="number"
                  className="otp_textbox"
                  value={value}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  ref={inputRefs.current[index]}
                />
              ))}
            </div>

            {/* Button to verify OTP */}
            <button
              className="primary_cta_button"
              style={{ width: "30%" }}
              onClick={() => {
                console.log("Button clicked");
                verifyOtp();
              }}
            >
              <span>Verify OTP</span>
            </button>
          </div>

          {/* Trigger to resend OTP */}
          <div className="cta_trigger">
            <span>
              <Link className="cta_trigger_btn" to="#">
                Resend OTP
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
