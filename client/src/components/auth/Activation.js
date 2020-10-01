import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import logo from "../../media/greeen.svg";
import { activation } from "../../actions/auth";
import { setAlert } from "../../actions/alert";
import Alert from "../../layouts/Alert";

const Activation = ({
  isAuthenticated,
  history,
  loading,
  match,
  activation,
}) => {
  const [formData, setFormData] = useState({
    token: {},
  });

  useEffect(() => {
    let token = match.params;
    if (token) {
      setFormData({ ...formData, token });
    }
  }, [formData, match.params]);

  const { token } = formData;
  const handleSubmit = async (e) => {
    e.preventDefault();

    activation({ token });
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <div className="w-full mx-auto max-w-md flex flex-col justify-center items-center min-h-screen">
      <Alert />
      <Link to="/">
        <img alt="logo" src={logo} className="pb-5" />
      </Link>
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="flex items-center justify-center">
          <input
            className="bg-green-600 hover:bg-green-700 cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            value="Activate Your Account"
          />
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  success: state.auth.success,
});

export default connect(mapStateToProps, { activation, setAlert })(Activation);
