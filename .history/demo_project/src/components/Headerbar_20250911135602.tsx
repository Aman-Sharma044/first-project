import { Layout, Avatar } from "antd";

const { Header } = Layout;

export default function HeaderBar() {
  return (
    <Header
      style={{
        background: "#fff",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0 16px",
      }}
    >
      <Avatar style={{ backgroundColor: "#1890ff" }}>JE</Avatar>
    </Header>
  );
}
