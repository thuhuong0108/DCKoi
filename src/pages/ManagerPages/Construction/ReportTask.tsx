import { TaskStage } from "@/models/enums/TaskStage";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { Button, Form, Image, Modal, Typography } from "antd";
import React from "react";
import { DisplayStatusTask } from "./type";
import { WarningOutlined } from "@ant-design/icons";
import { TimerOutlined, WorkOutline } from "@mui/icons-material";
import { formatDate, parseTaskStatus } from "@/utils/helpers";
import TextArea from "antd/es/input/TextArea";
import useForm from "@/hooks/useForm";
import { validateDeny } from "@/validations/validate";
import { confirmAlert, confirmWarning } from "@/components";
import { assignTaskConstructor, confirmTask } from "@/api/construction";
import { projectStateDetailActions } from "@/redux/slices/projectStateDetail/projectStateDetailSlices";
import { useParams } from "react-router-dom";
import { constructionItemActions } from "@/redux/slices/constructionItemStage/constructionItemSlices";
// icon of andt design

const displayStatusTask: Record<TaskStage, DisplayStatusTask> = {
  [TaskStage.DONE]: {
    color: "green",
    icon: <WarningOutlined color="green" />,
  },
  [TaskStage.OPEN]: {
    color: "orange",
    icon: <TimerOutlined color="warning" />,
  },
  [TaskStage.PREVIEWING]: {
    color: "blue",
    icon: <TimerOutlined color="primary" />,
  },
  [TaskStage.PROCESSING]: {
    color: "yellow",
    icon: <WorkOutline color="warning" />,
  },
};
const ReportTask = ({ open, setOpen }) => {
  const task = useAppSelector(
    (state) => state.constructionItemStage.selectedTask
  );
  const tasks = useAppSelector((state) => state.constructionItemStage.task);
  const item = useAppSelector((state) => state.constructionItemStage.item);

  const { formik, loading, regField, regHandleSubmit } = useForm({
    values: {
      reason: "",
    },
    onSubmit: (values) => {
      confirmAlert({
        title: "Xác nhận",
        message: "Bạn có chắc muốn từ chối công việc này?",
        yes: async () => {
          // handle deny task
          const res = await assignTaskConstructor({
            id: task.task.id,
            reason: values.reason,
            deadlineAt: task.task.deadlineAt,
            name: task.task.name,
          });
          if (res.isSuccess) {
            setOpen(false);
            await finishUpdateTask();
          }
        },
        no: () => {},
      });
    },
    validationSchema: validateDeny,
  });
  const { id } = useParams();
  const finishUpdateTask = async () => {
    await dispatch(
      constructionItemActions.fetchConstructionItem(item.constructionItem.id)
    );
    await dispatch(
      constructionItemActions.fetchTasks({
        id: item.constructionItem.id,
        filter: {
          pageNumber: tasks.tasks.pageNumber,
          pageSize: tasks.tasks.pageSize,
        },
      })
    );
    // await dispatch(projectStateDetailActions.fetchConstructions(id));
  };
  const dispatch = useAppDispatch();
  return (
    <Modal
      visible={open}
      loading={task.loading}
      title={`Báo cáo công việc ${task.task.name}`}
      footer={null}
      onCancel={() => {
        setOpen(false);
      }}
    >
      <div className="flex items-center">
        <Typography.Text>
          {displayStatusTask[task.task.status as TaskStage].icon}
        </Typography.Text>
        <Typography.Text>
          {parseTaskStatus(task.task.status as TaskStage)}
        </Typography.Text>
      </div>

      <Typography.Text className="text-red-500">
        {task.task.reason}
      </Typography.Text>
      <br />

      <Typography.Text>
        {formatDate(new Date(task.task.updatedAt))}
      </Typography.Text>
      <Image src={task.task.imageUrl} />

      {task.task.status === TaskStage.PREVIEWING && (
        <>
          <Form>
            <Form.Item
              label="Lý do từ chối"
              help={regField("reason").error}
              validateStatus={regField("reason").error ? "error" : "success"}
            >
              <TextArea rows={4} {...regField("reason")} />
            </Form.Item>
            <div className="flex justify-end mt-4">
              <Button
                type="primary"
                onClick={() => {
                  confirmWarning({
                    title: "Xác nhận",
                    message: "Bạn có chắc muốn đồng ý công việc này?",
                    yes: async () => {
                      // handle accept task
                      const res = await confirmTask(task.task.id);
                      if (res.isSuccess) {
                        setOpen(false);
                        await finishUpdateTask();
                      }
                    },
                    no: () => {},
                  });
                }}
              >
                Đồng ý
              </Button>
              <Button
                className="bg-red-400 mx-3"
                type="primary"
                onClick={() => {
                  regHandleSubmit();
                }}
              >
                Từ chối
              </Button>
            </div>
          </Form>
        </>
      )}
    </Modal>
  );
};

export default ReportTask;
