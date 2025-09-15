import { Form, Input, Button, Card, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { login } from "./api";

const { Title } = Typography;

export default function Login() {
  const navigate = useNavigate();

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      const res = await login(values.username, values.password);
      if (res.success && res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.role || "");
        message.success("Login successful");
        navigate("/dashboard");
      } else {
        message.error(res.message || "Invalid credentials");
      }
    } catch {
      message.error("Login failed");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f6fa",
      }}
    >
      <Card style={{ width: 400, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <Title level={3} style={{ textAlign: "center", marginBottom: 20 }}>
          MYNX AWS Dashboard
        </Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter username" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
