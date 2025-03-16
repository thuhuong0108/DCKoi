import { Loading } from "@/components";
import { projectStateDetailActions } from "@/redux/slices/projectStateDetail/projectStateDetailSlices";
import { taskConstructorActions } from "@/redux/slices/taskConstructor/taskConstructorSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { Divider } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Design from "./Design";
import InformationProject from "./InformationProject";
import Tasks from "./Tasks";

const ProjectDetail = () => {
  const dispatch = useAppDispatch();
  const project = useAppSelector((state) => state.projectStateDetail.project);
  const design = useAppSelector((state) => state.projectStateDetail.design);
  const construction = useAppSelector(
    (state) => state.projectStateDetail.construction
  );
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(projectStateDetailActions.fetchProjectDetail(id));
    dispatch(projectStateDetailActions.fetchDesigns(id));
    dispatch(projectStateDetailActions.fetchConstructions(id));
    dispatch(
      taskConstructorActions.fetchTasks({
        id,
        filter: { pageNumber: 1, pageSize: 5 },
      })
    );
  }, []);
  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 h-full w-full">
      {/* <Title name="1. Chi tiết dự án" /> */}
      <Divider orientation="left">1. Chi tiết dự án</Divider>
      {project.loading ? (
        <Loading />
      ) : (
        <InformationProject {...project.detail} />
      )}

      <Divider orientation="left">2. Thiết kế</Divider>

      {design.loading ? <Loading /> : <Design designs={design.designs} />}

      <Divider orientation="left">3. Thi công</Divider>
      <Tasks />
    </div>
  );
};

export default ProjectDetail;
