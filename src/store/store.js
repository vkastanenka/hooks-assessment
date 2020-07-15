// React
import React, { createContext, useReducer } from "react";

// Utilities
import { setFetch, addTag, deleteTag } from '../utils/ReducerUtils/reducerUtils';

// Create the initial state
const initialState = {
  students: null,
  error: null,
  loading: false,
  warning: "",
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

    case "CLEAR_WARNING":
      return {
        ...state,
        warning: "",
      };

    case "SET_FETCH":
      return setFetch(state, action.payload);

    case "SET_FETCH_FAIL":
      return {
        ...state,
        error: action.payload,
      };

    case "ADD_TAG":
      return addTag(state, action.id, action.payload);

    case "DELETE_TAG":
      return deleteTag(state, action.id, action.tagIndex);

    case "TAG_EXISTS":
      return {
        ...state,
        warning: "User already has submitted this tag!",
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
