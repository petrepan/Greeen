import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import logo from "../../media/greeen.svg";
import { register } from "../../actions/auth";
import { setAlert } from "../../actions/alert";
import Alert from "../../layouts/Alert";

const Register = ({ isAuthenticated, loading, error, register }) => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [passwordShown, setPasswordShown] = useState(false);

  //show/hide password
  const togglePasswordVisiblity = () => { 
    setPasswordShown(!passwordShown);
  };

  const { fullname, email, password } = formData;

  const handleChange = (e) => {
    return setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    register({ fullname, email, password });
  };

    if (isAuthenticated) {
        return <Redirect to="/" />;
    }
  return (
    <div className="w-full text-green-700 mx-auto max-w-md flex flex-col justify-center items-center min-h-screen">
      <Alert />
      <Link to="/">
        <img alt="logo" src={logo} className="pb-5" />
      </Link>
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="fullname">
            Fullname
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="fullname"
            type="text"
            name="fullname"
            placeholder="Fullname"
            onChange={handleChange}
            value={fullname}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={email}
            required
          />
        </div>
        <div className="mb-6 relative">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type={passwordShown ? "text" : "password"}
            name="password"
            placeholder="******************"
            onChange={handleChange}
            value={password}
            required
          />
          <div
            onClick={togglePasswordVisiblity}
            className="absolute right-0 top-0 mt-8 cursor-pointer text-green-800 pt-10 text-sm">
            {passwordShown ? "hide" : "show"} password
          </div>
        </div>
        <div className="flex items-center justify-between">
          <input
            className="bg-green-600 hover:bg-green-700 cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            value="Register"
          />
          {/* <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#">
            Forgot Password?
          </a> */}
        </div>
      </form>
      <div>
        <p className="text-green-700">
          Already have an account?{" "}
          <Link className="underline text-green-700" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  success: state.auth.success,
  error: state.error,
});

export default connect(mapStateToProps, { register, setAlert })(Register);
