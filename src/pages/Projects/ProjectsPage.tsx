import { Title } from "@/components";
import { Pagination, Row } from "antd";
import React, { useEffect } from "react";
import CardProject from "./CardProject";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { selectedProject } from "@/redux/slices/project/projectSlices";
import ProjectSkeleton from "./ProjectSkeleton";
import { projectBoardActions } from "@/redux/slices/projectBoard/projectBoardSlices";
import ProjectCard from "./ProjectCard";

const ProjectsPage = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.projectBoard.projects);
  const loading = useAppSelector((state) => state.projectBoard.loading);
  console.log(items);

  useEffect(() => {
    dispatch(
      projectBoardActions.fetchProjectBoard({ pageNumber: 1, pageSize: 6 })
    );
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 h-full">
        <Title name="Dự án" />
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <ProjectSkeleton key={item} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 h-full">
      <Title name="Dự án" />
      <div className="grid grid-cols-3 gap-4">
        {items.data.map((item) => (
          <ProjectCard key={item.id} {...item} />
        ))}
      </div>

      {/* pagination */}
      <div className="flex justify-end mt-5">
        <Pagination
          current={items.pageNumber}
          pageSize={items.pageSize}
          total={items.totalRecords}
          onChange={(page) =>
            dispatch(
              projectBoardActions.fetchProjectBoard({
                pageNumber: page,
                pageSize: items.pageSize,
              })
            )
          }
        />
      </div>
    </div>
  );
};

export default ProjectsPage;
