import React, { useState, useMemo } from "react";

interface CalculationProps {
  initialCount: number;
  initialOther: boolean;
}

const Calculation: React.FC<CalculationProps> = ({
  initialCount,
  initialOther,
}) => {
  const [count, setCount] = useState<number>(initialCount);
  const [other, setOther] = useState<boolean>(initialOther);

  // Hard calculation only runs when "count" changes
  const cal: number = useMemo(() => {
    console.log("hard count running...");
    let total = 0;
    for (let i = 0; i < 1000000; i++) {
      total += i;
    }
    return total + count;
  }, [count, other]);

  return (
    <div>
      <h2>Hard Calculation: {cal}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setOther(!other)}>Toggle</button>
    </div>
  );
};

export default Calculation;
