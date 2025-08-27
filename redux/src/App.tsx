import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useRedux";

function App() {
  const count = useAppSelector((state) => state.counter.value);

  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center">
        <h1>{count}</h1>
        <Button>Click me</Button>
      </div>
    </>
  );
}

export default App;
