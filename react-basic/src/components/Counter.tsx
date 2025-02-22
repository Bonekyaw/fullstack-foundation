import React, { useEffect, useState, useMemo } from "react";

// Props and types for Counter
interface CounterProps {
  initialValue: number;
}

function expensiveCompute(initialValue) {
  console.log("expensiveComputedValue function called");

  const numericValue = Number(initialValue);
  if (!isNaN(numericValue)) {
    return numericValue;
  } else {
    return 0;
  }
}

// Counter Component
const Counter = ({ initialValue }: CounterProps) => {
  // 7
  console.log("Counter rendered");

  const expensiveComputedValue = useMemo(
    () => expensiveCompute(initialValue),
    [initialValue]
  ); // 7

  const [count, setCount] = useState<number>(0);

  // Update count when initialValue changes
  useEffect(() => {
    setCount(expensiveComputedValue);
  }, [expensiveComputedValue]);

  return (
    <>
      <h2>Counter</h2>
      <p>Validated Initial Value: {expensiveComputedValue}</p>
      <p>Current Count: {count}</p>
      <button onClick={() => setCount((count) => count + 1)}>Increment</button>
    </>
  );
};

export default Counter;
