import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../CartContext';
import { useNavigate } from "react-router-dom";

const ShowItem = ({ loggedInStatus }) => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const navigate = useNavigate();

  const handleAddToCart = (event) => {
    event.preventDefault();
    const existingItem = cartItems.find((cartItem) => cartItem.item_id === item.id);
  
    if (existingItem) {
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem.item_id === item.id) {
          return { ...cartItem, quantity: quantity };
        }
        return cartItem;
      });
      setCartItems(updatedCartItems);
    } else {
      const newItem = {
        item_id: item.id,
        quantity: quantity,
        name: item.name,
        price: item.price,
      };
      setCartItems([...cartItems, newItem]);
    }
    navigate("/cart");
  };

  const { id } = useParams();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`https://my-1store.herokuapp.com/api/v1/items/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItem();
  }, [id]);

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 my-5">
        <div className="row gx-4 gx-lg-5 align-items-center">
          <div className="col-md-6">
            <img className="card-img-top mb-5 mb-md-0" src="https://dummyimage.com/600x700/dee2e6/6c757d.jpg" alt="..." />
          </div>
          <div className="col-md-6">
            <h1 className="display-5 fw-bolder">{item.name}</h1>
            <div className="fs-5 mb-5">
              <span>${Number(item.price).toFixed(2)}</span>
            </div>
            <p className="lead">{item.description}</p>
            {loggedInStatus === 'LOGGED_IN' && (
              <div>
                <form onSubmit={handleAddToCart}>
                  <input type="hidden" name="item_id" value={item.id} />
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    max="99"
                    className="text-center me-3"
                    style={{ maxWidth: "4rem" }}
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                  <button className="btn btn-outline-dark flex-shrink-0" type="submit">Add to cart</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowItem;