import React from "react";

import { Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { ProjectType } from "@/models";
import { parseStatusProject } from "@/utils/helpers";
import { ProjectStatus } from "@/models/enums/Status";
import { EyeOutlined } from "@ant-design/icons";

const ProjectCard = (project: ProjectType) => {
  const navigate = useNavigate();
  return (
    <div className="w-[250px] m-2">
      <Card
        className="h-full"
        cover={
          <img
            className="h-[178px]"
            alt="example"
            src="https://product.hstatic.net/200000653273/product/ca-koi-1_4c51c03c41d14231b77d788c54e07213.jpg"
          />
        }
      >
        {/* float status render */}

        <div className="flex justify-end absolute top-2 right-2">
          <div className=" text-white px-2 py-1 rounded-full">
            {parseStatusProject(project.status)}
          </div>
        </div>
        <Card.Meta
          title={project.name}
          description={
            <div className="flex flex-col">
              <label>Diện tích thi công: {project.area} m2</label>
              <label>Độ sâu: {project.depth} m</label>
              <label>Địa chỉ thi công: {project.address}</label>
            </div>
          }
        />
      </Card>
    </div>
  );
};

export default ProjectCard;
