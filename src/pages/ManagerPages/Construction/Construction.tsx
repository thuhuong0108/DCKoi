import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Skeleton from "./Skeleton";
import { Loading, Title } from "@/components";
import { projectStateDetailActions } from "@/redux/slices/projectStateDetail/projectStateDetailSlices";
import Staff from "./Staff";
import { Button } from "antd";
import ParentConstruction from "./ParentConstruction";

const Construction = () => {
  const dispatch = useAppDispatch();
  const construction = useAppSelector(
    (state) => state.projectStateDetail.construction
  );
  const project = useAppSelector((state) => state.projectStateDetail.project);
  useEffect(() => {
    dispatch(projectStateDetailActions.fetchProjectDetail(id));
    dispatch(projectStateDetailActions.fetchConstructions(id));
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 h-full w-full">
      <Title name="Tiến độ công việc thi công" />
      {project.loading ? (
        <Loading />
      ) : (
        <div className="flex  w-full">
          <Staff staff={project.detail.staff} />
        </div>
      )}

      {construction.loading ? (
        <Skeleton />
      ) : (
        <ParentConstruction constructionItem={construction.constructions} />
      )}
    </div>
  );
};

export default Construction;
