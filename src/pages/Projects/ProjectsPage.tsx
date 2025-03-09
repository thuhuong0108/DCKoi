import { Title } from "@/components";
import { Row } from "antd";
import React from "react";
import CardProject from "./CardProject";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store/hook";
import { selectedProject } from "@/redux/slices/project/projectSlices";

const ProjectsPage = () => {
  const dispatch = useDispatch();
  const project = useAppSelector(selectedProject);
  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full">
      <Title name="Danh sách dự án thi công" />
      <Row className="gap-5 my-4">{/* <CardProject project={project}/> */}</Row>

      <Row className="gap-5 my-4">
        <CardProject />
      </Row>
    </div>
  );
};

export default ProjectsPage;
