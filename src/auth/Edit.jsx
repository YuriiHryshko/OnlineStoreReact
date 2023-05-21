import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Edit = ({ currentUser }) => {
  const [firstName, setFirstName] = useState(currentUser.first_name);
  const [lastName, setLastName] = useState(currentUser.last_name);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmationChange = (e) => {
    setPasswordConfirmation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Создание объекта данных для отправки
    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password_confirmation', passwordConfirmation);
    formData.append('current_password', ''); // Добавьте текущий пароль, если требуется для подтверждения изменений

    // Отправка запроса на обновление информации о пользователе с помощью Axios
    axios.patch('http://localhost:3000/api/v1/users', formData)
      .then(response => {
        // Обработка успешного обновления информации о пользователе
        console.log('User information updated');
      })
      .catch(error => {
        // Обработка ошибки при обновлении информации о пользователе
        console.error('Failed to update user information:', error);
      });
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">Edit {currentUser.first_name}</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="first_name" className="form-label">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                autoFocus
                autoComplete="given-name"
                className="form-control"
                value={firstName}
                onChange={handleFirstNameChange}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="last_name" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                autoComplete="family-name"
                className="form-control"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                className="form-control"
                value={email}
                onChange={handleEmailChange}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="password" className="form-label">
                Password <i>(leave blank if you don't want to change it)</i>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="new-password"
                className="form-control"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="password_confirmation" className="form-label">
                Password Confirmation
              </label>
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                autoComplete="new-password"
                className="form-control"
                value={passwordConfirmation}
                onChange={handlePasswordConfirmationChange}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="current_password" className="form-label">
                Current Password <i>(we need your current password to confirm your changes)</i>
              </label>
              <input
                type="password"
                id="current_password"
                name="current_password"
                autoComplete="current-password"
                className="form-control"
              />
            </div>

            <div className="d-grid gap-2 col-md-6 mx-auto">
              <button type="submit" className="btn btn-primary btn-lg">
                Update
              </button>
            </div>
          </form>

          <h3 className="mt-3">Cancel my account</h3>

          <div className="mb-3">
            Unhappy? <button type="button" className="btn btn-danger">Cancel my account</button>
          </div>

          <Link to="/" className="btn btn-secondary">Back</Link>
        </div>
      </div>
    </div>
  );
};

export default Edit;