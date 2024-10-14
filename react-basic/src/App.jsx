import { useState } from "react";

import "./App.css";

function App() {
  const [user, setUser] = useState({ name: "Mr Phone", age: 38, isBusy: true });

  return (
    <>
      <p>Name : {user.name}</p>
      <p>Age : {user.age}</p>
      {user.isBusy ? <p>He is now busy.</p> : <p>He is now available.</p>}
      <button
        onClick={() => setUser((prev) => ({ ...prev, isBusy: !user.isBusy }))}
      >
        Change status
      </button>
    </>
  );
}

export default App;
