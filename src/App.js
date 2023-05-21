import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Main from './pages/items/Main';
import ShowItem from './pages/items/ShowItem';
import Registration from './auth/Registration';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './auth/Login';
import NewItem from './pages/items/NewItem';
import EditItem from './pages/items/EditItem';
import UsersList from './pages/users/UsersList';
import EditUser from './pages/users/EditUser';
import Edit from './auth/Edit';
import Cart from './pages/cart/Cart';
import { CartProvider } from './CartContext';
import Orders from './pages/orders/Orders';
import OrderDetails from './pages/orders/OrderDetails';

function App() {
  const [loggedInStatus, setLoggedInStatus] = useState('NOT_LOGGED_IN');
  const [user, setUser] = useState({});

  const checkLoginStatus = async () => {
    try {
      const response = await axios.get('https://my-1store.herokuapp.com/api/v1/users/sign_in', { withCredentials: true });
      if (response.data.logged_in && loggedInStatus === 'NOT_LOGGED_IN') {
        setLoggedInStatus('LOGGED_IN');
        setUser(response.data.user);
      } else if (!response.data.logged_in && loggedInStatus === 'LOGGED_IN') {
        setLoggedInStatus('NOT_LOGGED_IN');
        setUser({});
      }
    } catch (error) {
      console.log('check login error', error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.delete('https://my-1store.herokuapp.com/api/v1/users/sign_out', { withCredentials: true });
      setLoggedInStatus('NOT_LOGGED_IN');
      setUser({});
    } catch (error) {
      console.log('logout error', error);
    }
  };

  const handleLogin = (data) => {
    setLoggedInStatus('LOGGED_IN');
    setUser(data.user);
  };

  useEffect(() => {
    checkLoginStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <CartProvider>
        <div className="App">
          <Header 
            loggedInStatus={loggedInStatus}
            currentUser={user}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  handleLogout={handleLogout}
                  loggedInStatus={loggedInStatus}
                  currentUser={user}
                />
              }
            />
            <Route
              path="/items/:id"
              element={<ShowItem loggedInStatus={loggedInStatus}/>}
            />
            <Route path="/items/new" element={<NewItem />} />
            <Route path="/items/edit/:id" element={<EditItem />} />
            <Route path="/users/edit/:id" element={<EditUser />} />
            <Route path="/users/edit" element={<Edit currentUser={user}/>} />
            <Route path="/users/sign_up" element={<Registration />} />
            <Route path="/users/sign_in" element={<Login handleSuccessfulAuth={handleLogin}/>} />
            <Route path="/users" element={<UsersList currentUser={user}/>} />
            <Route path="/cart" element={<Cart currentUser={user}/>} />
            <Route path="/orders" element={<Orders currentUser={user}/>} />
            <Route path="/orders/:id" element={<OrderDetails currentUser={user}/>} />
            <Route path="/*" element={<Main />} />
          </Routes>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;