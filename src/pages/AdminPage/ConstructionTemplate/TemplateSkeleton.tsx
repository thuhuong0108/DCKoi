import { Card, Skeleton } from "antd";
import React from "react";

const TemplateSkeleton = () => {
  return (
    <Card
      hoverable
      style={{
        width: 300,
        height: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Skeleton.Image style={{ width: 200, height: 200 }} />
      <Skeleton active />
    </Card>
  );
};

export default TemplateSkeleton;
