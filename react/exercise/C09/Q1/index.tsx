// C9/Q1
// 2つのcountの状態（`count1`、`count2`）をincrement, decrement, reset する`reducer`を実装してください。
// [ヒント]
// * spread構文を使う（`...state`）
//
import { useReducer, useCallback } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

type State = {
  count1: number,
  count2: number
};
type ActionType =
  "increment1" | "decrement1" | "reset1" |
  "increment2" | "decrement2" | "reset2";
type Action = { type: ActionType };

const initialState: State = {
  count1: 0,
  count2: 0,
};

function reducer(state: State, action: Action) {
  const { count1, count2 } = state;
  switch (action.type) {
    case "increment1":
      return {
        count1: count1 + 1,
        count2: count2
      };
    case "decrement1":
      return {
        count1: count1 - 1,
        count2: count2
      };
    case "reset1":
      return {
        count1: initialState.count1,
        count2: count2
      };
    case "increment2":
      return {
        count1: count1,
        count2: count2 + 1
      };
    case "decrement2":
      return {
        count1: count1,
        count2: count2 - 1
      };
    case "reset2":
      return {
        count1: count1,
        count2: initialState.count2
      };
    default:
      throw new Error();
  }
}

interface ButtonProps {
  label: string,
  action: ActionType,
  disabled: boolean
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function Button(props: ButtonProps) {
    const cb_func = useCallback(
      () => {
        dispatch({ type: props.action })
      },
      [state]
    );
    return (
      <button type="button" disabled={props.disabled} onClick={cb_func}>{props.label}</button>
    )
  }

  const { count1, count2 } = state

  return (
    <>
      <div>
        <p>Count1: {count1}</p>
        <Button label="Reset" action="reset1" disabled={false} />
        <Button label="-" action="decrement1" disabled={count1<=0} />
        <Button label="+" action="increment1" disabled={false} />
      </div>
      <div>
        <p>Count2: {count2}</p>
        <Button label="Reset" action="reset2" disabled={false} />
        <Button label="-" action="decrement2" disabled={count2<=0} />
        <Button label="+" action="increment2" disabled={false} />
      </div>
    </>
  );
}

createRoot(document.getElementById("root")!).render(<Counter />);
