// React
import React, { useState } from "react";

// Components
import Student from "../Student/Student";

// Utilities
import { calcAve } from "../../utils/Math/calc";
import useFetch from "../../utils/CustomHooks/useFetchData";

const StudentContainer = () => {
  let content;

  // Fetch students
  const res = useFetch("https://www.hatchways.io/api/assessment/students");

  // If loading, notify user
  if (res.loading) {
    content = <div>Loading...</div>;

    // If no loading and successful response, display students
  } else if (!res.loading && res.res) {
    const studentArr = res.res.data.students;

    // Add average and fullName fields to student object
    studentArr.forEach((student) => {
      student.average = calcAve(student.grades);
      student.fullName = `${student.firstName} ${student.lastName}`;
    });

    content = studentArr.map((student) => (
      <Student
        key={student.id}
        pic={student.pic}
        fullName={student.fullName}
        email={student.email}
        company={student.company}
        skill={student.skill}
        average={student.average}
      />
    ));

    // If no loading and error, display error message
  } else if (!res.loading && res.error) {
    content = <div>Problem fetching data, please try again later!</div>;
  }

  return (
    <div className="student-container">
      <input className="student-container__filter" type="text" />
      {content}
    </div>
  );
};

export default StudentContainer;
