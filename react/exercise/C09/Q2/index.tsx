// C9/Q2
// `useReducer` で車のアニメーションを実装しましょう。
//
// アニメーションは以下の順で遷移します。
// - Fuel ゲージを満タンにする。
// - Open the gate ボタンでゲートを開く。
// - Launch ボタンで車を発進させる。
// - Reset ボタンで初期状態に戻る。
//
// 以下の 4 つの状態を `useState` で管理しています。
// - `fuelAmount`: 燃料ゲージ
// - `fulfilled`: 燃料が満タンかどうか
// - `opened`: ゲートが開いたかどうか
// - `launched`: 車が発進したかどうか
//
// `reducer` を実装し、 `useState` を `useReducer` に置き換えてください。
//
// `action` は必要に応じて追加してください。
//
import { FC, useReducer, useCallback, useMemo, memo } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

declare type CarIndicatorProps = {
  fulfilled: boolean;
  opened: boolean;
  launched: boolean;
}

const CarIndicator: FC<CarIndicatorProps> = (props) => {
  const { fulfilled, opened, launched } = props;
  const carState = launched ? "carLaunched" : "carStopped";
  const gateState = opened ? "gateOpened" : "gateClosed";
  return (
    <div className="carIndicator">
      <div className={carState}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-car"
          width="56"
          height="56"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke={fulfilled ? '#009988' : '#999999'}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <circle cx="7" cy="17" r="2" />
          <circle cx="17" cy="17" r="2" />
          <path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5" />
        </svg>
      </div>
      <div className={gateState} />
    </div>
  );
}

// ヒント: この WebApp の状態は全部で４段階
const CurrentMode = {
  INITIAL: 0,
  FULFILLED: 1,
  OPENED: 2,
  LAUNCHED: 3,
} as const

declare type ChildComponentState = {
  fuelAmount: number;
  mode: typeof CurrentMode[keyof typeof CurrentMode];
}

// 必要なActionは全部でいくつ？
declare type ChildComponentActions = {
  type: ChildComponentActionType;
  payload?: number;
}

declare type ChildComponentActionType =
  "SET_FUEL_AMOUNT" | "OPEN_GATE" |
  "LAUNCH_CAR" | "RESET_STATE";

// reducer の本体
const reducer = (state: ChildComponentState, action: ChildComponentActions): ChildComponentState => {
  // 実装を追加しましょう
  switch(action.type) {
    case "SET_FUEL_AMOUNT":
      const payload = action.payload!;
      return {
        fuelAmount: payload,
        mode: payload > 99 ? CurrentMode.FULFILLED : CurrentMode.INITIAL
      };
    case "OPEN_GATE":
      return { ...state, mode: CurrentMode.OPENED
      };
    case "LAUNCH_CAR":
      return { ...state, mode: CurrentMode.LAUNCHED };
    case "RESET_STATE":
      return initialState;
  }
}

// reducer 用の初期値を入れましょう
const initialState: ChildComponentState = {
  fuelAmount: 0,
  mode: CurrentMode.INITIAL
};

// スライダーの描画モードの指定
// スライダーのコンポーザ関数が受け取る引数の数ごとに分けている
// 2 args の方はスライダーが滑らかに動くのに対して、 0 args の方はスライダーがもっさり動くことが確認されている
type SliderRenderMode = "2 args" | "0 args";
const renderMode: SliderRenderMode = "0 args";

const ChildComponent: FC = () => {

  // useState が乱立しているので useReducer を用いてまとめましょう
  const [state, dispatch] = useReducer(reducer, initialState);

  // インジケータフラグ
  const isFulfilled =
    state.mode != CurrentMode.INITIAL;
  const isOpened =
    state.mode == CurrentMode.OPENED ||
    state.mode == CurrentMode.LAUNCHED;
  const isLaunched =
    state.mode == CurrentMode.LAUNCHED;

  // スライダー/ボタンの無効化フラグ
  const fuelRangeDisabled =
    state.mode != CurrentMode.INITIAL;
  const openButtonDisabled =
    state.mode != CurrentMode.FULFILLED;
  const launchButtonDisabled =
    state.mode != CurrentMode.OPENED;
  const resetButtonDisabled =
    state.mode == CurrentMode.INITIAL &&
    state.fuelAmount == 0;

  // ボタン生成の引数
  interface ButtonProps {
    label: string,
    action: ChildComponentActionType,
    disabled: boolean
  }

  // ボタンの生成
  const Button = useCallback((props: ButtonProps) => {

    const {label,disabled,action} = props;

    const onClick = () => {
      dispatch({ type: action })
    };

    return (
      <button type="button"
        disabled={disabled}
        onClick={onClick}>{label}</button>
    )

  },[]);

  // スライダー生成の引数
  interface SliderProps {
    value: number,
    disabled: boolean
  }

  // スライダーの生成
  const Slider =

    renderMode == "2 args" ?
    useCallback((props: SliderProps) => {

      const {value,disabled} = props;

      const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
          type: "SET_FUEL_AMOUNT",
          payload: parseInt(e.target.value)
        })
      };

      return (
        <input
          type="range" id="fuel" name="fuelTank"
          min="0" max="100" step="1"
          value={value} disabled={disabled}
          onChange={onChange} />
      );

    }, [] ) :

    renderMode == "0 args" ?
    useCallback((_props: {}) => {

      const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
          type: "SET_FUEL_AMOUNT",
          payload: parseInt(e.target.value)
        })
      };

      return (
        <input
          type="range" id="fuel" name="fuelTank"
          min="0" max="100" step="1"
          value={state.fuelAmount}
          disabled={fuelRangeDisabled}
          onChange={onChange} />
      );

    }, [state.fuelAmount,fuelRangeDisabled] ) :

    () => ( <></> );

  // Fuel Range Label
  // useReducer の state を活用するようにしましょう
  const fuelLabelText = `Fuel: ${String(state.fuelAmount).padStart(3, '0')}%`;

  // Render
  // 変更内容を適用するようにしましょう
  return (
    <div className="subContainer">
      <CarIndicator
        fulfilled={isFulfilled}
        opened={isOpened}
        launched={isLaunched}
      />
      {
        renderMode == "2 args" ? (
          <Slider
            value={state.fuelAmount}
            disabled={fuelRangeDisabled} />
        ) :
        renderMode == "0 args" ?
        ( <Slider /> ) :
        ( <></> )
      }
      <label htmlFor="fuel"> {fuelLabelText} </label>
      <Button
        label="Open the gate"
        action="OPEN_GATE"
        disabled={openButtonDisabled} />
      <Button
        label="Launch"
        action="LAUNCH_CAR"
        disabled={launchButtonDisabled} />
      <Button
        label="Reset"
        action="RESET_STATE"
        disabled={resetButtonDisabled} />
      <p>
        SVG Icons by Tabler Icons (https://tablericons.com/)
      </p>
    </div>
  );
};

const App: FC = () => {
  return <ChildComponent/>
}

createRoot(document.getElementById("root")!).render(<App />);
