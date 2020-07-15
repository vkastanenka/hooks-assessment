// React
import React, { useState, useContext } from "react";
import { StoreContext } from "../../store/store";

// Components
import Alert from '../Alert/Alert';
import Spinner from "../Spinner/Spinner";
import Student from "../Student/Student";

// Utilities
import { objStringFilter, objArrFilter } from "../../utils/Filters/filters";
import useFetch from "../../utils/CustomHooks/useFetchData";

const StudentContainer = () => {
  let content, studentArr;

  const globalState = useContext(StoreContext);
  const { state } = globalState;

  const [nameFilter, setNameFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");

  // Fetch students
  useFetch("https://www.hatchways.io/api/assessment/students");

  // If loading, notify user
  if (state.loading) {
    content = (
      <div className="student-container__center">
        <Spinner />
      </div>
    );

    // If no loading and successful response, display students
  } else if (!state.loading && state.students) {
    // Copy student array and filter
    studentArr = [...state.students];
    if (nameFilter)
      studentArr = objStringFilter(studentArr, "fullName", nameFilter);
    if (tagFilter)
      studentArr = objArrFilter(studentArr, "tagsLower", tagFilter);

    // Render student component for filtered array
    content = studentArr.map((student) => (
      <Student
        key={student.id}
        id={student.id}
        pic={student.pic}
        fullName={student.fullName}
        email={student.email}
        company={student.company}
        skill={student.skill}
        average={student.average}
        grades={student.grades}
        tags={student.tags}
        tagsLower={student.tagsLower}
      />
    ));

    // If no loading and error, display error message
  } else if (!state.loading && state.error) {
    content = (
      <div className="student-container__center ta-center">
        <h3 className="heading-tertiary">
          Problem fetching data, please try again later!
        </h3>
      </div>
    );
  }

  return (
    <div className="student-container">
      <input
        type="text"
        value={nameFilter}
        id="name-input"
        placeholder="Search by name"
        className="input student-container__filter student-container__filter--name"
        onChange={(e) => setNameFilter(e.target.value)}
      />
      <input
        type="text"
        value={tagFilter}
        id="name-input"
        placeholder="Search by tags"
        className="input student-container__filter student-container__filter--tags"
        onChange={(e) => setTagFilter(e.target.value)}
      />
      {content}
      {state.warning ? <Alert type="error">{state.warning}</Alert> : null}
    </div>
  );
};

export default StudentContainer;
