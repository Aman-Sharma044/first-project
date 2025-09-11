import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // demo: accept any credentials
      navigate("/appointments");
    }, 2000);
  };

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="login-header">
          <img
            src="https://i.imgur.com/7kQEsHU.png"
            alt="logo"
            className="logo"
          />
          <h2>MYNX Demo</h2>
        </div>

        <form onSubmit={onSubmit} className="login-form">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{ marginTop: 12 }}
          />

          <Button
            type="primary"
            htmlType="submit"
            block
            style={{ marginTop: 16 }}
            disabled={!username || !password}
          >
            {loading ? <Spin /> : "Login"}
          </Button>
        </form>

        <div className="login-note">
          Demo login — any credentials accepted. Shows 2s spinner.
        </div>
      </div>
    </div>
  );
}
