// React
import React, { useState, useEffect } from "react";
import axios from "axios";

// Components
import Student from "./components/Student/Student";

// Utilities
import { calcAve } from "./utils/calc";

function App() {
  const [students, setStudents] = useState(null);

  // Fetch students when component mounts
  useEffect(() => {
    const fetchStudents = async () => {
      const res = await axios.get(
        "https://www.hatchways.io/api/assessment/students"
      );
      const studentArr = res.data.students;

      // Add average and fullName fields to student object
      studentArr.forEach((student) => {
        student.average = calcAve(student.grades);
        student.fullName = `${student.firstName} ${student.lastName}`;
      });
      
      setStudents(studentArr);
    };

    fetchStudents();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {students
          ? students.map((student) => (
              <Student
                key={student.id}
                pic={student.pic}
                fullName={student.fullName}
                email={student.email}
                company={student.company}
                skill={student.skill}
                average={student.average}
              />
            ))
          : null}
      </header>
    </div>
  );
}

export default App;
