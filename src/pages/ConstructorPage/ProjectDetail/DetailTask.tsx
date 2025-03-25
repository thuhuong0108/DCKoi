import { assignTaskConstructor } from "@/api/construction";
import { messageError, messageSuccess, Uploader } from "@/components";
import { TaskStage } from "@/models/enums/TaskStage";
import { TaskRequest } from "@/models/Request/TaskRequest";
import { TaskType } from "@/models/TaskType";
import { constructionItemActions } from "@/redux/slices/constructionItemStage/constructionItemSlices";
import { taskConstructorActions } from "@/redux/slices/taskConstructor/taskConstructorSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { formatDate } from "@/utils/helpers";
import { Image, Modal, Tag, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";

import React from "react";
import { useParams } from "react-router-dom";

const DetailTask = ({
  task,
  openModal,
  setOpenModal,
}: {
  task: TaskType;
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}) => {
  const disptach = useAppDispatch();
  const { id } = useParams();
  if (!task) {
    return null;
  }
  const taskConstructor = useAppSelector((state) => state.taskConstructor.task);
  const isDone = task.constructionItem.status === "DONE";
  const isOutDate = new Date(task.deadlineAt).getTime() < new Date().getTime();
  return (
    <Modal
      className={`transition-all duration-500 ease-in-out`}
      width={"100%"}
      title={`Công việc: ${task.name}`}
      visible={openModal}
      onOk={() => setOpenModal(false)}
      onCancel={() => setOpenModal(false)}
      footer={null}
    >
      <>
        {" "}
        <div className="flex flex-col gap-2">
          <Typography.Text>
            Hạn chót: {formatDate(new Date(task.deadlineAt))}
            <Tag
              color={isDone ? "green" : isOutDate ? "red" : "blue"}
              className="ml-2"
            >
              {isDone ? "Hoàn thành" : isOutDate ? "Quá hạn" : "Đang thực hiện"}
            </Tag>
          </Typography.Text>

          <Typography.Text>
            Trực thuộc hạng mục: {task.constructionItem.name}
          </Typography.Text>

          <Typography.Text>
            Mô tả:{" "}
            <TextArea value={task.constructionItem.description} disabled />
          </Typography.Text>

          {task.reason && (
            <>
              <Typography.Text>
                Lý do: <span className="text-red-500">{task.reason}</span>
              </Typography.Text>
              <br />
            </>
          )}
          {/* image */}

          <Typography.Text className="mb-3">
            Hình ảnh:{" "}
            {task.imageUrl && task.imageUrl !== "" ? (
              <Image src={task.imageUrl} width={300} height={300} />
            ) : (
              "Chưa có ảnh"
            )}
          </Typography.Text>
        </div>
        {task.status === TaskStage.PROCESSING && (
          <Uploader
            maxFiles={1}
            buttonText="Tải lên"
            uploadText="Chọn ảnh"
            onUploadSuccess={async (url) => {
              const data: TaskRequest = {
                deadlineAt: task.deadlineAt,
                name: task.name,
                id: task.id,
                imageUrl: url[0],
                reason: "",
              };
              console.log(data);

              const res = await assignTaskConstructor(data);
              if (res.isSuccess) {
                setOpenModal(false);
                disptach(
                  taskConstructorActions.fetchTasks({
                    id,
                    filter: {
                      pageNumber: taskConstructor.tasks.pageNumber,
                      pageSize: taskConstructor.tasks.pageSize,
                    },
                  })
                );
                messageSuccess(res.message);
              } else {
                messageError(res.message);
                setOpenModal(false);
              }
            }}
          />
        )}
      </>
    </Modal>
  );
};

export default DetailTask;
