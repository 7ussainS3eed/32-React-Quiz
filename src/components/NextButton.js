function NextButton({
  chosenAnswerIndex, dispatch, currentQuestionIndex, numQuestions
}) 
{
  if (chosenAnswerIndex === null) return null;
  if (currentQuestionIndex < numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({type: "nextQuestion"})}
      >
        Next
      </button>
    );
  }
  if (currentQuestionIndex === numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({type: "goToFinishScreen"})}
      >
        Finish
      </button>
    );
  }
};

export default NextButton;