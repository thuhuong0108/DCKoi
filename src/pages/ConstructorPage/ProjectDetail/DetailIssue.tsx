import { updateIssue } from "@/api/issue";
import { Uploader } from "@/components";
import { IssueProjectType } from "@/models";
import { IssueStatus } from "@/models/enums/Status";
import { issueConstructorActions } from "@/redux/slices/issueConstructor/issueConstructorSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { formatDate } from "@/utils/helpers";
import { Form, Image, Input, Modal, Tag, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { useParams } from "react-router-dom";

const DetailIssue = ({
  issue,
  openModal,
  setOpenModal,
}: {
  issue: IssueProjectType;
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}) => {
  const isDone = issue.status === IssueStatus.DONE;
  // const isOutDate = new Date(issue.e).getTime() < new Date().getTime();
  const issues = useAppSelector((state) => state.issueConstructor.issue);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  return (
    <Modal
      className={`transition-all duration-500 ease-in-out`}
      width={"100%"}
      title={`Công việc: ${issue.name}`}
      visible={openModal}
      onOk={() => setOpenModal(false)}
      onCancel={() => setOpenModal(false)}
      footer={null}
    >
      <>
        {" "}
        <div className="flex flex-col gap-2">
          {/* <Typography.Text>
          Hạn chót: {formatDate(new Date(issue.deadlineAt))}
          <Tag
            color={isDone ? "green" : isOutDate ? "red" : "blue"}
            className="ml-2"
          >
            {isDone ? "Hoàn thành" : isOutDate ? "Quá hạn" : "Đang thực hiện"}
          </Tag>
        </Typography.Text> */}

          <Typography.Text>
            Trực thuộc hạng mục: {issue.constructionItem.name}
          </Typography.Text>
          <Typography.Text>
            Mô tả: <TextArea value={issue.description} disabled />
          </Typography.Text>

          <Typography.Text>
            Nguyên nhân: <TextArea value={issue.cause} disabled />
          </Typography.Text>

          <Typography.Text>
            Giải pháp: <TextArea value={issue.solution} disabled />
          </Typography.Text>
          <Form.Item label="Thời gian dự kiến">
            <Input value={issue?.estimateAt} disabled />
          </Form.Item>
          <Form.Item label="Thời gian thực tế">
            <Input value={issue?.actualAt} disabled />
          </Form.Item>

          {issue.reason && (
            <>
              <Typography.Text>
                Lý do: <span className="text-red-500">{issue.reason}</span>
              </Typography.Text>
              <br />
            </>
          )}
          {/* image */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-2">
              <Typography.Text className="mb-3">
                Hình ảnh vấn đề:{" "}
              </Typography.Text>
              <Image src={issue.issueImage} width={300} height={300} />
            </div>

            <div className="flex flex-col gap-2">
              <Typography.Text className="mb-3">
                Hình ảnh giải quyết:{" "}
              </Typography.Text>

              {issue.confirmImage ? (
                <Image src={issue.confirmImage} width={300} height={300} />
              ) : (
                <Typography.Text>Chưa có ảnh</Typography.Text>
              )}
            </div>
          </div>
        </div>
        {issue.status === IssueStatus.PROCESSING && (
          <Uploader
            maxFiles={1}
            buttonText="Tải lên"
            uploadText="Chọn ảnh"
            onUploadSuccess={async (url) => {
              const data = {
                confirmImage: url[0],
              };
              const res = await updateIssue({
                id: issue.id,
                issue: data,
              });
              if (res.isSuccess) {
                setOpenModal(false);
                await dispatch(
                  issueConstructorActions.fetchIssues({
                    filter: {
                      pageNumber: issues.issues.pageNumber,
                      pageSize: issues.issues.pageSize,
                    },
                    id: id,
                  })
                );
              }
            }}
          />
        )}
      </>
    </Modal>
  );
};

export default DetailIssue;
