import React, { useState, useCallback } from "react";
import "./App.css";

import Counter from "./components/Counter";
import Title from "./components/Title";
import InitialSetup from "./components/InitialSetup";

const App = () => {
  console.log("App rendered");

  const [isSmartMode, setIsSmartMode] = useState(false); // true
  const [initialValue, setInitialValue] = useState(0);

  const onSetupHandler = useCallback((inputValue: number) => {
    console.log("onSetupHandler in App - function called");

    setInitialValue(inputValue);
  }, []);

  const modeHandler = useCallback(() => {
    console.log("modeHandler in App - function called");
    setIsSmartMode((prev) => !prev);
    // setIsSmartMode(!isSmartMode);
  }, []);

  return (
    <div className={isSmartMode ? "bg-smart" : ""}>
      <Title onChangeMode={modeHandler} />
      <InitialSetup onSetup={onSetupHandler} />
      <Counter key={initialValue} initialValue={initialValue} />
    </div>
  );
};

export default App;
