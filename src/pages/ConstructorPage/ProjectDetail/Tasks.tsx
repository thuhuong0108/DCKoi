import { Loading } from "@/components";
import { TaskType } from "@/models/TaskType";
import { taskConstructorActions } from "@/redux/slices/taskConstructor/taskConstructorSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { formatDate, parseTaskStatus } from "@/utils/helpers";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Table, TableProps } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DetailTask from "./DetailTask";

const Tasks = () => {
  const task = useAppSelector((state) => state.taskConstructor.task);

  const { id } = useParams();
  const dispatch = useAppDispatch();
  const columns: TableProps<TaskType>["columns"] = [
    {
      title: "Tên công việc",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hạn chót",
      dataIndex: "deadlineAt",
      key: "deadlineAt",
      render: (deadlineAt) => {
        return formatDate(new Date(deadlineAt));
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return parseTaskStatus(status);
      },
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Dropdown
          overlay={() => (
            <Menu>
              <Menu.Item>
                <Button
                  type="text"
                  onClick={() => {
                    handleOpenOption(record);
                  }}
                >
                  Chi tiết
                </Button>
              </Menu.Item>
            </Menu>
          )}
        >
          <Button icon={<DownOutlined />} />
        </Dropdown>
      ),
    },
  ];
  const [visible, setVisible] = useState(false);
  const [selectTask, setSelectTask] = useState<TaskType>(null);
  const handleOpenOption = (task: TaskType) => {
    setSelectTask(task);
    setVisible(true);
  };

  return (
    <div>
      <Table<TaskType>
        loading={task.loading}
        columns={columns}
        dataSource={task.tasks.data}
        pagination={
          task.tasks.totalRecords > 5
            ? {
                total: task.tasks.totalRecords,
                pageSize: task.tasks.pageSize,
                current: task.tasks.pageNumber,
                onChange: (page) => {
                  dispatch(
                    taskConstructorActions.fetchTasks({
                      id,
                      filter: { pageNumber: page, pageSize: 5 },
                    })
                  );
                },
              }
            : false
        }
      />
      <DetailTask
        openModal={visible}
        setOpenModal={setVisible}
        task={selectTask}
      />
    </div>
  );
};

export default Tasks;
