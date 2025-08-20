import React, { useState, useCallback } from "react";

const Password: React.FC = () => {
  const [length, setLength] = useState<number>(8);
  const [numberAllow, setNumberAllow] = useState<boolean>(true);
  const [charAllow, setCharAllow] = useState<boolean>(true);
  const [password, setPassword] = useState<string>("");

  const passwordGenerator = useCallback(() => {
    let p = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllow) str += "0123456789";
    if (charAllow) str += "!@#$%^&*()_+-=[]{}|;:'";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * str.length);
      p += str.charAt(randomIndex);
    }
    setPassword(p);
  }, [length, numberAllow, charAllow]);

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "10px auto",
        padding: "20px",
        background: "#ffffff",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        borderRadius: "12px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333" }}>
        🔐 Password Generator
      </h2>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ fontWeight: "bold" }}>
          Length:
          <input
            type="number"
            min={1}
            max={50}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            style={{
              marginLeft: "10px",
              padding: "5px",
              width: "60px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
        </label>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>
          <input
            type="checkbox"
            checked={numberAllow}
            onChange={(e) => setNumberAllow(e.target.checked)}
            style={{ marginRight: "8px" }}
          />
          Include Numbers
        </label>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>
          <input
            type="checkbox"
            checked={charAllow}
            onChange={(e) => setCharAllow(e.target.checked)}
            style={{ marginRight: "8px" }}
          />
          Include Special Characters
        </label>
      </div>

      <button
        onClick={passwordGenerator}
        style={{
          width: "100%",
          padding: "10px",
          background: "#4CAF50",
          color: "white",
          fontWeight: "bold",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Generate Password
      </button>

      {password && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            background: "#f4f4f4",
            borderRadius: "8px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          {password}
        </div>
      )}
    </div>
  );
};

export default Password;
