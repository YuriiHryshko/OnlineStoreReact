import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://my-1store.herokuapp.com/api/v1/users/${id}`);
        const { first_name, last_name, email, role } = response.data;
        setFirstName(first_name);
        setLastName(last_name);
        setEmail(email);
        setRole(role);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUser = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      role: role,
    };

    axios
      .put(`https://my-1store.herokuapp.com/api/v1/users/${id}`, updatedUser)
      .then((response) => {
        console.log(response.data);
        navigate('/users');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container mt-5 mb-5">
      <h1>Edit user!</h1>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="form-control"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="col-md-12">
          <button type="submit" className="btn btn-primary">
            Update User
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;