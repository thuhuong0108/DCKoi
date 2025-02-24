import { PlusOutlined } from "@ant-design/icons";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import { useNavigate } from "react-router-dom";

const PlusTemplate = ({
  setIsModalOpen,
}: {
  setIsModalOpen: (value: boolean) => void;
}) => {
  return (
    <Card
      hoverable
      style={{
        width: 240,
        height: 300,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={() => {
        setIsModalOpen(true);
      }}
    >
      <div style={{ textAlign: "center" }}>
        <PlusOutlined style={{ fontSize: "48px", color: "#1890ff" }} />
        <Meta description="Thêm quy trình thi công mới" />
      </div>
    </Card>
  );
};

export default PlusTemplate;
