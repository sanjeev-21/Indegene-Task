export default (state, action) => {
  switch (action.type) {
    case "ADD_QUESTION":
      return {
        questions: [action.payload, ...state.questions],
      };
    case "EDIT_QUESTION":
      const updateQuestion = action.payload;
      const updateQuestions = state.questions.map((question) => {
        if (question.id === updateQuestion.id) {
          return updateQuestion;
        }
        return question;
      });
      return {
        questions: updateQuestions,
      };
    case "DELETE_QUESTION":
      return {
        questions: state.questions.filter((ques) => {
          return ques.id !== action.payload;
        }),
      };
    default:
      return state;
  }
};
