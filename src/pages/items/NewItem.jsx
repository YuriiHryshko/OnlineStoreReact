import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const NewItem = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      name: name,
      price: price,
      description: description,
    };

    axios.post('http://localhost:3000/api/v1/items', newItem)
      .then((response) => {
        console.log(response.data);
        navigate("/");

      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container mt-5 mb-5">
      <h1>Create new item!</h1>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            required
          ></textarea>
        </div>
        <div className="col-md-12">
          <button type="submit" className="btn btn-primary">
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewItem;