import {
  comfirmMaintenancesTask,
  updateMaintenancesTask,
} from "@/api/maintennances";
import { confirmAlert, messageError, Title } from "@/components";
import { TaskStage } from "@/models/enums/TaskStage";
import { MaintenancesTaskType } from "@/models/MaintenancesTpe";
import { maintainceTaskActions } from "@/redux/slices/maintenanceTask/maintenanceTaskSlices";
import { staffActions } from "@/redux/slices/staff/staffSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { parseTaskStatus, trackColorTask } from "@/utils/helpers";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Descriptions,
  Dropdown,
  Image,
  List,
  Modal,
  Space,
  Table,
  TableColumnsType,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ModalDeny from "./ModalDeny";
import Staff from "./Staff";
import { FeedbackType } from "@/models/FeedbackType";

const { Text, Link } = Typography;

const MaintainceTask = () => {
  const { maintenanceRequestTasks, loading, detail, feedback } = useAppSelector(
    (state) => state.maintenanceTask
  );
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [selectedTask, setSelectedTask] = useState<MaintenancesTaskType | null>(
    null
  );
  const [selectedTaskChild, setSelectedTaskChild] =
    useState<MaintenancesTaskType | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalDeny, setIsModalDeny] = useState(false);
  const staff = useAppSelector((state) => state.staff);

  useEffect(() => {
    if (id) {
      dispatch(maintainceTaskActions.fetchMaintainceTask(id));
    }
  }, [dispatch, id]);

  const handleViewDetail = async (record: MaintenancesTaskType) => {
    await dispatch(maintainceTaskActions.fetchChildTask(record.id));
    setSelectedTask(record);
    setIsModalVisible(true);
  };

  const [selectMaintenancesTask, setSelectMaintenancesTask] =
    useState<MaintenancesTaskType | null>(null);
  const [openSelectStaff, setOpenSelectStaff] = useState(false);
  const columns: TableColumnsType<MaintenancesTaskType> = [
    {
      title: "Ngày bảo dưỡng",
      dataIndex: "estimateAt",
      key: "estimateAt",
      render: (startDate) => {
        return <Text>{dayjs(startDate).format("DD/MM/YYYY")}</Text>;
      },
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return (
          <Tag color={trackColorTask(status)}>{parseTaskStatus(status)}</Tag>
        );
      },
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        return (
          <Space size="middle">
            <Link
              onClick={() => {
                handleViewDetail(record);
              }}
            >
              Chi tiết
            </Link>
          </Space>
        );
      },
    },
  ];

  const columsChild: TableColumnsType<MaintenancesTaskType> = [
    {
      title: "Tên công việc",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Nhân viên thực hiện",
      dataIndex: "staff",
      key: "staff",
      render: (text, record) => {
        return record.staff ? (
          <Text>{record.staff.fullName}</Text>
        ) : (
          <Tooltip title="Chọn người thực hiện">
            <Button
              type="primary"
              shape="circle"
              icon={<UserOutlined />}
              onClick={async () => {
                await dispatch(
                  staffActions.fetchConstructorStaff({
                    pageNumber: 1,
                    pageSize: 10,
                  })
                );
                setSelectedTaskChild(record);
                setOpenSelectStaff(true);
              }}
            />
          </Tooltip>
        );
      },
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Thời gian thực hiện",
      dataIndex: "estimateAt",
      key: "estimateAt",
      render: (startDate) => {
        return <Text>{dayjs(startDate).format("DD/MM/YYYY")}</Text>;
      },
    },
    {
      title: "Hình ảnh",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl) => {
        return imageUrl ? (
          <Image width={100} src={imageUrl} alt="Task Image" />
        ) : (
          <></>
        );
      },
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return (
          <Tag color={trackColorTask(status)}>{parseTaskStatus(status)}</Tag>
        );
      },
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        return record.status === TaskStage.PREVIEWING ? (
          <Dropdown
            trigger={["click"]}
            menu={{
              items: [
                {
                  key: "1",
                  label: "Hoàn thành",
                  onClick: async () => {
                    confirmAlert({
                      title: "Xác nhận",
                      message: "Bạn có chắc chắn muốn hoàn thành công việc?",
                      yes: async () => {
                        const res = await comfirmMaintenancesTask(record.id);
                        if (res.isSuccess) {
                          dispatch(
                            maintainceTaskActions.fetchChildTask(
                              selectedTask?.id
                            )
                          );

                          dispatch(
                            maintainceTaskActions.fetchMaintainceTask(id)
                          );
                        } else {
                          messageError(res.message);
                        }
                      },
                    });
                  },
                },
                {
                  key: "2",
                  label: "Từ chối",
                  onClick: async () => {
                    setSelectedTaskChild(record);
                    setIsModalDeny(true);
                  },
                },
              ],
            }}
          >
            <Button
              type="primary"
              shape="circle"
              icon={<DownOutlined />}
            ></Button>
          </Dropdown>
        ) : null;
      },
    },
    {
      title: "Lý do",
      dataIndex: "reason",
      key: "reason",

      render: (reason) => {
        return reason ? <Text>{reason}</Text> : <></>;
      },
    },
  ];

  const columnsFeedback: TableColumnsType<FeedbackType> = [
    {
      title: "Nội dung",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => {
        return <Text>{rating} sao</Text>;
      },
    },
    {
      title: "Ngày phản hồi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => {
        return <Text>{dayjs(createdAt).format("DD/MM/YYYY HH:mm")}</Text>;
      },
    },
  ];

  const taskChild = useAppSelector((state) => state.maintenanceTask.childTask);

  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full">
      <Title name="Bảo dưỡng" />

      {/* Property Information Card */}
      <Card
        title="Thông tin bảo dưỡng"
        style={{ marginBottom: 20 }}
        loading={loading}
      >
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Tên ">{detail.name}</Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">
            {detail.address}
          </Descriptions.Item>
          <Descriptions.Item label="Diện tích">
            {detail.area} m²
          </Descriptions.Item>
          <Descriptions.Item label="Dịch vụ bảo dưỡng">
            {detail.type === "SCHEDULED" ? "Định kì" : "1 lần"}
          </Descriptions.Item>
          <Descriptions.Item label="Độ sâu">{detail.depth} m</Descriptions.Item>
          <Descriptions.Item label="Ngày tạo">
            {dayjs(detail.createdAt).format("DD/MM/YYYY HH:mm")}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* Tasks Table */}
      <Card title="Lịch bảo dưỡng">
        <Table
          columns={columns}
          dataSource={maintenanceRequestTasks}
          loading={loading}
          sortDirections={["descend", "ascend"]}
          rowKey="id"
        />
      </Card>

      {/* Task Detail Modal */}
      <Modal
        title="Chi tiết công việc bảo dưỡng"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalVisible(false)}>
            Đóng
          </Button>,
        ]}
        width={1500}
      >
        <Staff staff={taskChild.staffs} idTaskParent={selectedTask?.id} />
        <Table
          columns={columsChild}
          dataSource={taskChild.tasks}
          loading={taskChild.loading}
          sortDirections={["descend", "ascend"]}
          rowKey="id"
        />
      </Modal>

      {detail.status === TaskStage.DONE && (
        <Card title="Phản hồi" style={{ marginTop: 20 }}>
          {/* Feedback List */}
          <Table
            columns={columnsFeedback}
            dataSource={feedback.feedbacks.data}
            loading={loading}
            sortDirections={["descend", "ascend"]}
            rowKey="id"
            pagination={{
              current: feedback.feedbacks.pageNumber,
              pageSize: feedback.feedbacks.pageSize,
              total: feedback.feedbacks.totalRecords,
              onChange: (page) => {
                dispatch(
                  maintainceTaskActions.fetchFeedback({
                    filter: {
                      pageNumber: page,
                      pageSize: 10,
                    },
                    id: id,
                  })
                );
              },
            }}
          />
        </Card>
      )}
      {/* Select Staff Modal */}
      <Modal
        title="Chọn người thực hiện"
        visible={openSelectStaff}
        onCancel={() => setOpenSelectStaff(false)}
        footer={[
          <Button key="back" onClick={() => setOpenSelectStaff(false)}>
            Đóng
          </Button>,
        ]}
        width={800}
      >
        <List
          itemLayout="horizontal"
          dataSource={taskChild.staffs}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  type="primary"
                  onClick={async () => {
                    const res = await updateMaintenancesTask(
                      selectedTaskChild.id,
                      {
                        staffId: item.id,
                      }
                    );
                    if (res.isSuccess) {
                      dispatch(maintainceTaskActions.fetchMaintainceTask(id));
                      dispatch(
                        maintainceTaskActions.fetchChildTask(selectedTask?.id)
                      );
                      setOpenSelectStaff(false);
                    } else {
                      messageError(res.message);
                    }
                  }}
                >
                  Chọn
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={item.fullName}
                description={item.email}
              />
            </List.Item>
          )}
        />
      </Modal>
      <ModalDeny
        idTask={selectedTaskChild?.id}
        visible={isModalDeny}
        setVisible={setIsModalDeny}
        idParent={selectedTask?.id}
      />
    </div>
  );
};

export default MaintainceTask;
