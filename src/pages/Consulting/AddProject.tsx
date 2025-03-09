import { PlusOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import { Card } from "antd";
import React from "react";

const AddProject = () => {
  return (
    <Card
      hoverable
      className="w-[360px] h-[300px] flex justify-center items-center"
      onClick={() => {
        // navigate("create");
      }}
    >
      <div className="flex flex-col gap-4 justify-center items-center">
        <PlusOutlined style={{ fontSize: "48px", color: "#1890ff" }} />
        <Meta description="Tạo yêu cầu mới " />
      </div>
    </Card>
  );
};

export default AddProject;
