import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

//Initial State
const initialState = {
  questions: [
    {
      id: 1,
      question: "Question 1",
      answer: "Answer 1",
    },
    {
      id: 2,
      question: "Question 2",
      answer: "Answer 2",
    },
    {
      id: 3,
      question: "Question 3",
      answer: "Answer 3",
    },
  ],
};

//Create Context
export const GlobalContext = createContext(initialState);

//Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const addQuestion = (questions) => {
    dispatch({
      type: "ADD_QUESTION",
      payload: questions,
    });
  };
  const editQuestion = (questions) => {
    dispatch({
      type: "EDIT_QUESTION",
      payload: questions,
    });
  };
  const deleteQuestion = (id) => {
    dispatch({
      type: "DELETE_QUESTION",
      payload: id,
    });
  };
  return (
    <GlobalContext.Provider
      value={{
        questions: state.questions,
        addQuestion,
        editQuestion,
        deleteQuestion,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
