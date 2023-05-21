import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Orders = ({currentUser}) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/orders',{
        params: {
            user_id: currentUser.id,
        }
      });
      setOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-center">My Orders</h1>
      <ul className="list-group">
        {orders.map((order) => (
          <li className="list-group-item" key={order.id}>
            <div className="d-flex justify-content-between">
              <span className="fw-bold">Order ID: {order.id}</span>
              <span className="fw-bold">Total Price: ${parseFloat(order.amount).toFixed(2)}</span>
            </div>
            <div className="text-end">
              <Link to={`/orders/${order.id}`} className="btn btn-primary">View Details</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;