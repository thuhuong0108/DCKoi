import { Loading, Title } from "@/components";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import React, { useEffect } from "react";
import InformationProject from "./InformationProject";
import { projectStateDetailActions } from "@/redux/slices/projectStateDetail/projectStateDetailSlices";
import { useParams } from "react-router-dom";
import Staff from "./Staff";
import Design from "./Design";
import Constructions from "./Constructions";
import { Divider } from "antd";

const ProjectDetail = () => {
  const dispatch = useAppDispatch();
  const project = useAppSelector((state) => state.projectStateDetail.project);
  const design = useAppSelector((state) => state.projectStateDetail.design);
  const construction = useAppSelector(
    (state) => state.projectStateDetail.construction
  );
  const { id } = useParams();

  console.log(construction);

  useEffect(() => {
    dispatch(projectStateDetailActions.fetchProjectDetail(id));
    dispatch(projectStateDetailActions.fetchDesigns(id));
    dispatch(projectStateDetailActions.fetchConstructions(id));
  }, []);
  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 h-full w-full">
      {/* <Title  name="1. Chi tiết dự án" /> */}
      <Divider orientation="left">1. Chi tiết dự án</Divider>
      {project.loading ? (
        <Loading />
      ) : (
        <InformationProject {...project.detail} />
      )}

      <Title name="2. Nhân viên" />
      {project.loading ? <Loading /> : <Staff staff={project.detail.staff} />}

      <Title name="3. Thiết kế" />

      {design.loading ? <Loading /> : <Design designs={design.designs} />}

      <Title name="4. Thi công" />

      {construction.loading ? (
        <Loading />
      ) : (
        <Constructions constructionItem={construction.constructions} />
      )}
    </div>
  );
};

export default ProjectDetail;
