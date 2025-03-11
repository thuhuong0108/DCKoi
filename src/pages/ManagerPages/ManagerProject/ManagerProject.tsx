import { Title } from "@/components";
import { projectBoardActions } from "@/redux/slices/projectBoard/projectBoardSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import React, { useEffect } from "react";
import DesignCard from "../Design/DesignCard";
import ProjectSkeleton from "./ProjectSkeleton";
import ProjectCard from "./ProjectCard";
import { Pagination } from "antd";

const ManagerProject = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.projectBoard.projects);
  const loading = useAppSelector((state) => state.projectBoard.loading);

  useEffect(() => {
    dispatch(
      projectBoardActions.fetchProjectBoard({ pageNumber: 1, pageSize: 10 })
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

export default ManagerProject;
