import { PlusOutlined } from "@ant-design/icons";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import { useNavigate } from "react-router-dom";

const PlusPackage = () => {
  const navigate = useNavigate();
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
        navigate("create");
      }}
    >
      <div style={{ textAlign: "center" }}>
        <PlusOutlined style={{ fontSize: "48px", color: "#1890ff" }} />
        <Meta description="Thêm gói bảo dưỡng mới" />
      </div>
    </Card>
  );
};

export default PlusPackage;
