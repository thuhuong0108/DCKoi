import React from "react";

import { Card } from "antd";
import { useNavigate } from "react-router-dom";

const project = {
  id: "6e843e92-e55f-414c-a2e7-d52afe8251ce",
  customerName: "customer",
  name: "customer project",
  email: "guest1@example.com",
  note: "note",
  packageName: "Ngow Ngow",
  address: "671 street, Tan Phu, Phường 06, Quận 11, Thành phố Hồ Chí Minh",
  phone: "0123456789",
  area: 100,
  depth: 100,
  status: "CONSTRUCTING",
  createdAt: "2025-02-26T07:38:41.180115Z",
  updatedAt: "2025-03-06T04:39:58.280472Z",
  staffs: [],
};

const CardProject = () => {
  // const CardProject = ({project}) => {
  const navigate = useNavigate();
  return (
    <div className="w-[280px]" onClick={() => navigate(`${project.id}`)}>
      <Card
        hoverable
        cover={
          <img
            alt="example"
            src="https://product.hstatic.net/200000653273/product/ca-koi-1_4c51c03c41d14231b77d788c54e07213.jpg"
          />
        }
      >
        <Card.Meta
          title={project.name}
          description={
            <div className="flex flex-col">
              <label>Diện tích thi công: {project.area}</label>
              <label>Độ sâu: {project.depth}</label>
              <label>Địa chỉ thi công: {project.address}</label>
            </div>
          }
        />
      </Card>
    </div>
  );
};

export default CardProject;
