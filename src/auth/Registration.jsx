import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [role, setRole] = useState("user");
  //const [registrationErrors, setRegistrationErrors] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "firstName") {
      setFirstName(value);
    } else if (name === "lastName") {
      setLastName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "password_confirmation") {
      setPasswordConfirmation(value);
    } else if (name === "role") {
      setRole(value);
    }
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(
        "http://localhost:3000/api/v1/users",
        {
          user: {
            first_name: firstName,
            last_name: lastName,
            email: email,
            role: role,
            password: password,
            password_confirmation: passwordConfirmation,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status === "created") {
          props.handleSuccessfulAuth(response.data);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("registration error", error);
        navigate("/");
      });
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">Sign up</h2>

          <form onSubmit={handleSubmit} className="form-signup">
            <div className="form-floating mb-3">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={firstName}
                onChange={handleChange}
                className="form-control bg-white text-dark border-dark shadow-sm"
                id="first-name"
                required
              />
              <label htmlFor="first-name" className="form-label">
                First name
              </label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={lastName}
                onChange={handleChange}
                className="form-control bg-white text-dark border-dark shadow-sm"
                id="last-name"
                required
              />
              <label htmlFor="last-name" className="form-label">
                Last name
              </label>
            </div>

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
              <select
                name="role"
                value={role}
                onChange={handleChange}
                className="form-control bg-white text-dark border-dark shadow-sm"
                id="role"
                required
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
              <label htmlFor="role" className="form-label">
                Role
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

            <div className="form-floating mb-3">
              <input
                type="password"
                name="password_confirmation"
                placeholder="Password confirmation"
                value={passwordConfirmation}
                onChange={handleChange}
                className="form-control bg-white text-dark border-dark shadow-sm"
                id="password_confirmation"
                required
                minLength={6}
              />
              <label htmlFor="password_confirmation" className="form-label">
                Password confirmation
              </label>
            </div>

            <div className="d-grid gap-2 col-md-6 mx-auto">
              <button type="submit" className="btn btn-primary btn-lg">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;