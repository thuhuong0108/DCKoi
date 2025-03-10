import React from "react";
import { Row, Steps } from "antd";
import { ProjectStatus } from "@/models/enums/Status";

const StepStatus = ({ item }) => {
  const stepsItems = [
    { title: "Đã gửi yêu cầu" },
    { title: "Chờ báo giá" },
    { title: "Hoàn thành báo giá" },
  ];

  const currentStep = item.status === ProjectStatus.DESIGNING ? 2 : 1;

  return (
    <Row className="my-8 mx-10">
      <Steps current={currentStep} status="process" items={stepsItems} />
    </Row>
  );
};

export default StepStatus;
