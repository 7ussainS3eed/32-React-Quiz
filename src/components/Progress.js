function Progress({
  numQuestions,
  currentQuestionIndex,
  chosenAnswerIndex,
  points,
  questions
})
{  
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={currentQuestionIndex + Number(chosenAnswerIndex !== null)}
      ></progress>
      <p>
        Question {" "}
        <strong>{currentQuestionIndex + 1}</strong>
        {" / "} {numQuestions}
      </p>
      <p>
        Points {" "}
        <strong>{points}</strong>
        {" / "} {questions.reduce((acc, obj) => acc + obj.points, 0)}
      </p>
    </header>
  );
};

export default Progress;