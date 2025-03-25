import { TaskType } from "@/models/TaskType";
import { parseTaskStatus, trimText } from "@/utils/helpers";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, TableColumnsType, Tooltip } from "antd";
import React from "react";

export const columns: TableColumnsType<TaskType> = [
  {
    title: "Tiêu đề",
    dataIndex: "name",
    key: "name",
    render: (name) => {
      return <span>{trimText(name, 20)}</span>;
    },
  },
  {
    title: "Han chót",
    dataIndex: "deadlineAt",
    key: "deadlineAt",
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
    title: "Người thực hiện",
    dataIndex: "staff",
    key: "staff",
    render: (staff) => {
      return staff ? (
        <div className="flex items-center">
          <Avatar src={staff.avatar} />
          <span className="ml-2">{staff.name}</span>
        </div>
      ) : (
        <Tooltip title="Thêm nhân viên">
          <Button
            onClick={() => {}}
            type="primary"
            shape="circle"
            icon={<UserOutlined />}
            className="ml-2"
          />
        </Tooltip>
      );
    },
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Ngày cập nhật",
    dataIndex: "updatedAt",
    key: "updatedAt",
  },
];

export interface DisplayStatusTask {
  icon: React.ReactNode;
  color: string;
}
