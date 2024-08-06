import { useState, useEffect, useCallback } from "react";
import "./App.css";
import calculate from "./util/evaluate";

function App() {
  const buttons = [
    "C",
    "√",
    "%",
    "/",
    "7",
    "8",
    "9",
    "*",
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
    ".",
  ];
  const [calculated, setCalculated] = useState(false);
  const [statement, setStatement] = useState("");
  const [result, setResult] = useState("");
  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key;
      if (key == "Escape" || key == "C") {
        setResult(() => "");
        setStatement(() => "");
      } else if (key == "Enter" || key == "=") {
        let ans = calculate(result);
        if (Number.isNaN(ans)) ans = "Error!";
        setStatement(result);
        setResult(ans.toString());
        setCalculated(true);
      } else if (buttons.includes(key) || key == "(" || key == ")") {
        if (calculated) {
          setStatement("");
          setResult("");
          setCalculated(false);
        }
        setResult((prev) => prev + key);
      }
    },
    [result, statement]
  );
  useEffect(() => {
    window.addEventListener("keyup", handleKeyUp);
    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [handleKeyUp]);
  return (
    <div className="wrapper">
      <div className="calc-grid">
        <div className="output">
          <div className="statement">{statement}</div>
          <div className="result">{result}</div>
        </div>
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() =>
              handleKeyUp(new KeyboardEvent("keyup", { key: btn }))
            }
          >
            {btn}
          </button>
        ))}
        <button
          style={{ color: "#2a5698", background: "white" }}
          onClick={() => handleKeyUp(new KeyboardEvent("keyup", { key: "=" }))}
        >
          =
        </button>
      </div>
    </div>
  );
}

export default App;
