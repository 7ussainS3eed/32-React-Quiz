import Options from "./Options"

function Question({
  currentQuestion, 
  chosenAnswerIndex, 
  dispatch, 
}) 
{
  return (
    <div>
      <h4>{currentQuestion.question}</h4>
      <Options 
        currentQuestion={currentQuestion}
        chosenAnswerIndex={chosenAnswerIndex}
        dispatch={dispatch}
      />
    </div>
  );
};

export default Question;