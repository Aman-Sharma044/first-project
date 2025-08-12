import React, { useState, useCallback } from "react";

interface p {
  defaultLength?: number;
  includeNumbers?: boolean;
  includeChars?: boolean;
}

const Pass: React.FC<p> = ({
  defaultLength = 8,
  includeNumbers = true,
  includeChars = true,
}) => {
  // Strictly typed state
  const [length, setLength] = useState<number>(defaultLength);
  const [numberAllow, setNumberAllow] = useState<boolean>(includeNumbers);
  const [charAllow, setCharAllow] = useState<boolean>(includeChars);
  const [password, setPassword] = useState<string>("");

  // Password Generator
  const passwordGenerator = useCallback((): void => {
    let p = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllow) str += "0123456789";
    if (charAllow) str += "!@#$%^&*()_+-=[]{}|;:'";

    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * str.length);
      p += str.charAt(index);
    }

    setPassword(p);
  }, [length, numberAllow, charAllow]);

  return (
    <div
      style={{
        background: "#f4f4f4",
        padding: "20px",
        borderRadius: "10px",
        width: "350px",
        margin: "30px auto",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2>Password Generator</h2>

      {/* Length Input */}
      <div style={{ marginBottom: "10px" }}>
        <label>
          Length:{" "}
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            min={4}
            max={32}
            style={{
              padding: "5px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "60px",
            }}
          />
        </label>
      </div>

      {/* Number Allow */}
      <div style={{ marginBottom: "10px" }}>
        <label>
          <input
            type="checkbox"
            checked={numberAllow}
            onChange={() => setNumberAllow((prev) => !prev)}
          />{" "}
          Include Numbers
        </label>
      </div>

      {/* Special Char Allow */}
      <div style={{ marginBottom: "10px" }}>
        <label>
          <input
            type="checkbox"
            checked={charAllow}
            onChange={() => setCharAllow((prev) => !prev)}
          />{" "}
          Include Special Characters
        </label>
      </div>

      {/* Generate Button */}
      <button
        onClick={passwordGenerator}
        style={{
          background: "#4CAF50",
          color: "#fff",
          padding: "10px 15px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Generate Password
      </button>

      {/* Password Display */}
      {password && (
        <div
          style={{
            marginTop: "15px",
            padding: "10px",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "5px",
            fontWeight: "bold",
            wordBreak: "break-all",
          }}
        >
          {password}
        </div>
      )}
    </div>
  );
};

export default Pass;
