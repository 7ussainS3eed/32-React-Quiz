import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import StartScreen from "./StartScreen";
import Progress from "./Progress";
import Question from "./Question";
import Footer from "./Footer";
import Timer from "./Timer";
import NextButton from "./NextButton";
import FinishScreen from "./FinishScreen";
import Error from "./Error";

const initialState = {
  status: "loading", // "loading", "ready", "active", "finished", "error"
  questions: [],
  currentQuestionIndex: 0,
  chosenAnswerIndex: null,
  points: 0,
  secondsRemaining: null,
  highScore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, status: "ready", questions: action.payload };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * 30,
      };
    case "tick": {
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 1 ? "finished" : state.status,
      };
    }
    case "newAnswer":
      return { ...state, chosenAnswerIndex: action.payload };
    case "answerIsCorrect":
      return {
        ...state,
        points:
          state.points + state.questions.at(state.currentQuestionIndex).points,
      };
    case "nextQuestion":
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        chosenAnswerIndex: null,
      };
    case "goToFinishScreen":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return { ...initialState, status: "ready", questions: state.questions };
    case "dataFailed":
      return { ...state, status: "error" };
    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [
    {
      status,
      questions,
      currentQuestionIndex,
      chosenAnswerIndex,
      points,
      secondsRemaining,
      highScore,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    setTimeout(() => {
      fetch("/questions.json")
        .then((res) => res.json())
        .then((data) =>
          dispatch({ type: "dataReceived", payload: data.questions })
        )
        .catch((err) => dispatch({ type: "dataFailed" }));
    }, 1500);
  }, []);

  const numQuestions = questions.length;

  return (
    <div className="app ">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestions={numQuestions}
              currentQuestionIndex={currentQuestionIndex}
              chosenAnswerIndex={chosenAnswerIndex}
              points={points}
              questions={questions}
            />
            <Question
              currentQuestion={questions[currentQuestionIndex]}
              chosenAnswerIndex={chosenAnswerIndex}
              dispatch={dispatch}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                currentQuestionIndex={currentQuestionIndex}
                numQuestions={numQuestions}
                chosenAnswerIndex={chosenAnswerIndex}
                dispatch={dispatch}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            questions={questions}
            points={points}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
        {status === "error" && <Error />}
      </Main>
    </div>
  );
}
