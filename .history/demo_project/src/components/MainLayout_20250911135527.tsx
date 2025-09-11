import { Layout } from "antd";
import Sidebar from "./Sidebar";
import HeaderBar from "./HeaderBar";

const { Content } = Layout;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <HeaderBar />
        <Content style={{ margin: "16px", padding: 16, background: "#fff" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
