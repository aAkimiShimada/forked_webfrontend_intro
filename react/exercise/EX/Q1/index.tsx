import { FC, useReducer, useState, useCallback } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

interface State {
  on: boolean,
  toggled: number,
  warning: boolean
}
type ActionType = "TOGGLE" | "ON" | "OFF" | "RESET"
interface Action { type: ActionType }

// トグルの上限
const TOO_MANY_CLICKS = 4;
const initialState: State = { on: false, toggled: 0, warning: false };

const toggleSwitchReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "TOGGLE":
      if (state.toggled>=TOO_MANY_CLICKS) return {
        on: state.on,
        toggled: TOO_MANY_CLICKS,
        warning: true
      }
      else return {
        on: !state.on,
        toggled: state.toggled + 1,
        warning: false
      };
    case "ON":
      return {
        on: true,
        toggled: state.toggled,
        warning: state.warning
      };
    case "OFF":
      return {
        on: false,
        toggled: state.toggled,
        warning: state.warning
      };
    case "RESET":
      return {
        on: state.on,
        toggled: 0,
        warning: false
      };
    default:
      throw new Error(`unknown action type: ${action.type}`);
  }
};

// トグルスイッチの実装
type ToggleProps = {
  on: boolean;
  onClick: () => void;
};
const ToggleSwitch: FC<ToggleProps> = (props) => {
  const { on, onClick } = props;
  const toggleStyle = ["toggleBtn", on ? "toggleBtnOn" : "toggleBtnOff"]
    .filter(Boolean)
    .join(" ");

  return (
    <label aria-label="Toggle">
      <input
        type="checkbox"
        checked={on}
        className="toggleInput"
        onClick={onClick}
      />
      <span className={toggleStyle}></span>
    </label>
  );
};

// UI ボタン生成の引数
interface ButtonProps {
  label: string,
  action: ActionType,
  disabled: boolean
}

const TestApp: FC = () => {

  const [state, dispatch] = useReducer(toggleSwitchReducer,initialState);

  // ボタンの生成
  function Button(props: ButtonProps) {

    const cb_func = useCallback(
      () => {
        dispatch({ type: props.action })
      },
      [state]
    );

    return (
      <button
        type="button"
        disabled={props.disabled}
        onClick={cb_func}>{props.label}</button>
    )
  }

  // トグルスイッチのクリックのアクション
  const toggling = useCallback(
    () => {
      dispatch({ type: "TOGGLE" })
    },
    [state]
  );

  const resettable = state.toggled != 0;

  let doms = [
    <p className="formGroup">
      <Button
        label="OFF" action="OFF"
        disabled={false} />
      <Button
        label="ON" action="ON"
        disabled={false} />
      <Button
        label="RESET" action="RESET"
        disabled={!resettable} />
    </p>,
    <p className="toggleGroup">
      <ToggleSwitch on={state.on} onClick={toggling} />
    </p>
  ];

  if (state.warning) doms.push(
    <div id="warning">
      <p>You have toggled the switch too many times.</p>
      <p>To toggle it again, press the reset button.</p>
    </div>
  );

  return <> {doms} </>;
};

createRoot(document.getElementById("root")!).render(<TestApp />);
