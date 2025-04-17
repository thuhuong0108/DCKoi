import { updateIssueMaintenance } from "@/api/maintennances";
import { messageError, Title, Uploader } from "@/components";
import { IssueProjectType } from "@/models";
import { TaskStage } from "@/models/enums/TaskStage";
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

const { Text, Link } = Typography;
const Issue = () => {
  const [status, setStatus] = useState<string>(TaskStage.PROCESSING);
  const columns: TableColumnsType<IssueProjectType> = [
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
          <Space
            size="middle"
            onClick={() => {
              setVisible(true);
              dispatch(
                maintainceConstructorActions.fetchIssueDetail(record.id)
              );
            }}
          >
            <Link>Chi tiết</Link>
          </Space>
        );
      },
    },
  ];
  const issues = useAppSelector((state) => state.maintainceConstructor);

  const [visible, setVisible] = useState(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      maintainceConstructorActions.fetchIssue({
        filter: {
          pageNumber: 1,
          pageSize: 10,
        },
        status: status,
      })
    );
  }, [dispatch, status]);
  return (
    <div>
      <Title name="Sự cố" />
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

      <Table<IssueProjectType>
        columns={columns}
        loading={issues.issue.loading}
        dataSource={issues.issue.issue.data}
        rowKey={(record) => record.id}
        pagination={{
          total: issues.issue.issue.totalRecords,
          pageSize: issues.issue.issue.pageSize,
          current: issues.issue.issue.pageNumber,
        }}
      />

      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={800}
      >
        <Card
          title="Thông tin sự cố"
          style={{ marginBottom: 20 }}
          loading={issues.detail.loading}
        >
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Tên ">
              {issues.issue.detail.detail.name}
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ">
              {issues.issue.detail.detail.maintenanceRequest.address}
            </Descriptions.Item>
            <Descriptions.Item label="Diện tích">
              {issues.issue.detail.detail.maintenanceRequest.area} m2
            </Descriptions.Item>

            <Descriptions.Item label="Độ sâu">
              {issues.issue.detail.detail.maintenanceRequest.depth} m
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">
              {dayjs(
                issues.issue.detail.detail.maintenanceRequest.createdAt
              ).format("DD/MM/YYYY")}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Card
          title="Công việc"
          loading={issues.detail.loading}
          style={{ marginBottom: 20 }}
        >
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Nguyên nhân">
              {issues.issue.detail.detail.cause ? (
                <Text>{issues.issue.detail.detail.cause}</Text>
              ) : (
                <Text>Chưa có nguyên nhân</Text>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Giải pháp">
              {issues.issue.detail.detail.solution ? (
                <Text>{issues.issue.detail.detail.solution}</Text>
              ) : (
                <Text>Chưa có giải pháp</Text>
              )}
            </Descriptions.Item>

            <Descriptions.Item label="Mô tả">
              {issues.issue.detail.detail.description ? (
                <Text>{issues.issue.detail.detail.description}</Text>
              ) : (
                <Text>Chưa có mô tả</Text>
              )}
            </Descriptions.Item>

            <Descriptions.Item label="Ngày bảo dưỡng">
              {dayjs(issues.detail.detail.estimateAt).format("DD/MM/YYYY")}
            </Descriptions.Item>

            <Descriptions.Item label="Trạng thái">
              <Tag color={trackColorTask(issues.issue.detail.detail.status)}>
                {parseTaskStatus(issues.issue.detail.detail.status)}
              </Tag>
            </Descriptions.Item>

            <Descriptions.Item label="Lí do">
              {issues.issue.detail.detail.reason ? (
                <Text>{issues.issue.detail.detail.reason}</Text>
              ) : (
                <Text>Chưa có lí do</Text>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Hình ảnh">
              {issues.issue.detail.detail.issueImage ? (
                <Image
                  src={issues.issue.detail.detail.issueImage}
                  width={200}
                  height={200}
                />
              ) : (
                "Không có hình ảnh"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Hình ảnh xử lí">
              {issues.issue.detail.detail.confirmImage ? (
                <Image
                  src={issues.issue.detail.detail.issueImage}
                  width={200}
                  height={200}
                />
              ) : (
                "Không có hình ảnh"
              )}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        {/* Upload hình ảnh công việc */}

        <Card title="Upload hình ảnh công việc" style={{ marginBottom: 20 }}>
          {issues.issue.detail.detail.status === "PROCESSING" && (
            <Uploader
              maxFiles={1}
              buttonText="Upload hình ảnh"
              onUploadSuccess={async (url) => {
                const res = await updateIssueMaintenance(
                  issues.issue.detail.detail.id,
                  { confirmImage: url[0] }
                );
                if (res.isSuccess) {
                  await dispatch(
                    maintainceConstructorActions.fetchIssue({
                      filter: {
                        pageNumber: 1,
                        pageSize: 10,
                      },
                      status: status,
                    })
                  );
                  await dispatch(
                    maintainceConstructorActions.fetchIssueDetail(
                      issues.issue.detail.detail.id
                    )
                  );
                } else {
                  messageError(res.message);
                }
              }}
            />
          )}
        </Card>
      </Modal>
    </div>
  );
};

export default Issue;
