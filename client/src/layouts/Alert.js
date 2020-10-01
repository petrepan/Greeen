import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
       <div key={alert.id} className={`p-2 ${alert.bg} ${alert.border} items-center text-sm text-white-100 leading-none lg:rounded-full flex lg:inline-flex`} role="alert">
          <span className="flex rounded-full bg-green-500 uppercase px-2 py-1 text-xs font-bold mr-3">New</span>
          <span className="mr-2 text-left flex-auto">{alert.msg}</span>
          <svg className="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
      </div>   
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
