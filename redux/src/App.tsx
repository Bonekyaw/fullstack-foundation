import { Button } from "@/components/ui/button";
import { useAppDisptach, useAppSelector } from "@/hooks/useRedux";
import {
  increment,
  decrement,
  incrementByAmount,
  countUsers,
} from "@/store/counterSlice";

function App() {
  const count = useAppSelector((state) => state.counter.value);
  const adultUsersLength = useAppSelector(countUsers);
  const dispatch = useAppDisptach();

  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center">
        <h1>{count}</h1>
        <Button onClick={() => dispatch(increment())}>Increment</Button>
        <Button onClick={() => dispatch(decrement())}>Decrement</Button>
        <Button onClick={() => dispatch(incrementByAmount(2))}>
          incrementByAmount 2
        </Button>
        <div>{adultUsersLength}</div>
      </div>
    </>
  );
}

export default App;
