import { calcAve } from '../Math/calc';

// Sets students from API call
export const setFetch = (state, payload) => {
  const payloadCopy = { ...payload };
  const studentArr = payloadCopy.data.students;

  // Add average, fullName, and tag fields to student object
  studentArr.forEach((student) => {
    student.average = calcAve(student.grades);
    student.fullName = `${student.firstName} ${student.lastName}`;
    student.tags = [];
    student.tagsLower = [];
  });

  return {
    ...state,
    students: studentArr,
  };
};

// Adds tags to student object
export const addTag = (state, id, payload) => {
  const studentsCopy = [...state.students];
  studentsCopy.forEach((student) => {
    if (student.id === id) {
      student.tags.push(payload);
      student.tagsLower.push(payload.toLowerCase());
    }
  });

  return {
    ...state,
    warning: "",
    studentsCopy,
  };
};

// Deletes tags from student object
export const deleteTag = (state, id, tagIndex) => {
  const studentsCopy = [...state.students];
  studentsCopy.forEach((student) => {
    if (student.id === id) {
      student.tags.splice(tagIndex, 1);
      student.tagsLower.splice(tagIndex, 1);
    }
  });

  return {
    ...state,
    studentsCopy,
  };
};
