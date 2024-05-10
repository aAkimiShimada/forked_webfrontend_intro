// C13/Q1
// `useState`を使ったボタンと`useRef`を使ったボタンのカウンタを作成してください。
// カウントはボタンのラベルに表示します。
// 期待する挙動は以下の通り。
// * `useState`を使ったボタンは、ボタン押下ごとにカウントアップする。
// * `useRef`を使ったボタンは、ボタン押下でカウントアップしない。再描画時にカウントを反映する。
//
import { useCallback, useState, useRef, FC } from "react";
import { createRoot } from "react-dom/client";

const ChildComponent: FC = () => {
  const [stateCount,setStateCount] = useState<number>(0);
  const ref = useRef<number>(0);
  // TODO

  function onClickState() {
    setStateCount(stateCount+1);
  };
  function onClickRef() {
    ref.current += 1;
  };

  return (
    <>
      <p>useState & useRef</p>
      <button
        type="button"
        onClick={onClickState}>{`state: ${stateCount}`}</button>
      <button
        type="button"
        onClick={onClickRef}>{`ref: ${ref.current}`}</button>
    </>
  );
};

function App() {
  return <ChildComponent />;
}

createRoot(document.getElementById("root")!).render(<App />);
