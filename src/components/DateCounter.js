import { useReducer } from "react";

const initialState = {step: 1, count: 0};

function reducer(state, action) {
  switch (action.type) {
    case "setStep":
      return { ...state, step: action.payload };
    case "inc":
      return { ...state, count: state.count + state.step };
    case "dec":
      return { ...state, count: state.count - state.step };
    case "hand":
      return { ...state, count: action.payload };
    case "resetAll":
      return initialState;
    default:
      return state;
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + state.count);

  const setStep = function (e) {
    dispatch({type: "setStep", payload: Number(e.target.value)})
  };

  const inc = function () {
    dispatch({type: "inc"});
  };

  const dec = function () {
    dispatch({type: "dec"});
  };

  const hand = function (e) {
    dispatch({type: "hand", payload: Number(e.target.value)})
  };

  const resetAll = function () {
    dispatch({type: "resetAll"})
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="1"
          max="10"
          value={state.step}
          onChange={setStep}
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={state.count} onChange={hand} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={resetAll}>Reset</button>
      </div>
    </div>
  );
}

export default DateCounter;