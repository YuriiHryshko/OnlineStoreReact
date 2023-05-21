import React from 'react';
import { Link } from 'react-router-dom';

const Auth = ({ loggedInStatus, currentUser, handleLogout }) => {
  return (
    <div>
      {loggedInStatus==="LOGGED_IN" ? (
        <>
          <Link to="#" className="btn btn-dark">
            Welcome, {currentUser.first_name}
          </Link>
          <button className="btn btn-dark" onClick={handleLogout}>
            Logout
          </button>
          <Link to="/users/edit" className="btn btn-dark">
            Edit Profile
          </Link>
        </>
      ) : (
        <>
          <Link to="/users/sign_in" className="btn btn-dark">
            Login
          </Link>
          <Link to="/users/sign_up" className="btn btn-dark">
            Register
          </Link>
        </>
      )}
    </div>
  );
};

export default Auth;