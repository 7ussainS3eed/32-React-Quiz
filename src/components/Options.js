function Options({
  currentQuestion,
  chosenAnswerIndex, 
  dispatch,
}) 
{
  const hasAnswered = chosenAnswerIndex !== null;
  return (
    <div className="options">
        {currentQuestion.options.map((el, index) => 
          <button 
            className={`
              btn btn-option ${index === chosenAnswerIndex ? "answer" : ""}
              ${hasAnswered ? 
                (index === currentQuestion.correctOption ? "correct" : "wrong")
                : ""
              }
            `}
            key={el}
            onClick={() => {
              dispatch({type: "newAnswer", payload: index});
              index === currentQuestion.correctOption &&
                dispatch({type: "answerIsCorrect"});
            }}
            disabled={hasAnswered}
          >
            {el}
          </button>
        )}
      </div>
  );
};

export default Options;