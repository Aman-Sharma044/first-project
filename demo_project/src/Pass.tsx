import React, { useEffect, useState } from "react";
import { Table, Card, Spin, message } from "antd";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const Pass: React.FC = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5); // ✅ 10 records per page

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetching a large dataset
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        // Simulate large data by repeating it 10 times
        const bigData = Array(5)
          .fill(res.data)
          .flat()
          .map((item, index) => ({ ...item, id: index + 1 }));
        setData(bigData);
      } catch (error) {
        message.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Pagination logic
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
  ];

  return (
    <div style={{ padding: "30px" }}>
      <Card title="User List with Pagination">
        {loading ? (
          <Spin size="large" />
        ) : (
          <Table
            columns={columns}
            dataSource={currentData}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: data.length,
              onChange: handlePageChange,
              showSizeChanger: false,
            }}
            rowKey="id"
          />
        )}
      </Card>
    </div>
  );
};

export default Pass;
