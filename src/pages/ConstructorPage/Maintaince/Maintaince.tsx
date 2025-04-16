import { Title, Uploader } from "@/components";
import { MaintainceStatus, MaintainceTaskStatus } from "@/models/enums/Status";
import { TaskStage } from "@/models/enums/TaskStage";
import { MaintenancesTaskType } from "@/models/MaintenancesTpe";
import { maintainceConstructorActions } from "@/redux/slices/maintainceConstructor/maintainceConstructorSlices";

import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { parseTaskStatus, trackColorTask } from "@/utils/helpers";
import {
  Card,
  Descriptions,
  Image,
  Modal,
  Select,
  Space,
  Table,
  TableColumnsType,
  Tag,
  Typography,
} from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import Issue from "./Issue";

const { Text, Link } = Typography;
const Maintaince = () => {
  const columns: TableColumnsType<MaintenancesTaskType> = [
    {
      title: "Tên công việc",
      dataIndex: "name",
      key: "name",
    },
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
                dispatch(
                  maintainceConstructorActions.fetchMaintainceDetail(record.id)
                );
                setVisible(true);
              }}
            >
              Chi tiết
            </Link>
          </Space>
        );
      },
    },
  ];
  const [status, setStatus] = useState<string>(TaskStage.PROCESSING);
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);
  const maintenances = useAppSelector((state) => state.maintainceConstructor);
  useEffect(() => {
    dispatch(
      maintainceConstructorActions.fetchMaintainceConstructor({
        filter: {
          pageNumber: 1,
          pageSize: 10,
        },
        status: status,
      })
    );
  }, [status]);
  const detailTask = useAppSelector((state) => state.maintenanceTask);

  return (
    <div className="flex flex-col justify-between items-stretch mb-5 mt-8 mx-10 w-full h-full">
      <Title name="Bảo dưỡng" />

      <div>
        <Select
          value={status}
          onChange={(value) => setStatus(value)}
          className="mb-5 w-[200px]"
        >
          <Select.Option value={TaskStage.PROCESSING}>
            {parseTaskStatus(TaskStage.PROCESSING)}
          </Select.Option>
          <Select.Option value={TaskStage.PREVIEWING}>
            {parseTaskStatus(TaskStage.PREVIEWING)}
          </Select.Option>
          <Select.Option value={TaskStage.DONE}>
            {parseTaskStatus(TaskStage.DONE)}
          </Select.Option>
        </Select>
      </div>

      <Table<MaintenancesTaskType>
        columns={columns}
        loading={maintenances.loading}
        dataSource={maintenances.tasks.data}
        rowKey={(record) => record.id}
        pagination={{
          current: maintenances.tasks.pageNumber,
          pageSize: maintenances.tasks.pageSize,
          total: maintenances.tasks.totalRecords,
        }}
      />

      <Issue />

      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={800}
      >
        <Card
          title="Thông tin bảo dưỡng"
          style={{ marginBottom: 20 }}
          loading={maintenances.detail.loading}
        >
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Tên ">
              {maintenances.detail.detail.maintenanceRequest.name}
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">
              {maintenances.detail.detail.maintenanceRequest.address}
            </Descriptions.Item>
            <Descriptions.Item label="Diện tích">
              {maintenances.detail.detail.maintenanceRequest.area} m2
            </Descriptions.Item>
            <Descriptions.Item label="Dịch vụ bảo dưỡng">
              {maintenances.detail.detail.maintenanceRequest.type ===
              "SCHEDULED"
                ? "Định kì"
                : "1 lần"}
            </Descriptions.Item>
            <Descriptions.Item label="Độ sâu">
              {maintenances.detail.detail.maintenanceRequest.depth} m
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">
              {dayjs(
                maintenances.detail.detail.maintenanceRequest.createdAt
              ).format("DD/MM/YYYY")}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card
          title="Công việc"
          loading={maintenances.detail.loading}
          style={{ marginBottom: 20 }}
        >
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Tên công việc">
              {maintenances.detail.detail.name}
            </Descriptions.Item>

            <Descriptions.Item label="Mô tả">
              {maintenances.detail.detail.description}
            </Descriptions.Item>

            <Descriptions.Item label="Ngày bảo dưỡng">
              {dayjs(maintenances.detail.detail.estimateAt).format(
                "DD/MM/YYYY"
              )}
            </Descriptions.Item>

            <Descriptions.Item label="Hình ảnh">
              {maintenances.detail.detail.imageUrl ? (
                <Image
                  src={maintenances.detail.detail.imageUrl}
                  width={200}
                  height={200}
                />
              ) : (
                "Không có hình ảnh"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              <Tag color={trackColorTask(maintenances.detail.detail.status)}>
                {parseTaskStatus(maintenances.detail.detail.status)}
              </Tag>
            </Descriptions.Item>

            <Descriptions.Item label="Lí do">
              {maintenances.detail.detail.reason}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Upload hình ảnh công việc */}

        <Card title="Upload hình ảnh công việc" style={{ marginBottom: 20 }}>
          {maintenances.detail.detail.status === "PROCESSING" && (
            <Uploader
              maxFiles={1}
              buttonText="Upload hình ảnh"
              onUploadSuccess={async (url) => {
                dispatch(
                  maintainceConstructorActions.updateMaintenancesTask({
                    id: maintenances.detail.detail.id,
                    request: {
                      imageUrl: url[0],
                    },
                  })
                );
              }}
            />
          )}
        </Card>
      </Modal>
    </div>
  );
};

export default Maintaince;
