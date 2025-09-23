import { useState } from "react";
import { Card, Form, Input, Button, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      const res = await fetch(import.meta.env.VITE_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (data.success) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("role", data.role);
        navigate("/dashboard");
      } else {
        message.error(data.message || "Invalid credentials");
      }
    } catch (err) {
      message.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card style={{ width: 350 }}>
        <Title level={3} style={{ textAlign: "center", marginBottom: 20 }}>
          MYNX AWS Dashboard
        </Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter your username" }]}
          >
            <Input placeholder="Enter username" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            style={{ marginTop: 10 }}
          >
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
