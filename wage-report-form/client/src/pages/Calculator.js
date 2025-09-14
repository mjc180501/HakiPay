import React, { useState } from "react";
import "./Calculator.css";

function Calculator() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleCalculate = () => {
    try {
      // Evaluate the expression safely
      const result = eval(input); // For production, consider using a math parser
      setInput(result.toString());
    } catch {
      setInput("Error");
    }
  };

  return (
    <div className="calculator">
      <h2>Simple Calculator</h2>
      <input type="text" value={input} readOnly className="display" />
      <div className="buttons">
        {["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", "0", ".", "+", "="].map((btn) => (
          <button
            key={btn}
            onClick={() => (btn === "=" ? handleCalculate() : handleClick(btn))}
          >
            {btn}
          </button>
        ))}
        <button className="clear" onClick={handleClear}>C</button>
      </div>
    </div>
  );
}

export default Calculator;
