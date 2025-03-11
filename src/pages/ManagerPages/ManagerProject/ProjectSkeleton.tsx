import React from "react";
import { Card, Skeleton } from "antd";

const ProjectSkeleton = () => {
  return (
    <Card
      className="rounded-lg bg-white w-[300px] "
      cover={
        <Skeleton.Image
          style={{ height: "200px", objectFit: "cover", width: "100%" }}
        />
      }
    >
      <Skeleton active paragraph={{ rows: 2 }} />
    </Card>
  );
};

export default ProjectSkeleton;
