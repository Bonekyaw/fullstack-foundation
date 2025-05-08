import { useRef } from "react";
import "./App.css";
import InputBox from "../../components/InputBox";
import Dialog from "../../components/Dialog";

// let timer: number;  // qwer32433
type MyInputBox = {
  focus: () => void;
  // ref: RefObject<HTMLInputElement | null>;
};

function App() {
  const inputRef = useRef<MyInputBox>(null); // { current: initialValue }
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <div className="card">
        <Dialog title="Passing Dialog" ref={dialogRef} />
        <button onClick={() => dialogRef.current?.showModal()}>
          Open Dialog
        </button>
        <h3>Passing Ref to Custom Component</h3>
        <button onClick={() => inputRef.current?.focus()}>
          Focus Input Box
        </button>
        <InputBox ref={inputRef} />
      </div>
    </>
  );
}

export default App;
