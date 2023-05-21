import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminItems = ({ items }) => {

  const [itemList, setItemList] = useState(items);

    useEffect(() => {
        setItemList(items);
    }, [items]);

  const handleDelete = (itemId) => {
    axios.delete(`https://my-1store.herokuapp.com/api/v1/items/${itemId}`)
        .then(() => {
            const updatedItemList = itemList.filter((item) => item.id !== itemId);
            setItemList(updatedItemList);
        })
        .catch((error) => {
            console.error(error);
        });
    };

  return (
    <div className="container-xl">
      <div className="table-responsive">
        <div className="table-wrapper">
          <div className="table-title d-flex justify-content-between">
            <div>
              <h2>Item <b>Details</b></h2>
            </div>
            <div>
              <Link to="/items/new" className="btn btn-success">Add</Link>
            </div>
          </div>
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Name <i className="fa fa-sort"></i></th>
                <th>Price</th>
                <th>Description <i className="fa fa-sort"></i></th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {itemList.length > 0 ? (
                itemList.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{Number(item.price).toFixed(2)}$</td>
                    <td>{item.description}</td>
                    <td>
                      <div className="card-footer p-1 pt-0 border-top-0 bg-transparent">
                        <div className="text-center">
                          <Link to={`/items/edit/${item.id}`} className="btn btn-outline-warning mt-auto">Edit</Link>
                        </div>
                      </div>
                      <div className="card-footer p-1 pt-0 border-top-0 bg-transparent">
                        <div className="text-center">
                          <button className="btn btn-outline-danger mt-auto" onClick={() => handleDelete(item.id)}>Delete</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">
                    <p className="text-center alert alert-warning" style={{ fontSize: '18px' }}>
                      Такого товару не існує.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminItems;