// React
import React, { useState } from "react";
import PropTypes from "prop-types";

// Components
import Icon from "../Icon/Icon";

// Component to house UI student data
const Student = (props) => {
  const [showGrades, setShowGrades] = useState(false);

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
        {showGrades ? (
          <ul className="student__info-list mg-tp--md">
            {props.grades.map((grade, i) => (
              <li className="student__grade-list-item">
                <span>Test {i + 1}:</span>
                <span>{grade}%</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <button className="expand-btn">
        <Icon
          type={!showGrades ? "plus" : "minus"}
          onClick={() => setShowGrades((prevShowGrades) => !prevShowGrades)}
          className="icon icon--large icon--grey-primary icon--translate icon--active"
        />
      </button>
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
  grades: PropTypes.array.isRequired,
};
