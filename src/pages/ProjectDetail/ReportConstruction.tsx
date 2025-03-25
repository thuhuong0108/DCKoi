import Card from "@/components/ui/Card";
import { ExclamationCircleTwoTone } from "@ant-design/icons";
import { Avatar, Col, Image, Row } from "antd";
import React from "react";

interface WorkItem {
  task: string;
  time: string;
}

interface DescriptionItem {
  detail: string;
}

interface ManagerData {
  work: WorkItem[];
  description: DescriptionItem[];
  date: string;
}

const ReportConstruction: React.FC<{ data: ManagerData }> = ({ data }) => {
  return (
    <Card hoverable className="flex flex-col gap-4 my-4">
      <div className="flex flex-row justify-between items-center">
        <div>
          <Avatar style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}>
            U
          </Avatar>
          <label className="ml-5">Manager</label>
        </div>
        <div>
          <label>{data.date}</label>
          <ExclamationCircleTwoTone className="m-4" />
        </div>
      </div>

      <Row className="flex flex-row justify-between items-start ">
        <Col span={6} className="p-3">
          <label className="text-gray-400 font-medium">Công việc</label>
          <span className="block  border-b border-gray-300 mt-1"></span>
          <span className="my-2">Chuẩn bị mặt bằng</span>
        </Col>
        <Col span={14} className="p-3">
          <label className="text-gray-400 font-medium">Mồ tả chi tiết</label>
          <span className="block border-b border-gray-300 mt-1"></span>
          <label className="my-2">
            Remove trees, shrubs, weeds, and other natural obstacles.
          </label>
        </Col>
        <Col span={3} className="p-3">
          <label className="text-gray-400 font-medium">Hình ảnh</label>
          <span className="block border-b border-gray-300 mt-1"></span>
          <Image
            className="my-2"
            width={100}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </Col>
      </Row>
    </Card>
  );
};

export default ReportConstruction;
