import { useEffect, useState } from "react";

import { Link, Route, Routes, useLocation } from "react-router-dom";
import { Layout, Menu, Button, Avatar, Input } from "antd";
import {
  CalendarOutlined,
  FileTextOutlined,
  TeamOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FilterOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

export default function MainLayout() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handler = () => setCollapsed(window.innerWidth < 900);
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const items = [
    {
      key: "/dashboard",
      icon: <CalendarOutlined />,
      label: <Link to="/dashboard">Schedule</Link>,
    },
    {
      key: "/appointments",
      icon: <FileTextOutlined />,
      label: <Link to="/appointments">Appointments</Link>,
    },
    {
      key: "/reports",
      icon: <TeamOutlined />,
      label: <Link to="/reports">Reports</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={220}
        collapsible
        collapsed={collapsed}
        onCollapse={(c) => setCollapsed(c)}
        className="app-sider"
      >
        <div className="sider-logo">
          <img src="https://i.imgur.com/7kQEsHU.png" alt="logo" />
        </div>
        <Menu
          theme="light"
          selectedKeys={[location.pathname]}
          mode="inline"
          items={items}
        />
        <div style={{ padding: 12 }}>
          <Button
            type="link"
            onClick={() => setCollapsed(!collapsed)}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          >
            {collapsed ? "Expand" : "Collapse"}
          </Button>
        </div>
      </Sider>

      <Layout>
        <Header className="app-header">
          <div className="header-left">
            <Input.Search
              placeholder="Patient Id or Name"
              style={{ width: 320 }}
            />
          </div>
          <div className="header-right">
            <Button icon={<FilterOutlined />}>Filter</Button>
            <Button type="primary" icon={<PlusOutlined />}>
              Book Appointment
            </Button>
            <Avatar>M</Avatar>
          </div>
        </Header>

        <Content style={{ padding: 24 }}>
          <Routes>
            <Route index element={<NavigateToAppointments />} />
            <Route path="/appointments" element={<Appointment />} />
            <Route
              path="/dashboard"
              element={<Placeholder title="Dashboard" />}
            />
            <Route path="/reports" element={<Placeholder title="Reports" />} />
            <Route path="*" element={<Placeholder title="Not found" />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

function NavigateToAppointments() {
  return <Placeholder title="Home" />;
}
