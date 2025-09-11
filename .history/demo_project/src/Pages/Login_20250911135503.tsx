import { Button, Card, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../components/Loader";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    const { username, password } = values;

    if (username === "aman" && password === "P@ssw0rd") {
      setLoading(true);
      setTimeout(() => {
        sessionStorage.setItem("auth", "true");
        navigate("/");
      }, 2000); // 2 sec spinner
    }
  };

  if (loading) return <Loader />;

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card title="Login" style={{ width: 300 }}>
        <Form onFinish={onFinish}>
          <Form.Item name="username" rules={[{ required: true }]}>
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true }]}>
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
}
