import React from "react";
import { Card, Descriptions } from "antd";
import type { DescriptionsProps } from "antd";

const InformationContract = ({ project, quotation }) => {
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Khách hàng",
      children: project.customerName,
    },
    {
      key: "2",
      label: "Số điện thoại",
      children: project.phone,
    },
    {
      key: "3",
      label: "Địa chỉ mail",
      children: project.email,
    },
    {
      key: "4",
      label: "Giá trị hợp đồng",
      children: quotation.totalPrice,
    },
    {
      key: "5",
      label: "Địa chỉ",
      children: project.address,
    },
  ];
  return (
    <Card hoverable className="w-2/3 m-1">
      <Descriptions
        title="Thông tin khách hàng trên hợp đồng"
        layout="vertical"
        items={items}
      />
    </Card>
  );
};

export default InformationContract;
