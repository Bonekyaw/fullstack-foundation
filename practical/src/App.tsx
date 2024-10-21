import { useState } from "react";
import { Button } from "@/components/ui/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="p-4 pt-2">
        <h1>Vite + React</h1>
      </div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button
        onClick={() => setCount((count) => count + 1)}
        variant="destructive"
      >
        count is {count}
      </Button>
    </>
  );
}

export default App;
