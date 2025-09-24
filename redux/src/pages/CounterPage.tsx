import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  increment,
  decrement,
  // incrementByAmount,
  // countUsers,
} from "@/store/counterSlice";

function CounterPage() {
  const count = useAppSelector((state) => state.counter.value);
  // const adultUsersLength = useAppSelector(countUsers);
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center justify-center gap-3">
      <Button onClick={() => dispatch(increment())}>Increment</Button>
      <h1>{count}</h1>
      <Button onClick={() => dispatch(decrement())}>Decrement</Button>
      {/* <Button onClick={() => dispatch(incrementByAmount(2))}>
          incrementByAmount 2
        </Button>
        <div>{adultUsersLength}</div> */}
    </div>
  );
}

export default CounterPage;
