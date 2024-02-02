// Login.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../Styles/Login.css";
import axios from "axios";
import schoolLogo from "../../assets/app_logo.png";

import { BsEyeFill, BsEyeSlashFill, BsFillPersonFill } from "react-icons/bs";
import { FaQuoteLeft } from "react-icons/fa";

const Login = () => {
  const [greeting, setGreeting] = useState("");
  const [credentials, setCredentials] = useState({
    sap_id: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Random quote generator:
  const [quote, setQuote] = useState("Life is beautiful.");
  const [author, setAuthor] = useState("Unknown");
  const [loading, setLoading] = useState(true);

  // Show loading
  const showLoading = () => {
    setLoading(true);
  };

  // Hide loading
  const hideLoading = () => {
    setLoading(false);
  };

  // Fetch a new quote from the API
  const fetchNewQuote = async () => {
    showLoading();

    try {
      const apiUrl = "https://type.fit/api/quotes";
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("Unable to fetch quotes");
      }

      const data = await response.json();

      // Log quotes and authors to the console for debugging
      console.log(
        "Quotes:",
        data.map((quote) => quote.text)
      );
      console.log(
        "Authors:",
        data.map((quote) => quote.author || "Unknown")
      );

      if (data.length > 0) {
        // Pick a random quote from the fetched data
        const newQuote = data[Math.floor(Math.random() * data.length)];

        // Extract the author name and remove "type.fit" if present
        const authorName = newQuote.author
          ? newQuote.author.replace("type.fit", "").trim()
          : "Unknown";

        // Set the quote and author
        setQuote(newQuote.text);
        setAuthor(authorName);
      } else {
        // If there are no valid quotes, set default quote and author
        setQuote("Life is beautiful.");
        setAuthor("Unknown");
      }
    } catch (error) {
      console.error("Error fetching quotes:", error);
      // Handle error by setting default quote and author
      setQuote("Life is beautiful.");
      setAuthor("Unknown");
    } finally {
      hideLoading();
    }
  };

  // Fetch a new quote on component mount
  useEffect(() => {
    fetchNewQuote();
  }, []); // Empty dependency array ensures it runs only once on component mount

  // useEffect to update the greeting message and set an interval to keep it updated
  useEffect(() => {
    const updateGreeting = () => {
      const currentTime = new Date().getHours();
      if (currentTime >= 5 && currentTime < 12) {
        setGreeting("Hello, Good Morning!🌅");
      } else if (currentTime >= 12 && currentTime < 18) {
        setGreeting("Hey, Good Afternoon!☀️");
      } else {
        setGreeting("Hii, Good Evening!🌙");
      }
    };

    // Initial call to set the greeting when the component mounts
    updateGreeting();

    // Update the greeting every minute
    const intervalId = setInterval(updateGreeting, 60000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // useEffect for Axios interceptor logic
  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        // Add configurations here
        const token = localStorage.getItem("auth");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    return () => {
      // Cleanup the request interceptor
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  // Function to handle login form submission

  const handleLogin = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3001/login", credentials)
      .then((res) => {
        console.log("Login Response:", res); // Log the entire response for debugging

        if (res.data.success) {
          // Successful authentication
          // Access token with res.data.token
          localStorage.setItem("auth", res.data.token);
          // Navigate to home without passing First_Name in the route
          navigate("/home");
        } else {
          setError("Sap ID or password is incorrect");
        }
      })
      .catch((err) => {
        console.error("Login Error:", err); // Log the error for debugging
        setError("Sap ID or password is incorrect");
      });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // JSX rendering of the component
  return (
    <div className="login">
      <div className="login_container">
        <div className="login-left">
          <div className="left-glass">
            <h2 className="greetings">{greeting}</h2>
            <div className="quote-container">
              <h3 className="quote-heading">- Quote of the Day</h3>
              <div className="quote-text">
                <FaQuoteLeft id="fa-quote-left" />
                <span id="quote">{loading ? "Fetching..." : quote}</span>
              </div>

              <p className="quote-author">{loading ? "Fetching..." : author}</p>
            </div>
          </div>
        </div>

        <div className="login-right">
          <div className="flex_center">
            <h2 className="heading-text">LOG IN</h2>
          </div>

          <div className="login_image">
            <img src={schoolLogo} className="profile_img" alt="school Logo" />
          </div>

          {error && <div className="error_message">{error}</div>}

          <div className="form" style={{ width: "70%" }}>
            {/* Name input with icon */}
            <div className="input_form">
              <BsFillPersonFill className="icon" />
              <input
                type="text"
                className="textbox"
                placeholder="User Id"
                value={credentials.sap_id}
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    sap_id: e.target.value,
                  })
                }
              />
            </div>

            {/* Password input with eye toggle */}
            <div className="input_form">
              <span className="icon" onClick={handleTogglePasswordVisibility}>
                {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
              </span>

              <input
                type={showPassword ? "text" : "password"}
                className="textbox"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    password: e.target.value,
                  })
                }
              />
            </div>

            {/* Button to submit the login form */}
            <button
              className="primary_cta_button"
              type="submit"
              onClick={handleLogin}
            >
              Log In
            </button>
          </div>

          <div className="cta_trigger" style={{ width: "60%" }}>
            <div className="triggers">
              <span>
                <Link className="cta_trigger_btn" to="/forgotPassword">
                  Forgot Password ?
                </Link>
              </span>
              <span>
                <Link className="cta_trigger_btn" to="/login/adminLogin">
                  Login as Admin
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
