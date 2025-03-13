import { Title } from "@/components";
import { projectBoardActions } from "@/redux/slices/projectBoard/projectBoardSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { Pagination, Row } from "antd";
import { useEffect } from "react";
import ProjectCard from "./ProjectCard";
import ProjectSkeleton from "./ProjectSkeleton";

const ProjectsPage = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.projectBoard.projects);
  const loading = useAppSelector((state) => state.projectBoard.loading);
  console.log(items);

  useEffect(() => {
    dispatch(
      projectBoardActions.fetchProjectBoard({ pageNumber: 1, pageSize: 10 })
    );
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 h-full">
        <Title name="Dự án" />
        <Row className="gap-4 mt-4">
          {[1, 2, 3].map((item) => (
            <ProjectSkeleton key={item} />
          ))}
        </Row>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full">
      <Title name="Dự án" />
      <Row className="gap-4 mt-4">
        {items.data.map((item) => (
          <ProjectCard key={item.id} {...item} />
        ))}
      </Row>

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
