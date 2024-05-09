// C04/Q1
// 以下の要件を満たしてください
// * 画面上の `<button>` `<div>` にそれぞれ下記を満たす click イベントのハンドラを追加する
//   * `<button>` をクリックした際には `Clicked Button` とコンソールに表示する
//   * `<div>` をクリックした際には `Clicked Div` とコンソールに表示する
//
import { FC } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

// ’Clicked Button’ とコンソールに表示するイベントハンドラー 'onClickButton' を実装

// 'Clicked Div' とコンソールに表示するイベントハンドラー 'onClickDiv' を実装

// Button を押したら 'Clicked Button', Div を押したら 'Clicked Div' と表示されるようにする

const ChildComponent: FC = () => {

  function onButtonPressed(e: React.MouseEvent) {
    e.stopPropagation();
    console.log("button pressed");
  }

  function onDivPressed(e: React.MouseEvent) {
    e.stopPropagation();
    console.log("div pressed");
  }

  return (
    <div className="subContainer">
      <button type="button" className="button" onClick={onButtonPressed}>Button</button>
      <div className="area" onClick={onDivPressed}>Div</div>
    </div>
  );

};

const App: FC = () => {
  return (
    <div>
      <ChildComponent />
    </div>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
