import { useState, useRef } from "react";
import "./App.css";

function App() {
  const inputRef = useRef<HTMLInputElement>(null); // { current: initialValue }
  const [submittedName, setSubmittedName] = useState<string>();

  const onSubmitHandler = () => {
    if (inputRef.current === null) {
      return;
    }
    setSubmittedName(inputRef.current.value);
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  return (
    <>
      <div className="card">
        <h3>Using Ref</h3>
        <p>You entered this name : {submittedName ?? '" "'}</p>
        <label htmlFor="name">Name</label>
        <input id="name" ref={inputRef} type="text" />
        <button onClick={onSubmitHandler}>Submit</button>
      </div>
    </>
  );
}

export default App;
