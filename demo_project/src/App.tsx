import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Homes";
import About from "./pages/About";

export default function App() {
  return (
    <BrowserRouter>
      {/* Navbar */}
      <nav style={{ display: "flex", gap: "1rem", marginBottom: "21px" }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
