import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [registrationErrors, setRegistrationErrors] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        "http://localhost:3000/api/v1/users/sign_in",
        {
          user: {
            email: email,
            password: password
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.logged_in) {
            props.handleSuccessfulAuth(response.data)
            navigate("/");
        }
      })
      .catch((error) => {
        console.log("registration error", error);
      });
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">Sign in</h2>

          <form onSubmit={handleSubmit} className="form-signup">
            
            <div className="form-floating mb-3">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleChange}
                className="form-control bg-white text-dark border-dark shadow-sm"
                id="email"
                required
              />
              <label htmlFor="email" className="form-label">
                Email
              </label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
                className="form-control bg-white text-dark border-dark shadow-sm"
                id="password"
                required
                minLength={6}
              />
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <small className="form-text text-muted">
                Password must be at least 6 characters
              </small>
            </div>

            <div className="d-grid gap-2 col-md-6 mx-auto">
              <button type="submit" className="btn btn-primary btn-lg">
                Login
              </button>
            </div>
          </form>

          <div className="text-center mt-3">
            {/* Render other links or components */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;