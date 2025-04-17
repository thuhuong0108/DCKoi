import {
  createIssueMaintenance,
  getIssueMaintanceById,
  updateIssueMaintenance,
} from "@/api/maintennances";
import {
  confirmAlert,
  messageError,
  messageSuccess,
  Uploader,
} from "@/components";
import useForm from "@/hooks/useForm";
import { IssueProjectType } from "@/models";
import { IssueStatus, MaintainceStatus } from "@/models/enums/Status";
import { maintainceTaskActions } from "@/redux/slices/maintenanceTask/maintenanceTaskSlices";
import { staffActions } from "@/redux/slices/staff/staffSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { parseTaskStatus, trackColorTask } from "@/utils/helpers";
import {
  validateDeny,
  validateFastIssue,
  validateIssueMaintaince,
  validateUpdateIssue,
} from "@/validations/validate";
import { UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Dropdown,
  Form,
  Image,
  List,
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
                handleViewDetail(record.id);
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
  const handleViewDetail = async (recordId: string) => {
    setVisibleDetail(true);
    setLoadingDetail(true);
    const res = await getIssueMaintanceById(recordId);
    if (res.isSuccess) {
      setIssue(res.data);
    } else {
      messageError(res.message);
    }
    setLoadingDetail(false);
  };
  const optionStaff = useAppSelector((state) => state.staff);
  const [issue, setIssue] = useState<IssueProjectType | null>(null);
  const [openSelectStaff, setOpenSelectStaff] = useState(false);

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
  const [visibleDeny, setVisibleDeny] = useState(false);

  const [fastIssue, setFastIssue] = useState(false);

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

  const renderModalFastIssue = () => {
    const { formik, loading, regField, regHandleSubmit } = useForm({
      onSubmit: async (values) => {
        const res = await updateIssueMaintenance(issue?.id, {
          ...values,
        });

        if (res.isSuccess) {
          formik.resetForm();
          formik.setFieldValue("solution", "");
          await dispatch(
            maintainceTaskActions.fetchIssue({
              filter: {
                pageNumber: issueState.issues.pageNumber,
                pageSize: issueState.issues.pageSize,
              },
              id: id,
            })
          );
          handleViewDetail(issue?.id);
          setFastIssue(false);
        } else {
          messageError(res.message);
        }
      },
      values: {
        solution: "",
      },
      validationSchema: validateFastIssue,
    });
    return (
      <Modal
        title="Xử lý nhanh"
        open={fastIssue}
        onCancel={() => {
          setFastIssue(false);
        }}
        footer={null}
      >
        <Form.Item
          label="Cách xử lí"
          help={regField("solution").error}
          validateStatus={regField("solution").error ? "error" : "success"}
        >
          <TextArea {...regField("solution")} rows={10} />
        </Form.Item>

        <Button
          type="primary"
          loading={loading}
          onClick={() => {
            regHandleSubmit();
          }}
        >
          Gửi
        </Button>
      </Modal>
    );
  };
  const [openUpdateIssue, setOpenUpdateIssue] = useState(false);

  const renderModalUpdateIssue = () => {
    useEffect(() => {
      formik.setFieldValue("solution", issue?.solution);
      formik.setFieldValue("cause", issue?.cause);
    }, [issue]);
    const { formik, loading, regField, regHandleSubmit } = useForm({
      onSubmit: async (values) => {
        const res = await updateIssueMaintenance(issue?.id, {
          ...values,
        });
        console.log(values);

        if (res.isSuccess) {
          formik.resetForm();
          formik.setFieldValue("solution", "");
          await dispatch(
            maintainceTaskActions.fetchIssue({
              filter: {
                pageNumber: issueState.issues.pageNumber,
                pageSize: issueState.issues.pageSize,
              },
              id: id,
            })
          );
          handleViewDetail(issue?.id);
          setOpenUpdateIssue(false);
        } else {
          messageError(res.message);
        }
      },
      values: {
        solution: issue?.solution,
        cause: issue?.cause,
      },
      validationSchema: validateUpdateIssue,
    });

    return (
      <Modal
        title="Cập nhật sự cố"
        open={openUpdateIssue}
        onCancel={() => {
          setOpenUpdateIssue(false);
        }}
        footer={null}
      >
        <Form.Item
          label="Nguyên nhân"
          help={regField("cause").error}
          validateStatus={regField("cause").error ? "error" : "success"}
        >
          <TextArea {...regField("cause")} rows={10} />
        </Form.Item>
        <Form.Item
          label="Cách xử lí"
          help={regField("solution").error}
          validateStatus={regField("solution").error ? "error" : "success"}
        >
          <TextArea {...regField("solution")} rows={10} />
        </Form.Item>

        <Button
          type="primary"
          loading={loading}
          onClick={() => {
            regHandleSubmit();
          }}
        >
          Cập nhật
        </Button>
      </Modal>
    );
  };
  const renderModalDeny = () => {
    const { formik, loading, regField, regHandleSubmit } = useForm({
      onSubmit: async (values) => {
        const res = await updateIssueMaintenance(issue?.id, {
          ...values,
        });

        if (res.isSuccess) {
          formik.resetForm();
          formik.setFieldValue("reason", "");
          await dispatch(
            maintainceTaskActions.fetchIssue({
              filter: {
                pageNumber: issueState.issues.pageNumber,
                pageSize: issueState.issues.pageSize,
              },
              id: id,
            })
          );
          handleViewDetail(issue?.id);
          setVisibleDeny(false);
        } else {
          messageError(res.message);
        }
      },
      values: {
        reason: "",
      },
      validationSchema: validateDeny,
    });
    return (
      <Modal
        title="Từ chối sự cố"
        open={visibleDeny}
        onCancel={() => {
          setVisibleDeny(false);
        }}
        footer={null}
      >
        <Form.Item
          label="Lý do từ chối"
          help={regField("reason").error}
          validateStatus={regField("reason").error ? "error" : "success"}
        >
          <TextArea {...regField("reason")} rows={10} />
        </Form.Item>

        <Button
          type="primary"
          loading={loading}
          onClick={() => {
            regHandleSubmit();
          }}
        >
          Gửi
        </Button>
      </Modal>
    );
  };
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
        <div className="flex">
          {" "}
          <Form.Item label="Hình ảnh">
            <div>
              <Image
                width={200}
                height={200}
                src={issue?.issueImage}
                alt="Issue Image"
              />
            </div>
          </Form.Item>
          <Form.Item label="Hình ảnh xử lí">
            {issue?.confirmImage ? (
              <div>
                <Image
                  width={200}
                  height={200}
                  src={issue?.confirmImage}
                  alt="Issue Image"
                />
              </div>
            ) : (
              <div>
                <Text>Chưa có hình ảnh xử lý</Text>
              </div>
            )}
          </Form.Item>
        </div>

        <Form.Item label="Lí do chưa xử lí">
          {issue?.reason ? (
            <Text>{issue?.reason}</Text>
          ) : (
            <Text>Chưa có lí do</Text>
          )}
        </Form.Item>

        {/* staff */}
        <Form.Item label="Người xử lý">
          {issue?.staff ? (
            <>
              {" "}
              <Avatar
                src={issue?.staff.avatar}
                alt="avatar"
                style={{ marginRight: 8 }}
              />
              <Text>{issue?.staff.fullName}</Text>
            </>
          ) : (
            <Text>Chưa có người xử lý</Text>
          )}
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

        {issue?.status === MaintainceStatus.OPENING && (
          <div>
            {" "}
            <Dropdown
              menu={{
                items: [
                  {
                    key: "1",
                    label: (
                      <Link
                        onClick={() => {
                          setFastIssue(true);
                        }}
                      >
                        Xử lí nhanh
                      </Link>
                    ),
                  },
                  {
                    key: "2",
                    label: (
                      <Link
                        onClick={async () => {
                          await dispatch(
                            staffActions.fetchConstructorStaff({
                              pageNumber: 1,
                              pageSize: 10,
                            })
                          );
                          setOpenSelectStaff(true);
                        }}
                      >
                        Chọn nhân viên
                      </Link>
                    ),
                  },
                ],
              }}
              trigger={["click"]}
            >
              <Button type="primary">Xử lí sự cố</Button>
            </Dropdown>
            <Button
              type="primary"
              className="ml-2"
              onClick={() => {
                setOpenUpdateIssue(true);
              }}
            >
              Cập nhật sự cố
            </Button>
          </div>
        )}

        {issue?.status === IssueStatus.PREVIEWING && (
          <div>
            <Button
              type="primary"
              onClick={() => {
                confirmAlert({
                  title: "Xác nhận",
                  message:
                    "Bạn có chắc chắn muốn chấp nhận xử lí sự cố này không?",
                  yes: async () => {
                    const res = await updateIssueMaintenance(issue?.id, {
                      status: "DONE",
                    });

                    if (res.isSuccess) {
                      messageSuccess("Cập nhật trạng thái thành công");
                      handleViewDetail(issue?.id);
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
                });
              }}
              className="mr-2"
            >
              Chấp nhận
            </Button>
            <Button
              color="danger"
              onClick={() => {
                setVisibleDeny(true);
              }}
              className="mr-2"
            >
              Từ chối
            </Button>
          </div>
        )}
      </Modal>
      {renderModalFastIssue()}
      {renderModalUpdateIssue()}
      {renderModalDeny()}
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
          dataSource={optionStaff.staffs.data}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  onClick={async () => {
                    const res = await updateIssueMaintenance(issue?.id, {
                      staffId: item.id,
                    });
                    if (res.isSuccess) {
                      messageSuccess("Cập nhật nhân viên thành công");
                      setOpenSelectStaff(false);
                      handleViewDetail(issue?.id);
                      await dispatch(
                        maintainceTaskActions.fetchIssue({
                          filter: {
                            pageNumber: issueState.issues.pageNumber,
                            pageSize: issueState.issues.pageSize,
                          },
                          id: id,
                        })
                      );
                      handleViewDetail(issue?.id);
                    } else {
                      messageError(res.message);
                    }
                  }}
                  type="primary"
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
    </div>
  );
};

export default Issue;
