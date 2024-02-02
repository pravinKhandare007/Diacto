import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEmail } from "./EmailContext"; // Adjust the path accordingly
import "../../Styles/ResetPassword.css";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { email } = useEmail();
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Initially disable the button
  const navigate = useNavigate();

  useEffect(() => {
    // Disable the button initially when the component mounts or when the route is '/resetPassword'
    setIsButtonDisabled(true);
  }, []);

  useEffect(() => {
    // Enable the button only if the passwords match and are not empty
    setIsButtonDisabled(!(passwordsMatch && newPassword && confirmPassword));
  }, [passwordsMatch, newPassword, confirmPassword]);

  const handleResetPassword = async () => {
    try {
      // Check if passwords match
      if (passwordsMatch) {
        // Send a request to update the password
        const response = await axios.post(
          "http://localhost:3001/api/reset-password",
          {
            email,
            newPassword,
          }
        );

        console.log(response.data.message); // Log success or error message

        // If the password reset was successful, navigate to the login page
        if (response.data.message === "Password reset successful") {
          navigate("/login"); // Assuming 'navigate' is the result of 'useNavigate'
        }
        // Optionally, you can redirect the user to a login page or display a success message
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  const handleTogglePasswordVisibility = (field) => {
    // Update the state to toggle visibility
    if (field === "showPassword") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  // Function to handle changes in the password inputs
  const handlePasswordChange = (field, value) => {
    // Update the state with the new password information
    if (field === "newPassword") {
      setNewPassword(value);
    } else {
      setConfirmPassword(value);
    }

    // Check if both passwords have been entered and match
    setPasswordsMatch(
      field === "newPassword"
        ? value === confirmPassword
        : newPassword === value
    );
  };

  return (
    <div className="reset">
      <div className="reset_container">
        <div className="reset_glass">
          <div className="flex_center">
            <h4 className="heading-text" style={{ color: "black" }}>
              Reset Password
            </h4>
            <span className="subheading-text">
              Don't worry! We're here to help you regain control of your
              account.
            </span>
          </div>
          {/* Error message displayed when passwords do not match */}
          {!passwordsMatch && confirmPassword && (
            <div className="error_message">Passwords do not match</div>
          )}

          {/* Success message displayed when passwords do not match */}
          {passwordsMatch && confirmPassword && (
            <div className="reset_success_message">Passwords match</div>
          )}

          <div className="form" >
            {/* Input for the new password */}
            <div className="input_form" style={{ width: "75%" }}>
              <input
                type={showPassword ? "text" : "password"}
                className={`textbox ${passwordsMatch ? "" : "password-error"}`}
                placeholder="Set New Password"
                value={newPassword}
                onChange={(e) =>
                  handlePasswordChange("newPassword", e.target.value)
                }
              />
              {/* Eye-toggle icon to show/hide the new password */}
              <span
                className="icon"
                
                onClick={() => handleTogglePasswordVisibility("showPassword")}
              >
                {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
              </span>
            </div>

            {/* Input for confirming the new password */}
            <div className="input_form" style={{ width: "75%" }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className={`textbox ${passwordsMatch ? "" : "password-error"}`}
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) =>
                  handlePasswordChange("confirmPassword", e.target.value)
                }
              />
              {/* Eye-toggle icon to show/hide the confirm password */}
              <span
                className="icon"
                onClick={() =>
                  handleTogglePasswordVisibility("showConfirmPassword")
                }
              >
                {showConfirmPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
              </span>
            </div>

            {/* Button to confirm the password reset */}
            <button
              className="primary_cta_button"
              disabled={isButtonDisabled}
              onClick={handleResetPassword}
              style={{ width: "60%" }}
            >
              <span>Reset Password</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
