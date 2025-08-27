import React, { useEffect, useState } from "react";

const Timer: React.FC = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`Count changed: ${count}`);
  }, [count]); // runs only when count changes

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
};
export default Timer;
