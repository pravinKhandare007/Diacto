import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEmail } from "./EmailContext.js"; // Adjust the path accordingly
import axios from "axios";
import { MdEmail } from "react-icons/md"; // Import MdEmail
import "../../Styles/ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); // New state for error handling
  const { setEmail: setEmailContext } = useEmail();
  const navigate = useNavigate();

  const handleRequestOTP = async () => {
    try {
      // Check if the email exists in the database
      const response = await axios.post(
        "http://localhost:3001/api/check-email-exists",
        { email: email }
      );
      const { exists } = response.data;

      if (exists) {
        // If the email exists, send a request to the server to send OTP
        const otpResponse = await axios.post(
          "http://localhost:3001/api/send-otp",
          { email: email }
        );
        console.log(otpResponse.data.message);

        // Set the email in the context using setEmail from useEmail
        setEmailContext(email);

        // Redirect to the OTP verification page
        navigate("/verify-otp");
      } else {
        // Handle the case when the email does not exist in the database
        setError("Entered email does not exist.");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error, e.g., show an error message to the user
      setError("An error occurred during the OTP request. Please try again.");
    }
  };

  return (
    <div className="forgot">
      <div className="forgot_container">
        <div className="forgot_glass">
          <div className="flex_center">
            <h4 className="heading-text" style={{ color: "black" }}>
              Forgot Password? 
            </h4>
            <span className="subheading-text">
              We’ll send a verification code to this email or phone number if it
              matches an existing account.
            </span>
          </div>
          {error && <div className="error_message">{error}</div>}
          <div className="form">
            {/* Use MdEmail icon here */}
            <div className="input_form" style={{ width: "70%" }}>
              <MdEmail className="icon" />
              <input
                type="email"
                className="textbox"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              className="primary_cta_button"
              onClick={handleRequestOTP}
              style={{ width: "50%" }}
            >
              <span>Request OTP</span>
            </button>
          </div>

          <div className="cta_trigger">
            <span>
              <Link className="cta_trigger_btn" to="/login">
                Back to LogIn
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
