// React
import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { StoreContext } from "../../store/store";

// Components
import Icon from "../Icon/Icon";

// Component to house UI student data
const Student = (props) => {
  const globalState = useContext(StoreContext);
  const { dispatch } = globalState;

  const [tagInput, setTagInput] = useState("");
  const [showMore, setShowMore] = useState(false);

  const addTag = (e) => {
    e.preventDefault();

    // If user has already added the tag, warn them
    if (props.tagsLower.includes(tagInput.toLowerCase())) {
      dispatch({ type: "TAG_EXISTS" });
    } else {
      // Clear warning message if exists
      dispatch({
        type: "ADD_TAG",
        id: props.id,
        payload: tagInput,
      });
      setTagInput("");
    }
  };

  const deleteTag = (i) => {
    dispatch({
      type: "DELETE_TAG",
      id: props.id,
      tagIndex: i,
    });
  };

  return (
    <div className="student">
      <div className="student__image">
        <div className="student__pfp-container">
          <img
            src={`${props.pic}`}
            alt={`${props.fullName} pfp`}
            className="student__pfp"
          />
        </div>
      </div>
      <div className="student__info">
        <h3 className="heading-tertiary">{props.fullName}</h3>
        <div className="student__info-content">
          <ul className="student__info-list">
            <li className="student__info-list-item">Email: {props.email}</li>
            <li className="student__info-list-item">
              Company: {props.company}
            </li>
            <li className="student__info-list-item">Skill: {props.skill}</li>
            <li className="student__info-list-item">
              Average: {props.average}
            </li>
          </ul>
          {showMore ? (
            <>
              <ul className="student__info-list mg-tp--md">
                {props.grades.map((grade, i) => (
                  <li key={i} className="student__grade-list-item">
                    <span>Test {i + 1}:</span>
                    <span>{grade}%</span>
                  </li>
                ))}
              </ul>
              <div className="student__tags mg-tp--md">
                {props.tags.length > 0
                  ? props.tags.map((tag, i) => (
                      <div key={i} className="tag">
                        <Icon
                          type="cross"
                          onClick={() => deleteTag(i)}
                          className="icon icon--small icon--black-primary icon--translate icon--active tag__close"
                        />
                        <span>{tag}</span>
                      </div>
                    ))
                  : null}
              </div>
              <form onSubmit={(e) => addTag(e)} className="mg-tp--md">
                <input
                  required
                  type="text"
                  value={tagInput}
                  id="add-tag-input"
                  placeholder="Add a tag"
                  onChange={(e) => setTagInput(e.target.value)}
                  className="input student__tag-input"
                />
              </form>
            </>
          ) : null}
        </div>
      </div>
      <button className="expand-btn">
        <Icon
          type={!showMore ? "plus" : "minus"}
          onClick={() => setShowMore((prevShowMore) => !prevShowMore)}
          className="icon icon--large icon--grey-primary icon--translate icon--active"
        />
      </button>
    </div>
  );
};

export default React.memo(Student);

Student.propTypes = {
  id: PropTypes.string.isRequired,
  pic: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  skill: PropTypes.string.isRequired,
  average: PropTypes.string.isRequired,
  grades: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  tagsLower: PropTypes.array.isRequired,
};
