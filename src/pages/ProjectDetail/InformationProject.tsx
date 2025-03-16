import { ProjectDetailType } from "@/models/ProjectType";
import {
  AspectRatio,
  LocationCityRounded,
  Mail,
  NotesRounded,
  Person,
  PhonelinkLockTwoTone,
} from "@mui/icons-material";
import { Card, Col, Row, Typography } from "antd";

const InformationProject = (project: ProjectDetailType) => {
  return (
    <Card title={`Dự án: ${project.name}`} className="w-full">
      <Row className="space-y-4">
        <Col span={12}>
          <div className="flex items-center mt-3 gap-4">
            <Person className="mr-2" />
            <Typography.Text>
              <strong>Khách hàng:</strong> {project.customerName}
            </Typography.Text>
          </div>
          <div className="flex items-center mt-3 gap-4">
            <PhonelinkLockTwoTone className="mr-2" />
            <Typography.Text>
              <strong>Điện thoại:</strong> {project.phone}
            </Typography.Text>
          </div>
          <div className="flex items-center mt-3 gap-4">
            <Mail className="mr-2" />
            <Typography.Text>
              <strong>Email:</strong> {project.email}
            </Typography.Text>
          </div>
          <div className="flex items-center mt-3 gap-4">
            <LocationCityRounded className="mr-2" />
            <Typography.Text>
              <strong>Địa chỉ:</strong> {project.address}
            </Typography.Text>
          </div>
        </Col>
        <Col span={12}>
          <div className="flex items-center mt-3 gap-4">
            <PhonelinkLockTwoTone className="mr-2" />
            <Typography.Text>
              <strong>Độ sâu:</strong> {project.depth} m
            </Typography.Text>
          </div>
          <div className="flex items-center mt-3 gap-4">
            <AspectRatio className="mr-2" />
            <Typography.Text>
              <strong>Diện tích:</strong> {project.area} m2
            </Typography.Text>
          </div>
          <div className="flex items-center mt-3 gap-4">
            <NotesRounded className="mr-2" />
            <Typography.Text>
              <strong>Chú thích:</strong> {project.note}
            </Typography.Text>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default InformationProject;
