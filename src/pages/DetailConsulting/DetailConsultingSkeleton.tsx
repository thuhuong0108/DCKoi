import { TableSkeleton, Title } from "@/components";
import Card from "@/components/ui/Card";
import { Skeleton } from "antd";
import React from "react";

const DetailConsultingSkeleton = () => {
  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full gap-4">
      <Title name="Chi tiết yêu cầu tư vấn" />
      <Skeleton active />

      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((item) => (
          <Card className="rounded-lg bg-white w-[300px] " key={item}>
            <Skeleton active paragraph={{ rows: 2 }} />
          </Card>
        ))}
      </div>

      <Skeleton.Input active className="w-full" />
      <TableSkeleton />
    </div>
  );
};

export default DetailConsultingSkeleton;
