import { Button, confirmWarning } from "@/components";
import { IssueStatus } from "@/models/enums/Status";
import { issueActions } from "@/redux/slices/issue/issueSlices";
import { useAppDispatch } from "@/redux/store/hook";
import { parseIssueStatus } from "@/utils/helpers";
import { Image, Table } from "antd";
import { useNavigate } from "react-router-dom";

const ModalIssue = ({ issue }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const columns = [
    {
      title: "Stt",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => <label>{index + 1}</label>,
    },
    {
      title: "Vấn đề",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hạng mục công việc",
      dataIndex: "constructionItem",
      key: "constructionItem",
      render: (record) => <label>{record.name}</label>,
    },

    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Nguyên nhân",
      dataIndex: "cause",
      key: "cause",
    },
    {
      title: "Giải pháp",
      dataIndex: "solution",
      key: "solution",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (record) => <label>{parseIssueStatus(record)}</label>,
    },
    {
      title: "Hình ảnh",
      dataIndex: "issueImage",
      key: "issueImage",
      render: (record) => (
        <Image width={100} src={record} alt="Hình ảnh vấn đề" />
      ),
    },
    {
      title: "Người chịu trách nhiệm",
      dataIndex: "staff",
      key: "staff",
      render: (record) => <label>{record?.fullName}</label>,
    },
    {
      title: "Hình ảnh xác nhận",
      dataIndex: "imageConfirm",
      key: "imageConfirm",
      render: (record) =>
        record && <Image width={100} src={record} alt="Hình ảnh xác nhận" />,
    },
    {
      title: "Hành động",
      dataIndex: "confirm",
      key: "confirm",
      render: (_, record) => {
        if (record.status === IssueStatus.PREVIEWING) {
          return (
            <a
              onClick={() => {
                confirmWarning({
                  title: "Xác nhận",
                  message: "Xác nhận vấn đề đã được giải quyết?",
                  yes: async () => {
                    await dispatch(issueActions.confirmIssue(record.id));
                  },
                });
              }}
            >
              Xác nhận
            </a>
          );
        } else if (record.status === IssueStatus.OPENING) {
          return (
            <a
              onClick={async () => {
                // await dispatch(issueActions.assignStaff(record.id));
              }}
            >
              Thêm nhân viên
            </a>
          );
        }
        return null;
      },
    },
  ];

  return (
    <div>
      <Button
        primary
        title="Thêm vấn đề"
        onClick={() => navigate(`add-issue`)}
      />
      <Table
        dataSource={issue.issues}
        columns={columns}
        pagination={false}
        rowKey="id"
      />
    </div>
  );
};

export default ModalIssue;
