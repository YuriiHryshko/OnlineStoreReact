import React, { useContext } from 'react';
import { CartContext } from '../../CartContext';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Cart = ({currentUser}) => {
  const { cartItems, setCartItems } = useContext(CartContext);

  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      await axios.post("http://localhost:3000/api/v1/cart/pay", {
        cartItems: cartItems.map(item => ({ item_id: item.item_id, quantity: item.quantity })),
        total: calculateTotal(),
        user_id: currentUser.id,
      });
      setCartItems([]);
      navigate("/orders");
    } catch (error) {
        console.error(error);
    }
  };

  const handleChooseMore = () => {
    navigate("/");
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleQuantityChange = (event, index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = parseInt(event.target.value);
    setCartItems(updatedCartItems);
  };

  const calculateSubtotal = (item) => {
    return item.price * item.quantity;
  };

  const calculateTotal = () => {
    let total = 0;
    for (const item of cartItems) {
      total += calculateSubtotal(item);
    }
    return total.toFixed(2);
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <h1 className="text-center">Cart Details</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={item.quantity}
                    onChange={(event) => handleQuantityChange(event, index)}
                  />
                </td>
                <td>{calculateSubtotal(item)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="text-right"><strong>Total</strong></td>
              <td><strong>{calculateTotal()}</strong></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="col-md-12">
        {cartItems.length > 0 ? (
          <div>
            <button className="btn btn-success" onClick={handlePayment}>Pay Now</button>
            <button className="btn btn-primary" onClick={handleChooseMore}>Choose More</button>
            <button className="btn btn-danger" onClick={handleClearCart} data-confirm="Are you sure?">Clear Cart</button>
          </div>
        ) : (
          <p className="text-center">Cart is empty. Payment cannot be processed.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;