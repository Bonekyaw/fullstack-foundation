import React, { useState } from "react";
import "./App.css";

import Counter from "./components/Counter";
import Title from "./components/Title";
import InitialSetup from "./components/InitialSetup";

const App = () => {
  console.log("App rendered");

  const [initialValue, setInitialValue] = useState<number>(0);

  const onSetupHandler = (inputValue: number) => {
    console.log("onSetupHandler in App - function called");

    setInitialValue(inputValue);
  };

  return (
    <>
      <Title />
      <InitialSetup onSetup={onSetupHandler} />
      <Counter initialValue={initialValue} />
    </>
  );
};

export default App;
