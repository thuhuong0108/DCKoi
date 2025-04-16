import { createIssueMaintenance } from "@/api/maintennances";
import { messageError, Uploader } from "@/components";
import useForm from "@/hooks/useForm";
import { IssueProjectType } from "@/models";
import { MaintainceStatus } from "@/models/enums/Status";
import { maintainceTaskActions } from "@/redux/slices/maintenanceTask/maintenanceTaskSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { parseTaskStatus, trackColorTask } from "@/utils/helpers";
import { validateIssueMaintaince } from "@/validations/validate";
import {
  Button,
  Card,
  Form,
  Image,
  Modal,
  Space,
  Table,
  TableColumnsType,
  Tag,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const { Text, Link } = Typography;

const Issue = () => {
  const { detail } = useAppSelector((state) => state.maintenanceTask);
  const columns: TableColumnsType<IssueProjectType> = [
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

  const [visibleDetail, setVisibleDetail] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const handleViewDetail = (record: IssueProjectType) => {
    setVisibleDetail(true);
    setLoadingDetail(true);
    setIssue(record);
    setLoadingDetail(false);
  };

  const [issue, setIssue] = useState<IssueProjectType | null>(null);

  const { id } = useParams();
  const issueState = useAppSelector((state) => state.maintenanceTask.issue);
  const [visible, setVisible] = useState(false);
  const { formik, loading, regField, regHandleSubmit } = useForm({
    onSubmit: async (values) => {
      const res = await createIssueMaintenance({
        ...values,
        maintenanceRequestId: id,
      });
      console.log(values);

      if (res.isSuccess) {
        formik.resetForm();
        setVisible(false);
        formik.setFieldValue("issueImage", "");
        formik.setFieldValue("description", "");
        await dispatch(
          maintainceTaskActions.fetchIssue({
            filter: {
              pageNumber: issueState.issues.pageNumber,
              pageSize: issueState.issues.pageSize,
            },
            id: id,
          })
        );
      } else {
        messageError(res.message);
      }
    },
    values: {
      name: `Sự cố ngày ${dayjs().format("DD/MM/YYYY")}`,
      description: "",
      estimateAt: dayjs().format("YYYY-MM-DD"),
      issueImage: "",
    },
    validationSchema: validateIssueMaintaince,
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      maintainceTaskActions.fetchIssue({
        filter: {
          pageNumber: issueState.issues.pageNumber,
          pageSize: issueState.issues.pageSize,
        },
        id: id,
      })
    );
  }, []);
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <Card title="Danh sách sự cố" className="mb-4">
        {/* button post issue */}

        {detail.status === MaintainceStatus.PROCESSING && (
          <div className="flex justify-end">
            <Link
              className="mb-4"
              onClick={() => {
                setVisible(true);
              }}
            >
              Đăng sự cố
            </Link>
          </div>
        )}

        <Table
          columns={columns}
          sortDirections={["descend", "ascend"]}
          rowKey="id"
          dataSource={issueState.issues.data}
          pagination={{
            total: issueState.issues.totalRecords,
            pageSize: issueState.issues.pageSize,
            current: issueState.issues.pageNumber,
          }}
        />
      </Card>

      <Modal
        title="Đăng sự cố"
        open={visible}
        onCancel={() => {
          setVisible(false);
        }}
        footer={null}
      >
        <Form.Item
          label="Nội dung"
          help={regField("description").error}
          validateStatus={regField("description").error ? "error" : "success"}
        >
          <TextArea {...regField("description")} rows={10} />
        </Form.Item>
        <Form.Item label="Hình ảnh">
          <Uploader
            buttonText="Gửi sự cố"
            maxFiles={1}
            onUploadSuccess={(urls) => {
              formik.setFieldValue("issueImage", urls[0]);
              setTimeout(() => {
                formik.handleSubmit();
              });
            }}
          />
        </Form.Item>
      </Modal>

      <Modal
        title="Chi tiết sự cố"
        loading={loadingDetail}
        open={visibleDetail}
        onCancel={() => {
          setVisibleDetail(false);
        }}
        footer={null}
      >
        <Form.Item label="Tên sự cố">
          <Text>{issue?.name}</Text>
        </Form.Item>
        <Form.Item label="Nội dung">
          <Text>{issue?.description}</Text>
        </Form.Item>

        <Form.Item label="Nguyên nhân">
          {issue?.cause ? (
            <Text>{issue?.cause}</Text>
          ) : (
            <Text>Chưa có nguyên nhân</Text>
          )}
        </Form.Item>
        <Form.Item label="Cách xử lí">
          {issue?.solution ? (
            <Text>{issue?.solution}</Text>
          ) : (
            <Text>Chưa có cách xử lí</Text>
          )}
        </Form.Item>
        <Form.Item label="Hình ảnh">
          <Image
            width={200}
            src={issue?.issueImage}
            fallback="https://via.placeholder.com/200"
            alt="Issue Image"
          />
        </Form.Item>
        <Form.Item label="Ngày bảo dưỡng">
          <Text>{dayjs(issue?.estimateAt).format("DD/MM/YYYY")}</Text>
        </Form.Item>
        <Form.Item label="Trạng thái">
          <Tag color={trackColorTask(issue?.status)}>
            {parseTaskStatus(issue?.status)}
          </Tag>
        </Form.Item>

        <Form.Item label="Ngày tạo">
          <Text>{dayjs(issue?.createdAt).format("DD/MM/YYYY")}</Text>
        </Form.Item>
      </Modal>
    </div>
  );
};

export default Issue;
