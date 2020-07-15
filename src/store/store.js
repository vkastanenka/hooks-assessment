// React
import React, { createContext, useReducer } from "react";

// Utilities
import { calcAve } from "../utils/Math/calc";

// Create the initial state
const initialState = {
  students: null,
  error: null,
  loading: false,
};

// Create the context
const StoreContext = createContext();

// Create the reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOAD":
      return {
        ...state,
        loading: true,
      };

    case "UNSET_LOAD":
      return {
        ...state,
        loading: false,
      };

    case "SET_FETCH":
      const payloadCopy = { ...action.payload };
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

    case "SET_FETCH_FAIL":
      return {
        ...state,
        error: action.payload,
      };

    case "ADD_TAG":
      // Add the tag to the students array
      const studentsCopy = [...state.students];
      studentsCopy.forEach((student) => {
        if (student.id === action.id) {
          student.tags.push(action.payload);
          student.tagsLower.push(action.payload.toLowerCase());
        }
      });

      return {
        ...state,
        studentsCopy,
      };

    default:
      return state;
  }
};

// Create the HOC
const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StateProvider };
