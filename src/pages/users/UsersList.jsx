import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UsersList = ({currentUser}) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`https://my-1store.herokuapp.com/api/v1/users?search=${searchTerm}`);
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (userId) => {
    if (userId === currentUser.id) {
      console.log("Cannot delete the current user");
      return;
    }
    axios.delete(`https://my-1store.herokuapp.com/api/v1/users/${userId}`)
        .then(() => {
            const updatedItemList = users.filter((item) => item.id !== userId);
            setUsers(updatedItemList);
        })
        .catch((error) => {
            console.error(error);
        });
    };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchUsers();
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <div className="px-3 py-2 border-bottom mb-3">
        <div className="container d-flex flex-wrap justify-content-center">
          <form
            className="d-flex align-items-center col-12 col-lg-auto mb-2 mb-lg-0 me-lg-auto"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              value={searchTerm}
              onChange={handleChange}
              placeholder="Пошук за іменем користувача"
              className="form-control me-2"
            />
            <button type="submit" className="btn btn-light text-dark me-2">
              Пошук
            </button>
          </form>
          {/* Відображення компонента автентифікації */}
        </div>
      </div>
      <div className="container-xl">
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="table-title d-flex justify-content-between">
                <div>
                  <h2>
                    User <b>Details</b>
                  </h2>
                </div>
              </div>
            </div>
            <table className="table table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <div className="card-footer p-1 pt-0 border-top-0 bg-transparent">
                          <div className="text-center">
                            <div className="text-center">
                              <Link to={`/users/edit/${user.id}`} className="btn btn-outline-warning mt-auto">Edit</Link>
                            </div>
                          </div>
                        </div>
                        <div className="card-footer p-1 pt-0 border-top-0 bg-transparent">
                          <div className="text-center">
                            <button className="btn btn-outline-danger mt-auto" onClick={() => handleDelete(user.id)}>Delete</button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">
                      <p className="text-center alert alert-warning" style={{ fontSize: '18px' }}>
                        Такого користувача не існує.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersList;