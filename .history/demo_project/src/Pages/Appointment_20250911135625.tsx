import { Calendar, Button, Modal } from "antd";
import { useState } from "react";

export default function Appointments() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Button onClick={() => setIsModalOpen(true)}>Filter</Button>
        <Button type="primary">Book Appointment</Button>
      </div>
      <Calendar fullscreen={false} />
      <Modal
        title="Filter Appointments"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <p>Filter options go here...</p>
      </Modal>
    </div>
  );
}
