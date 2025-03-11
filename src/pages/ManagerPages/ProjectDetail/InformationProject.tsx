import { ProjectDetailType } from "@/models/ProjectType";
import {
  PhonelinkLockTwoTone,
  LocationCityRounded,
  EmailRounded,
  NotesRounded,
} from "@mui/icons-material";
import { Card, Typography } from "antd";
import React from "react";

const InformationProject = (project: ProjectDetailType) => {
  return (
    <div className="flex flex-row justify-between items-stretch mb-5 mt-8 mx-10 h-full ">
      <Card title={`Dự án: ${project.name}`} className="mt-5 w-full">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center">
            <PhonelinkLockTwoTone className="mr-2" />
            <Typography.Text>
              <strong>Khách hàng:</strong> {project.customerName}
            </Typography.Text>
          </div>
          <div className="flex items-center">
            <PhonelinkLockTwoTone className="mr-2" />
            <Typography.Text>
              <strong>Điện thoại:</strong> {project.phone}
            </Typography.Text>
          </div>
          <div className="flex items-center">
            <EmailRounded className="mr-2" />
            <Typography.Text>
              <strong>Email:</strong> {project.email}
            </Typography.Text>
          </div>
          <div className="flex items-center">
            <LocationCityRounded className="mr-2" />
            <Typography.Text>
              <strong>Địa chỉ:</strong> {project.address}
            </Typography.Text>
          </div>
          <div className="flex items-center">
            <PhonelinkLockTwoTone className="mr-2" />
            <Typography.Text>
              <strong>Độ sâu:</strong> {project.depth}
            </Typography.Text>
          </div>
          <div className="flex items-center">
            <PhonelinkLockTwoTone className="mr-2" />
            <Typography.Text>
              <strong>Diện tích:</strong> {project.area}
            </Typography.Text>
          </div>
          <div className="flex items-center">
            <NotesRounded className="mr-2" />
            <Typography.Text>
              <strong>Chú thích:</strong> {project.note}
            </Typography.Text>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InformationProject;
