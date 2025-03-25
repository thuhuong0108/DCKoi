import { IssueProjectType } from "@/models";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { formatDate, parseTaskStatus } from "@/utils/helpers";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Table, TableProps } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DetailTask from "./DetailTask";
import { issueConstructorActions } from "@/redux/slices/issueConstructor/issueConstructorSlices";
import DetailIssue from "./DetailIssue";

const Issue = () => {
  const issue = useAppSelector((state) => state.issueConstructor.issue);

  const dispatch = useAppDispatch();
  const { id } = useParams();
  const columns: TableProps<IssueProjectType>["columns"] = [
    {
      title: "Tên vấn đề",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Loại vấn đề",
      dataIndex: "issueType",
      key: "issueType",
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
  const [selectTask, setSelectTask] = useState<IssueProjectType>({
    id: "",
    cause: "",
    constructionItem: {
      name: "",
    },
    description: "",
    confirmImage: "",
    createdAt: "",
    issueImage: "",
    issueType: "",
    name: "",
    reason: "",
    solution: "",
    status: "",
  });
  const handleOpenOption = (task: IssueProjectType) => {
    setSelectTask(task);
    setVisible(true);
  };
  return (
    <div>
      <Table<IssueProjectType>
        loading={issue.loading}
        columns={columns}
        dataSource={issue.issues.data}
        pagination={
          issue.issues.totalRecords > 5
            ? {
                total: issue.issues.totalRecords,
                pageSize: issue.issues.pageSize,
                current: issue.issues.pageNumber,
                onChange: (page) => {
                  dispatch(
                    issueConstructorActions.fetchIssues({
                      id: id,
                      filter: {
                        pageNumber: page,
                        pageSize: 5,
                      },
                    })
                  );
                },
              }
            : false
        }
      />
      <DetailIssue
        issue={selectTask}
        openModal={visible}
        setOpenModal={setVisible}
      />
    </div>
  );
};

export default Issue;
