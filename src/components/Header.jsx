import React from 'react'
import { Link } from 'react-router-dom';
import { Table, Shop, People, Cart, Grid } from 'react-bootstrap-icons';

const Header = ({loggedInStatus, currentUser}) => {

    return (
        <header>
            <div class="px-3 py-2 text-bg-dark">
                <div class="container">
                <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <Link to="/" className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
                    <Shop className="d-block mx-auto mb-1" width="24" height="24" />
                    Shop
                    </Link>
                    <ul class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                    {loggedInStatus ==="LOGGED_IN" ? (
                        currentUser.role ==="admin" ?(
                            <React.Fragment>
                                <Link to="/" class="nav-link text-white">
                                    <Table className="d-block mx-auto mb-1" width="24" height="24" />
                                    Items
                                </Link>
                                <Link to="/users" class="nav-link text-white">
                                    <People className="d-block mx-auto mb-1" width="24" height="24" />
                                    Users
                                </Link>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Link to="/" class="nav-link text-white">
                                    <Table className="d-block mx-auto mb-1" width="24" height="24" />
                                    Items
                                </Link>
                                <Link to="/orders" class="nav-link text-white">
                                    <Grid className="d-block mx-auto mb-1" width="24" height="24" />
                                    Orders
                                </Link>
                                <Link to="/cart" class="nav-link text-white">
                                    <Cart className="d-block mx-auto mb-1" width="24" height="24" />
                                    Cart
                                </Link>
                            </React.Fragment>
                        )
                    ): null} 
                    </ul>
                </div>
                </div>
            </div>
        </header>
    )
}

export default Header