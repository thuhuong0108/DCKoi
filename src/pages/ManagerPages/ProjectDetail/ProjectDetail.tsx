import { confirmAlert, Loading, messageError, Title } from "@/components";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import React, { useEffect } from "react";
import InformationProject from "./InformationProject";
import { projectStateDetailActions } from "@/redux/slices/projectStateDetail/projectStateDetailSlices";
import { useNavigate, useParams } from "react-router-dom";
import Staff from "./Staff";
import Design from "./Design";
import Constructions from "./Constructions";
import { Button, Divider } from "antd";
import Docs from "./Docs";
import { finishProject } from "@/api/project";

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

      <Divider orientation="left">2. Nhân sự</Divider>
      {project.loading ? <Loading /> : <Staff staff={project.detail.staff} />}

      <Divider orientation="left">3. Thiết kế</Divider>

      {design.loading ? <Loading /> : <Design designs={design.designs} />}

      <Divider orientation="left">4. Tài liệu</Divider>
      <Docs />

      <Divider orientation="left">5. Thi công</Divider>

      {construction.loading ? (
        <Loading />
      ) : (
        <>
          <Constructions constructionItem={construction.constructions} />

          <div className="flex justify-between items-center">
            <Button
              type="primary"
              onClick={() => {
                confirmAlert({
                  message: "Bạn có chắc chắn muốn kết thúc dự án?",
                  title: "Kết thúc dự án",
                  yes: async () => {
                    const res = await finishProject(id);
                    if (res.isSuccess) {
                      navigate("manager");
                    } else {
                      messageError(res.message);
                    }
                  },
                });
              }}
            >
              Kết thúc dự án
            </Button>
            <Button
              type="primary"
              className="mt-5"
              onClick={() => navigate("construction")}
            >
              Chi tiết
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectDetail;
