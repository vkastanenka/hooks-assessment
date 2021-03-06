// React
import React from "react";
import PropTypes from "prop-types";

// Alert that appears at the type of the page
const Alert = (props) => {
  return <div className={`alert alert--${props.type}`}>{props.children}</div>;
};

Alert.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Alert;
