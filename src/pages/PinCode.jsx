import React, { useRef } from "react";
import "./PinCode.css"; 

function PinCode({ length = 6, onComplete }) {
  const inputs = useRef([]);

  const handleKeyUp = (e, index) => {
    const target = e.target;
    const maxLength = parseInt(target.maxLength, 10);
    const currentLength = target.value.length;

    // Move to the next input
    if (currentLength >= maxLength) {
      if (index < inputs.current.length - 1) {
        inputs.current[index + 1].focus();
      }
    }

    // Move to the previous input on backspace
    if (e.key === "Backspace" && currentLength === 0) {
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }

    // Call onComplete when all inputs are filled
    const pinValue = inputs.current.map((input) => input.value).join("");
    if (pinValue.length === length) {
      onComplete(pinValue);
    }
  };

  const handleKeyDown = (e) => {
    e.target.value = ""; // Clear the input on keydown
  };

  return (
    <div className="pin-code d-flex justify-content-center">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          type="number"
          maxLength="1"
          className="form-control text-center mx-1"
          style={{ width: "40px", height: "45px", fontSize: "24px" }}
          onKeyUp={(e) => handleKeyUp(e, index)}
          onKeyDown={handleKeyDown}
          ref={(el) => (inputs.current[index] = el)}
        />
      ))}
    </div>
  );
}

export default PinCode;
