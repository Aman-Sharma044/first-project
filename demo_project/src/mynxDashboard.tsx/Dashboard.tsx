import { useEffect, useState } from "react";
import {
  Layout,
  Card,
  Statistic,
  Row,
  Col,
  Select,
  Table,
  Button,
  Space,
  Typography,
} from "antd";
import {
  CloudServerOutlined,
  DatabaseOutlined,
  ClusterOutlined,
  DeploymentUnitOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getAccounts, getDashboard, type DashboardData } from "./api";

const { Header, Content } = Layout;
const { Title } = Typography;

interface Resource {
  [key: string]: string | number;
}

function Dashboard() {
  const [accounts, setAccounts] = useState<string[]>([]);
  const [selected, setSelected] = useState("all");
  const [resources, setResources] = useState<Record<string, Resource[]>>({
    ec2: [],
    rds: [],
    eks: [],
    asg: [],
  });
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<
    Record<string, "all" | "active" | "inactive">
  >({
    ec2: "all",
    rds: "all",
    eks: "all",
    asg: "all",
  });

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const loadAccounts = async () => {
    try {
      const data = await getAccounts();
      setAccounts(data.accounts || []);
    } catch {
      setAccounts(["Production"]);
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const data: DashboardData = await getDashboard(selected);
      const merged: Record<string, Resource[]> = {
        ec2: [],
        rds: [],
        eks: [],
        asg: [],
      };
      data.accounts.forEach((acc) => {
        Object.keys(merged).forEach((t) => {
          if (Array.isArray(acc.resources[t as keyof typeof acc.resources])) {
            merged[t] = merged[t].concat(
              acc.resources[t as keyof typeof acc.resources]
            );
          }
        });
      });
      setResources(merged);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAccounts();
    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, [selected]);

  const filteredResources = (type: string) => {
    const filter = filters[type];
    const data = resources[type] || [];

    if (filter === "active") {
      return data.filter((r) =>
        ["running", "active", "available"].includes(
          String(r.status || r.state).toLowerCase()
        )
      );
    }
    if (filter === "inactive") {
      return data.filter(
        (r) =>
          !["running", "active", "available"].includes(
            String(r.status || r.state).toLowerCase()
          )
      );
    }
    return data;
  };

  const resourceTable = (type: string) => {
    const data = filteredResources(type);
    if (!data.length)
      return (
        <div style={{ textAlign: "center", padding: 20 }}>
          💭 No {type.toUpperCase()} resources
        </div>
      );

    const columns = Object.keys(data[0]).map((key) => ({
      title: key.toUpperCase(),
      dataIndex: key,
      key,
      render: (val: any) => {
        if (key === "status" || key === "state") {
          const color = ["running", "active", "available"].includes(
            String(val).toLowerCase()
          )
            ? "green"
            : "red";
          return <span style={{ color, fontWeight: "bold" }}>{val}</span>;
        }
        return val;
      },
    }));

    return (
      <Table<Resource>
        size="small"
        rowKey={(_, i) => String(i)}
        dataSource={data}
        columns={columns}
        pagination={false} // removed pagination
      />
    );
  };

  const icons: Record<string, React.ReactNode> = {
    ec2: <CloudServerOutlined style={{ fontSize: 22, color: "#4B49AC" }} />,
    rds: <DatabaseOutlined style={{ fontSize: 22, color: "#4B49AC" }} />,
    eks: <ClusterOutlined style={{ fontSize: 22, color: "#4B49AC" }} />,
    asg: <DeploymentUnitOutlined style={{ fontSize: 22, color: "#4B49AC" }} />,
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Header */}
      <Header
        style={{
          background: "#4B49AC",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        <Title level={3} style={{ color: "white", margin: 0 }}>
          MYNX AWS Dashboard
        </Title>
        <Space>
          <Select
            value={selected}
            onChange={setSelected}
            style={{ width: 180 }}
          >
            <Select.Option value="all">All Accounts</Select.Option>
            {accounts.map((acc) => (
              <Select.Option key={acc} value={acc}>
                {acc}
              </Select.Option>
            ))}
          </Select>
          <Button icon={<LogoutOutlined />} danger onClick={logout}>
            Logout
          </Button>
        </Space>
      </Header>

      {/* Content */}
      <Content style={{ padding: 24 }}>
        {/* Statistic Cards */}
        <Row gutter={16}>
          {["ec2", "rds", "eks", "asg"].map((t) => (
            <Col span={6} key={t}>
              <Card>
                <Statistic
                  title={
                    <span
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      {icons[t]} {t.toUpperCase()}
                    </span>
                  }
                  value={filteredResources(t).length}
                />
              </Card>
            </Col>
          ))}
        </Row>

        {/* Detailed Tables */}
        {["ec2", "rds", "eks", "asg"].map((t) => (
          <Card
            key={t}
            title={
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {icons[t]} {t.toUpperCase()}
              </span>
            }
            style={{ marginTop: 20 }}
            loading={loading}
            extra={
              <Select
                size="small"
                value={filters[t]}
                style={{ width: 130 }}
                onChange={(val) => setFilters({ ...filters, [t]: val })}
              >
                <Select.Option value="all">All</Select.Option>
                <Select.Option value="active">Active</Select.Option>
                <Select.Option value="inactive">Inactive</Select.Option>
              </Select>
            }
          >
            {resourceTable(t)}
          </Card>
        ))}
      </Content>
    </Layout>
  );
}

export default Dashboard;
