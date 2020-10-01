import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import logo from "../media/greeen.svg";
import { logout, loadUser } from "../actions/auth";

const Navbar = ({ isAuthenticated, logout, auth, loadUser, token }) => {
    console.log(auth)
    const userLinks = (
      <Fragment>
        <Link
          className="lg:inline-block lg:mt-0 hover:text-green-600 text-gray-900 mr-4"
          to="/jobs">
          Jobs
        </Link>
        <Link
          className="lg:inline-block lg:mt-0 bg-green-600 p-2 rounded text-bold hover:text-white mr-4 text-gray-900"
          to="/new">
          Write a Post
        </Link>
        <button className="lg:inline-block lg:mt-0 bg-green-200 px-3 text-green-900 py-2 font-bold hover:text-green-600 text-gray-900 mr-4 rounded-full">
          {auth.user !== null ? auth.user.avatar : ""} 
        </button>
      </Fragment>
    );

      const guestLinks = (
        <Fragment>
          <Link
            className="mt-4 lg:inline-block lg:mt-0 hover:text-green-600 text-gray-900 mr-4"
            to="/jobs">
            Jobs
          </Link>
          <Link
            className="mt-4 lg:inline-block lg:mt-0 hover:text-green-600 text-gray-900 mr-4"
            to="/login">
            Login
          </Link>
          <Link
            className="mt-4 lg:inline-block lg:mt-0 hover:text-green-600 text-gray-900 mr-4"
            to="/register">
            Register
          </Link>
        </Fragment>
      );
    return (
      <nav className="bg-green-200 flex items-center justify-between h-20 flex-wrap py-1 px-3">
        <div> 
          <Link to="/">
            <img width="100" alt="logo" src={logo} />
          </Link>
        </div>
        <div className="block lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <Fragment>{auth.isAuthenticated ? userLinks : guestLinks}</Fragment>
          </div>
        </div>
      </nav>
    );
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logout, loadUser})(Navbar);