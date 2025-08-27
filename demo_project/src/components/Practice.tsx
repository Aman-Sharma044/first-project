import React, { useState } from "react";

interface Props {
  id: number; // make optional if you provide default
}

const Practice: React.FC<Props> = ({ id = 0 }) => {
  const [count, setCount] = useState<number>(id);

  console.log("hello world");

  const increment = () => {
    console.log(`increase the value + ${count}`);

    if (count === 10) {
      alert("done");
      setCount(0);
    } else {
      setCount(count + 1);
    }
  };

  return (
    <>
      <div style={{ margin: "30px  )" }}>
        <h1
          style={{
            margin: "10px",
          }}
        >
          {count}
        </h1>

        <button
          onClick={increment}
          style={{
            width: "5%",

            padding: "20px",
            background: "#4CAF50",
            color: "white",

            border: "none",
            borderRadius: "8px",
            cursor: "Pointer",
          }}
        >
          click
        </button>
      </div>
    </>
  );
};

export default Practice;
