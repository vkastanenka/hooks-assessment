// React
import React, { useState } from "react";

// Components
import Student from "../Student/Student";

// Utilities
import { calcAve } from "../../utils/Math/calc";
import useFetch from "../../utils/CustomHooks/useFetchData";

const StudentContainer = () => {
  let content;
  let studentArr;

  const [filter, setFilter] = useState("");

  // Fetch students
  const res = useFetch("https://www.hatchways.io/api/assessment/students");

  // If loading, notify user
  if (res.loading) {
    content = <div>Loading...</div>;

    // If no loading and successful response, display students
  } else if (!res.loading && res.res) {
    studentArr = res.res.data.students;

    // Add average and fullName fields to student object
    studentArr.forEach((student) => {
      student.average = calcAve(student.grades);
      student.fullName = `${student.firstName} ${student.lastName}`;
    });

    // Render student component for filtered array
    content = studentArr
      .filter((student) => {
        const lowerFilter = filter.toLowerCase();
        const lowerName = student.fullName.toLowerCase();
        return lowerName.includes(lowerFilter);
      })
      .map((student) => (
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
      <input
        type="text"
        value={filter}
        id='name-input'
        placeholder='Search by name'
        className="input student-container__filter"
        onChange={(e) => setFilter(e.target.value)}
      />
      {content}
    </div>
  );
};

export default StudentContainer;
