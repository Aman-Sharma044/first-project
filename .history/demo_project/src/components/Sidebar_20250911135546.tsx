import { Layout, Menu } from "antd";
import {
  CalendarOutlined,
  BarChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <Sider collapsible theme="light">
      <div style={{ padding: "16px", fontWeight: "bold" }}>MYNX</div>
      <Menu
        mode="inline"
        onClick={({ key }) => navigate(key)}
        items={[
          { key: "/", icon: <BarChartOutlined />, label: "Dashboard" },
          {
            key: "/appointments",
            icon: <CalendarOutlined />,
            label: "Appointments",
          },
          { key: "/reports", icon: <BarChartOutlined />, label: "Reports" },
          { key: "/patients", icon: <UserOutlined />, label: "Patients" },
          { key: "/providers", icon: <TeamOutlined />, label: "Providers" },
        ]}
      />
    </Sider>
  );
}
