// React
import React from "react";
import PropTypes from "prop-types";

// Component to house UI student data
const Student = (props) => {
  return (
    <div className="student">
      <div className="student__pfp-container">
        <img
          src={`${props.pic}`}
          alt={`${props.fullName} pfp`}
          className="student__pfp"
        />
      </div>
      <div className="student__info">
        <h3 className="heading-tertiary">{props.fullName}</h3>
        <ul className="student__info-list">
          <li className="student__info-list-item">Email: {props.email}</li>
          <li className="student__info-list-item">Company: {props.company}</li>
          <li className="student__info-list-item">Skill: {props.skill}</li>
          <li className="student__info-list-item">Average: {props.average}</li>
        </ul>
      </div>
    </div>
  );
};

export default Student;

Student.propTypes = {
  pic: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  skill: PropTypes.string.isRequired,
  average: PropTypes.string.isRequired,
};
