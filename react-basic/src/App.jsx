import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState('');  // A
  const [error, setError] = useState('');

  useEffect(() => {
    if (!name) {
      setError("Empty is not allwed.");
    } else if(name.trim() === '') {
      setError("Invalid name.");
    } else setError('');
  }, [name]);

  return (
    <>
      <form>
        <label htmlFor="name">Enter your name </label>
        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)}/>
        {error && <p>{error}</p>}
      </form>
    </>
  );
}

export default App;
