import { Loading } from "@/components";
import { projectStateDetailActions } from "@/redux/slices/projectStateDetail/projectStateDetailSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import TaskCard from "./TaskCard";
import { Pagination } from "antd";

const Tasks = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      projectStateDetailActions.fetchTasks({
        id: id,
        filter: {
          pageNumber: 1,
          pageSize: 3,
        },
      })
    );
  }, []);
  const tasks = useAppSelector((state) => state.projectStateDetail.task);
  if (tasks.loading) {
    return <Loading />;
  }
  return (
    <div className="w-full">
      {tasks.tasks.data.map((task) => {
        return <TaskCard task={task} key={task.id} />;
      })}
      <Pagination
        total={tasks.tasks.totalRecords}
        current={tasks.tasks.pageNumber}
        pageSize={tasks.tasks.pageSize}
        onChange={(page) => {
          dispatch(
            projectStateDetailActions.fetchTasks({
              id: id,
              filter: {
                pageNumber: page,
                pageSize: 3,
              },
            })
          );
        }}
      />
    </div>
  );
};

export default Tasks;
