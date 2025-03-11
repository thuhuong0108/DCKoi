import React from "react";
import CardProject from "./CardProject";
import { Row } from "antd";

const ManagementProjects = () => {
  return (
    <div>
      <Row className="gap-5">
        <CardProject />
        <CardProject />
        <CardProject />
        <CardProject />
      </Row>
    </div>
  );
};

export default ManagementProjects;
