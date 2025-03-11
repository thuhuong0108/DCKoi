import { Loading, Title } from "@/components";
import { projectStateDetailActions } from "@/redux/slices/projectStateDetail/projectStateDetailSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { Divider } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Constructions from "./Constructions";
import Design from "./Design";
import InformationProject from "./InformationProject";
import Staff from "./Staff";

const ProjectDetail = () => {
  const dispatch = useAppDispatch();
  const project = useAppSelector((state) => state.projectStateDetail.project);
  const design = useAppSelector((state) => state.projectStateDetail.design);
  const construction = useAppSelector(
    (state) => state.projectStateDetail.construction
  );

  const { id } = useParams();

  useEffect(() => {
    dispatch(projectStateDetailActions.fetchProjectDetail(id));
    dispatch(projectStateDetailActions.fetchDesigns(id));
    dispatch(projectStateDetailActions.fetchConstructions(id));
  }, []);
  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 h-full w-full">
      <Title name="Thông tin dự án" />
      <Divider orientation="left">1. Chi tiết dự án</Divider>
      {project.loading ? (
        <Loading />
      ) : (
        <InformationProject {...project.detail} />
      )}

      <Divider orientation="left">2. Nhân viên tham gia</Divider>
      {project.loading ? <Loading /> : <Staff staff={project.detail.staff} />}

      <Divider orientation="left">3. Bản vẽ thiết kể</Divider>
      {design.loading ? <Loading /> : <Design designs={design.designs} />}

      <Divider orientation="left">4. Tiến trình thi công</Divider>
      {construction.loading ? (
        <Loading />
      ) : (
        <Constructions constructionItem={construction.constructions} />
      )}
    </div>
  );
};

export default ProjectDetail;
