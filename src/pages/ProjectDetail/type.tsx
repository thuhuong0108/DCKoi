import { Staff } from "@/models/ProjectType";
import { parsePosition } from "@/utils/helpers";
import { TableProps } from "antd";

export const staffConlumns: TableProps<Staff>["columns"] = [
  {
    title: "Tên",
    dataIndex: "fullName",
    key: "fullName",
    render: (text, record) => {
      return (
        <div className="flex items-center">
          <img
            src={record.avatar}
            alt="avatar"
            className="w-8 h-8 rounded-full mr-2"
          />
          <span>{record.fullName}</span>
        </div>
      );
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Chức vụ",
    dataIndex: "position",
    key: "position",
    render: (text, record) => {
      return <span>{parsePosition(record.position)}</span>;
    },
  },
];
