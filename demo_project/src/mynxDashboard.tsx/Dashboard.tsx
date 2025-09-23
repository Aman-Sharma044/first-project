import { Button, Card, Col, Row, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

interface Resource {
  id: string;
  name: string;
  status: string;
}

function Dashboard() {
  const [resources, setResources] = useState<Resource[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/dashboard", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      const data = await res.json();
      setResources(data.ec2 || []);
    };
    fetchData();
  }, []);

  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Name", dataIndex: "name" },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: string) =>
        text === "running" ? (
          <span style={{ color: "green", fontWeight: "bold" }}>Running</span>
        ) : (
          <span style={{ color: "red", fontWeight: "bold" }}>{text}</span>
        ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Title level={3}>MYNX AWS Dashboard</Title>
        <Button onClick={logout} type="primary" danger>
          Logout
        </Button>
      </div>

      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={6}>
          <Card>
            <Statistic title="EC2 Instances" value={resources.length} />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 20 }}>
        <Title level={4}>EC2 Instances</Title>
        <Table
          dataSource={resources}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
      </Card>
    </div>
  );
}

export default Dashboard;
