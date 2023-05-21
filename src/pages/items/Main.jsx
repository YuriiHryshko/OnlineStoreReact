import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../components/Auth';
import AdminItems from './AdminItems';

const API_URL = 'https://my-1store.herokuapp.com/api/v1/items';

function Main({currentUser, loggedInStatus, handleLogout}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          search: searchTerm
        }
      });
      setItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchData();
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <body>
      <div className="px-3 py-2 border-bottom mb-3">
        <div className="container d-flex flex-wrap justify-content-center">
          <form onSubmit={handleSubmit} className="d-flex align-items-center col-12 col-lg-auto mb-2 mb-lg-0 me-lg-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={handleChange}
              placeholder="Search by product name"
              className="form-control me-2"
            />
            <button type="submit" className="btn btn-light text-dark me-2">
              Search
            </button>
          </form>
          <Auth loggedInStatus={loggedInStatus} currentUser={currentUser} handleLogout={handleLogout}/>
        </div>
      </div>
      {loggedInStatus === "LOGGED_IN" && currentUser.role ==="admin" ?(
        <AdminItems items={items}/>
      ) : (
        <section className="py-5">
          <div className="container px-4 px-lg-5 mt-5">
            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
              {items.length > 0 ? (
                items.map((item) => (
                  <div className="col mb-5" key={item.id}>
                    <div className="card h-100">
                      <img className="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                      <div className="card-body p-4">
                        <div className="text-center">
                          <h5 className="fw-bolder">{item.name}</h5>
                          {Number(item.price).toFixed(2)}$
                        </div>
                      </div>
                      <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div className="text-center">
                          <Link to={`/items/${item.id}`} className="btn btn-outline-dark mt-auto">
                            Open item
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center alert alert-warning" style={{ fontSize: '18px' }}>
                  Такого товару не існує.
                </p>
              )}
            </div>
          </div>
        </section>
      )}
    </body>
  );
}

export default Main;