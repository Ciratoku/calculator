import { useState } from "react";
import "./App.css";
import "./style.css";

function App() {
  const buttons = [
    "C",
    "√",
    "%",
    "/",
    "7",
    "8",
    "9",
    "x",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "00",
    "0",
    ",",
  ];
  return (
    <div className="calc-grid">
      <div className="output">
        <div className="statement">123</div>
        <div className="result">123</div>
      </div>
      {buttons.map((btn) => (
        <button key={btn}>{btn}</button>
      ))}
      <button style={{ color: "rgba(0, 0, 0, 0.5)", background: "white" }}>
        =
      </button>
    </div>
  );
}

export default App;
