import { useState, useRef } from "react";
import "./App.css";

// let timer: number;  // qwer32433

function App() {
  const timer = useRef(0); // { current: 0 }
  const [isStart, setIsStart] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  const startTimer = () => {
    setIsStart(true);
    setIsExpired(false);
    timer.current = setTimeout(() => {
      setIsExpired(true);
      setIsStart(false);
    }, 5000);
  };

  const stopTimer = () => {
    clearTimeout(timer.current);
    setIsStart(false);
    setIsExpired(false);
  };

  return (
    <>
      <div className="card">
        <h3>Timer</h3>
        {isStart && <p>Timer is running</p>}
        {isExpired && <p>Timer expired</p>}
        <button onClick={() => (isStart ? stopTimer() : startTimer())}>
          {isStart ? "Stop Timer" : "Start Timer"}
        </button>
      </div>
    </>
  );
}

export default App;
