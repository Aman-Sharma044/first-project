import React, { useState, useCallback } from "react";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  const [adjective, setAdjective] = useState<string>("have");
  const [count, setCount] = useState<number>(0);

  const change = useCallback(() => {
    return setAdjective("clear");
  }, []);

  return (
    <>
      <div>
        <h1>{count}</h1>
      </div>
      {adjective}

      <Navbar adj={"good"} changeAdjective={change} />
      <button onClick={() => setCount(count + 1)}>click</button>
    </>
  );
};

export default App;
