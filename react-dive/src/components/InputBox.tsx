import { useState, type RefObject, useImperativeHandle, useRef } from "react";

type MyInputBox = {
  focus: () => void;
  // ref: RefObject<HTMLInputElement | null>;
};

function InputBox({ ref }: { ref: RefObject<MyInputBox | null> }) {
  const inputRef = useRef<HTMLInputElement>(null); // { current: initialValue }
  const [submittedName, setSubmittedName] = useState<string>();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
  }));

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
        <p>You entered this name : {submittedName ?? '" "'}</p>
        <label htmlFor="name">Name</label>
        <input id="name" ref={inputRef} type="text" />
        <button onClick={onSubmitHandler}>Submit</button>
      </div>
    </>
  );
}

export default InputBox;
