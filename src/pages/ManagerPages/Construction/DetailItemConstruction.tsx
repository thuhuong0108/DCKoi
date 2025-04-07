import { assignTaskConstructor, deleteTask } from "@/api/construction";
import { Loading, messageError } from "@/components";
import useForm from "@/hooks/useForm";
import { ItemConstructionStatus } from "@/models/enums/Status";
import { TaskRequest } from "@/models/Request/TaskRequest";
import { TaskType } from "@/models/TaskType";
import { constructionItemActions } from "@/redux/slices/constructionItemStage/constructionItemSlices";
import { staffActions } from "@/redux/slices/staff/staffSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import {
  convertStringtoDate,
  formatDate,
  parseDate,
  parseTaskStatus,
  trimText,
} from "@/utils/helpers";
import { validateConstruction } from "@/validations/validate";
import { DownOutlined, EyeOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Checkbox,
  DatePicker,
  DatePickerProps,
  Dropdown,
  Form,
  Input,
  Menu,
  Modal,
  Pagination,
  Table,
  TableColumnsType,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ReportTask from "./ReportTask";
import { projectStateDetailActions } from "@/redux/slices/projectStateDetail/projectStateDetailSlices";

const convertDateToString = (date: string) => {
  // convertDateToString to format 2025-03-13T11:00:55.250Z
  const dateConvert = new Date(date);
  return dateConvert.toISOString();
};

const DetailItemConstruction = ({ openModal, setOpenModal }) => {
  const { id } = useParams<{ id: string }>();
  const [selectTask, setSelectTask] = useState<TaskType | null>(null);
  const columns: TableColumnsType<TaskType> = [
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
      title: "Người thực hiện",
      dataIndex: "staff",
      key: "staff",

      render: (staff, record) => {
        return staff ? (
          <div className="flex items-center">
            <Avatar src={staff.avatar} />
            <span className="ml-2">{staff.fullName}</span>
          </div>
        ) : (
          <Tooltip title="Thêm nhân viên">
            <Button
              onClick={async () => {
                await handleOpenSelectStaff();
                setSelectTask(record);
              }}
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
      render: (createdAt) => {
        return formatDate(new Date(createdAt));
      },
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt) => {
        return formatDate(new Date(updatedAt));
      },
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Dropdown
          overlay={() => (
            <Menu>
              <Menu.Item>
                <Button
                  type="text"
                  onClick={async () => {
                    //
                    await dispatch(
                      constructionItemActions.fetchTask(record.id)
                    );
                    setVisibleReport(true);
                  }}
                >
                  Chi tiết
                </Button>
              </Menu.Item>
              <Menu.Item>
                <Button
                  type="text"
                  onClick={async () => {
                    const res = await deleteTask(record.id);
                    if (res.isSuccess) {
                      dispatch(
                        constructionItemActions.fetchTasks({
                          id: construction.constructionItem.id,
                          filter: {
                            pageNumber: task.tasks.pageNumber,
                            pageSize: 5,
                          },
                        })
                      );

                      dispatch(
                        projectStateDetailActions.fetchConstructions(id)
                      );
                    } else {
                      messageError(res.message);
                    }
                  }}
                >
                  Xoá
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
  const construction = useAppSelector(
    (state) => state.constructionItemStage.item
  );
  const constructors = useAppSelector((state) => state.staff);
  const [modalShifted, setModalShifted] = useState(false);
  const task = useAppSelector((state) => state.constructionItemStage.task);

  const handleAssignStaff = async (id: string) => {
    const data: TaskRequest = {
      id: selectTask.id,
      staffId: id,
      deadlineAt: selectTask.deadlineAt,
      name: selectTask.name,
      imageUrls: "",
      reason: "",
    };
    const res = await assignTaskConstructor(data);
    if (res.isSuccess) {
      dispatch(
        constructionItemActions.fetchTasks({
          id: construction.constructionItem.id,
          filter: { pageNumber: task.tasks.pageNumber, pageSize: 5 },
        })
      );
    } else {
      messageError(res.message);
    }
    setIsAssign(false);
  };

  const handleOpenSelectStaff = async () => {
    setIsAssign(true);
    await dispatch(staffActions.fetchConstructorProject(id));
  };
  const [isAssign, setIsAssign] = useState(false);

  const isOutDate =
    new Date(construction.constructionItem.estimateAt).getTime() <
      new Date().getTime() &&
    construction.constructionItem.status !== ItemConstructionStatus.DONE;
  const dispatch = useAppDispatch();

  const isProcess =
    new Date(construction.constructionItem.estimateAt).getTime() >
      new Date().getTime() &&
    construction.constructionItem.status !== ItemConstructionStatus.DONE;

  const isDone =
    construction.constructionItem.status === ItemConstructionStatus.DONE;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const { formik, loading, regField, regHandleSubmit } = useForm({
    onSubmit: async (values) => {
      const data: TaskRequest = {
        name: values.name,
        deadlineAt: convertDateToString(values.deadlineAt),
      };

      await dispatch(
        constructionItemActions.createTask({
          id: construction.constructionItem.id,
          task: data,
        })
      );

      // await dispatch(projectStateDetailActions.fetchConstructions(id));

      //   formik.resetForm();
      setIsModalVisible(false);
      setModalShifted(false);
    },
    values: {
      name: "",
      deadlineAt: null,
    },
    validationSchema: validateConstruction,
  });
  const [visibleReport, setVisibleReport] = useState(false);

  const handleDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    formik.setFieldValue("deadlineAt", date);
  };
  const renderModal = () => {
    return (
      <Modal
        title="Thêm công việc"
        visible={isModalVisible}
        onOk={() => {
          regHandleSubmit();
        }}
        onCancel={() => {
          setIsModalVisible(false);
          setModalShifted(false);
        }}
        style={{ top: "20%" }}
      >
        <Form layout="vertical">
          <Form.Item
            label="Tên công việc"
            help={regField("name").error}
            validateStatus={regField("name").error ? "error" : "success"}
          >
            <Input {...regField("name")} />
          </Form.Item>

          <Form.Item
            label="Hạn chót"
            help={regField("deadlineAt").error}
            validateStatus={regField("deadlineAt").error ? "error" : "success"}
          >
            <DatePicker
              format="DD/MM/YYYY"
              onChange={handleDateChange}
              value={formik.values.deadlineAt}
              width="100%"
              formAction="deadlineAt"
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  return (
    <Modal
      className={`transition-all duration-500 ease-in-out`}
      width={"100%"}
      loading={construction.loading}
      title={construction.constructionItem.name}
      visible={openModal}
      onOk={() => setOpenModal(false)}
      onCancel={() => setOpenModal(false)}
      footer={null}
    >
      {construction.loading ? (
        <Loading />
      ) : (
        <>
          {" "}
          <div className="flex flex-col gap-2">
            <Typography.Text>
              Ngày dự kiến: {construction.constructionItem.estimateAt}
              <Tag
                color={isDone ? "green" : isOutDate ? "red" : "blue"}
                className="ml-2"
              >
                {isDone
                  ? "Hoàn thành"
                  : isOutDate
                  ? "Quá hạn"
                  : "Đang thực hiện"}
              </Tag>
            </Typography.Text>

            <Typography.Text>
              Mô tả:{" "}
              <TextArea
                value={construction.constructionItem.description}
                disabled
              />
            </Typography.Text>

            {/* Task */}
            <Typography.Text strong>Task</Typography.Text>
            <Table<TaskType>
              columns={columns}
              dataSource={task.tasks.data}
              pagination={
                task.tasks.totalRecords > 5
                  ? {
                      current: task.tasks.pageNumber,
                      pageSize: task.tasks.pageSize,
                      total: task.tasks.totalRecords,
                      onChange: (page, pageSize) => {
                        dispatch(
                          constructionItemActions.fetchTasks({
                            id: construction.constructionItem.id,
                            filter: { pageNumber: page, pageSize: pageSize },
                          })
                        );
                      },
                    }
                  : false
              }
            />

            <Button
              type="primary"
              onClick={() => {
                setIsModalVisible(true);
                setModalShifted(true);
              }}
              // disabled={isDone}
            >
              Thêm công việc
            </Button>
          </div>
        </>
      )}
      {renderModal()}

      <Modal
        loading={constructors.loading}
        title="Chọn nhân viên"
        visible={isAssign}
        onCancel={() => setIsAssign(false)}
        onOk={() => setIsAssign(false)}
        footer={null}
      >
        <div className="flex flex-row justify-between items-center">
          <Typography.Text strong aria-level={2}>
            <label>STT</label>
          </Typography.Text>
          <div className="flex items-center gap-2 w-36">
            <span className="text-sm font-medium">Họ và tên</span>
          </div>
          <label>Thao tác</label>
        </div>
        <div>
          {constructors.staffs.data.map((staff, index) => (
            <div
              key={staff.id}
              className="flex flex-row justify-between items-center"
            >
              <label>{index + 1}</label>
              <div className="flex items-center gap-2 w-36">
                <span className="text-sm">{staff.fullName}</span>
              </div>
              <Button
                type="primary"
                onClick={() => {
                  handleAssignStaff(staff.id);
                }}
              >
                Chọn
              </Button>
            </div>
          ))}
        </div>
      </Modal>
      <ReportTask open={visibleReport} setOpen={setVisibleReport} />
    </Modal>
  );
};

export default DetailItemConstruction;
