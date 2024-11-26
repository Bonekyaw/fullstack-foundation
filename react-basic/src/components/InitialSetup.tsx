import React, { useState, useRef, useEffect, useCallback } from "react";

// Props and types for InitialSetup
interface InitialSetupProps {
  onSetup: (value: number) => void;
}

// InitialSetup Component
const InitialSetup = ({ onSetup }: InitialSetupProps) => {
  console.log("InitialSetup rendered");

  const [inputValue, setInputValue] = useState<string>("");

  const handleSubmit = useCallback(() => {
    console.log("handleSubmit function called");

    const numericValue = Number(inputValue); // "7" => 7
    if (!isNaN(numericValue)) {
      onSetup(numericValue);
    } else {
      alert("Please enter a valid number.");
    }
  }, [onSetup]);

  // Ref to store the current handleSubmit reference
  // const handleSubmitRef = useRef(handleSubmit);

  // useEffect(() => {
  //   if (handleSubmitRef.current !== handleSubmit) {
  //     console.log("handleSubmit function recreated");
  //     handleSubmitRef.current = handleSubmit;
  //   }
  // });

  return (
    <>
      <h2>Initial Value Setup</h2>
      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter initial value"
      />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
};

export default InitialSetup;
