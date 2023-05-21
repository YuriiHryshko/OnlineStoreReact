import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [itemDetails, setItemDetails] = useState({});

  useEffect(() => {
    fetchOrderDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { id } = useParams();
  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`https://my-1store.herokuapp.com/api/v1/orders/${id}`);
      const { order, order_items, item_details } = response.data;
      setOrder(order);
      setOrderItems(order_items);
      setItemDetails(item_details);
    } catch (error) {
      console.error(error);
    }
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1 className="text-center mt-5 mb-4">Order Details</h1>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Created at:</strong> {new Date(order.created_at).toLocaleString()}</p>
          <p><strong>Amount:</strong> ${parseFloat(order.amount).toFixed(2)}</p>
        </div>
      </div>
      <h2 className="text-center mt-5 mb-4">Order Items</h2>
      <ul className="list-group">
        {orderItems.map((orderItem) => (
          <li className="list-group-item" key={orderItem.id}>
            <div className="row">
              <div className="col-md-6">
                <p><strong>Name:</strong> {itemDetails[orderItem.item_id].name}</p>
                <p><strong>Description:</strong> {itemDetails[orderItem.item_id].description}</p>
                <p><strong>Price:</strong> ${itemDetails[orderItem.item_id].price}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Quantity:</strong> {orderItem.quantity}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="row mt-4 mb-4">
        <div className="col-md-12 text-center">
          <Link to="/orders" className="btn btn-primary">Back to Orders</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;