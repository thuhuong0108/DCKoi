import { Title } from "@/components";
import { ProjectStatus } from "@/models/enums/Status";
import {
  projectActions,
  selectedProject,
} from "@/redux/slices/project/projectSlices";
import { useAppSelector } from "@/redux/store/hook";
import { Modal, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CardProject from "./CardProject";
import ModalProject from "./ModalProject";

const ProjectsPage = () => {
  const dispatch = useDispatch();
  const project = useAppSelector(selectedProject);

  const [projectActive, setProjectActive] = useState([]);
  const [openDetail, setOpenDetail] = useState(false);

  useEffect(() => {
    dispatch(
      projectActions.fetchProject({
        pageNumber: 1,
        pageSize: 10,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (project?.data) {
      const filteredProjects = project.data.filter(
        (projectItem) => projectItem.status === ProjectStatus.DESIGNING
      );
      setProjectActive(filteredProjects);
    }
  }, [project]);

  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full">
      <Title name="Danh sách dự án thi công" />

      <Row className="gap-5 my-4">
        {projectActive.map((projectActive) => (
          <CardProject
            project={projectActive}
            key={projectActive.id}
            setOpenDetail={selectedProject}
          />
        ))}
      </Row>

      <Modal
        title="Thông tin dự án"
        open={openDetail}
        width={1000}
        onClose={() => setOpenDetail(false)}
        onCancel={() => setOpenDetail(false)}
        onOk={() => setOpenDetail(false)}
        closable={true}
        footer={false}
      >
        <ModalProject project={project} />
      </Modal>
    </div>
  );
};

export default ProjectsPage;
