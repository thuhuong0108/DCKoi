import { confirmIssue, createIssue, updateIssue } from "@/api/issue";
import { getIssueTypes } from "@/api/issueType";
import {
  Button,
  confirmWarning,
  messageError,
  messageSuccess,
  Uploader,
} from "@/components";
import useForm from "@/hooks/useForm";
import { IssueType } from "@/models";
import { RoleUser } from "@/models/enums/RoleUser";
import { IssueStatus } from "@/models/enums/Status";
import { issueActions } from "@/redux/slices/issue/issueSlices";
import { projectStateDetailActions } from "@/redux/slices/projectStateDetail/projectStateDetailSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { convertIOSDatetoNormalDate, parseIssueStatus } from "@/utils/helpers";
import { validateDeny, validateIssue } from "@/validations/validate";
import { EllipsisOutlined } from "@ant-design/icons";
import {
  DatePicker,
  Dropdown,
  Form,
  Image,
  Input,
  Menu,
  Modal,
  Select,
  Table,
  Button as ButtonAndt,
} from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ModalIssue = ({ issue, idItem }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [issueType, setIssueType] = useState<IssueType[]>([]);
  const [selectIssue, setSelectIssue] = useState<IssueType>();
  const staff = useAppSelector(
    (state) => state.projectStateDetail.project.detail.staff
  ).filter((item) => item.position === RoleUser.CONSTRUCTOR);

  const [visibleDetail, setVisibleDetail] = useState(false);

  console.log(staff);

  const openModal = async () => {
    const res = await getIssueTypes();
    if (res.isSuccess) {
      setIssueType(res.data);
    }
    setVisible(true);
  };
  const [open, setOpen] = useState(false);

  const columns = [
    {
      title: "Stt",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => <label>{index + 1}</label>,
    },
    {
      title: "Vấn đề",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hạng mục công việc",
      dataIndex: "constructionItem",
      key: "constructionItem",
      render: (record) => <label>{record.name}</label>,
    },

    // {
    //   title: "Mô tả",
    //   dataIndex: "description",
    //   key: "description",
    // },
    // {
    //   title: "Nguyên nhân",
    //   dataIndex: "cause",
    //   key: "cause",
    // },
    // {
    //   title: "Giải pháp",
    //   dataIndex: "solution",
    //   key: "solution",
    // },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (record) => <label>{parseIssueStatus(record)}</label>,
    },
    // {
    //   title: "Hình ảnh",
    //   dataIndex: "issueImage",
    //   key: "issueImage",
    //   render: (record) => (
    //     <Image width={100} src={record} alt="Hình ảnh vấn đề" />
    //   ),
    // },
    {
      title: "Người chịu trách nhiệm",
      dataIndex: "staff",
      key: "staff",
      render: (record) => <label>{record?.fullName}</label>,
    },
    {
      title: "Hình ảnh xác nhận",
      dataIndex: "confirmImage",
      key: "confirmImage",
      render: (record) =>
        record && <Image width={100} src={record} alt="Hình ảnh xác nhận" />,
    },
    {
      title: "Hành động",
      dataIndex: "confirm",
      key: "confirm",
      render: (_, record) => {
        if (record.status === IssueStatus.OPENING) {
          return (
            <Dropdown
              overlay={
                <Menu>
                  {staff.map((item) => (
                    <Menu.Item
                      onClick={async () => {
                        const data = {
                          staffId: item.id,
                        };
                        const res = await updateIssue({
                          id: record.id,
                          issue: data,
                        });
                        if (res.isSuccess) {
                          messageSuccess("Giao việc thành công");
                          await dispatch(
                            projectStateDetailActions.fetchIssueConstructionItem(
                              {
                                idProject: id,
                                idConstructionItem: idItem,
                              }
                            )
                          );
                        } else {
                          messageError(res.message);
                        }
                      }}
                    >
                      {item.fullName}
                    </Menu.Item>
                  ))}
                </Menu>
              }
              trigger={["click"]}
            >
              <ButtonAndt type="primary">Chọn người xử lý</ButtonAndt>
            </Dropdown>
          );
        } else {
          return (
            <ButtonAndt
              type="primary"
              onClick={() => {
                setSelectIssue(record);
                setVisibleDetail(true);
              }}
            >
              Xem chi tiết
            </ButtonAndt>
          );
        }
      },
    },
  ];
  const { id } = useParams();
  const { regField, formik, loading, regHandleSubmit } = useForm({
    onSubmit: async (values) => {
      const res = await createIssue({
        constructionItemId: idItem,
        issue: values,
      });
      console.log(res);

      if (res.isSuccess) {
        setVisible(false);
        await dispatch(
          projectStateDetailActions.fetchIssueConstructionItem({
            idProject: id,
            idConstructionItem: idItem,
          })
        );
      }
    },
    values: {
      name: "",
      description: "",
      cause: "",
      solution: "",
      issueTypeId: "",
      issueImage: "",
      estimateAt: "",
    },
    validationSchema: validateIssue,
  });

  const onUploadSuccess = (url: string) => {
    formik.setFieldValue("issueImage", url);
    formik.setFieldValue(
      "estimateAt",
      convertIOSDatetoNormalDate(
        new Date(formik.values.estimateAt).toISOString()
      )
    );
    setTimeout(() => {
      regHandleSubmit();
    }, 0);
  };

  const ModalDeny = () => {
    const { formik, loading, regField, regHandleSubmit } = useForm({
      onSubmit: async (values) => {
        const data = {
          reason: values.reason,
        };
        const res = await updateIssue({
          id: selectIssue.id,
          issue: data,
        });
        if (res.isSuccess) {
          setOpen(false);
          await dispatch(
            projectStateDetailActions.fetchIssueConstructionItem({
              idProject: id,
              idConstructionItem: idItem,
            })
          );
          setVisibleDetail(false);
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
        title="Từ chối"
        visible={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Form layout="vertical">
          <Form.Item
            label="Lý do từ chối"
            help={regField("reason").error}
            validateStatus={regField("reason").error ? "error" : "success"}
          >
            <Input {...regField("reason")} />
          </Form.Item>

          <ButtonAndt primary loading={loading} onClick={regHandleSubmit}>
            Xác nhận
          </ButtonAndt>
        </Form>
      </Modal>
    );
  };

  return (
    <div>
      <Button
        primary
        title="Thêm vấn đề"
        onClick={() => {
          openModal();
        }}
      />
      <Table
        dataSource={issue.issues}
        columns={columns}
        pagination={false}
        rowKey="id"
      />

      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        title="Thêm vấn đề"
      >
        <Form layout="vertical">
          <Form.Item
            label="Tên vấn đề"
            help={regField("name").error}
            validateStatus={regField("name").error ? "error" : "success"}
          >
            <Input {...regField("name")} />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            help={regField("description").error}
            validateStatus={regField("description").error ? "error" : "success"}
          >
            <Input.TextArea {...regField("description")} />
          </Form.Item>
          <Form.Item
            label="Nguyên nhân"
            help={regField("cause").error}
            validateStatus={regField("cause").error ? "error" : "success"}
          >
            <Input.TextArea {...regField("cause")} />
          </Form.Item>
          <Form.Item
            label="Giải pháp"
            help={regField("solution").error}
            validateStatus={regField("solution").error ? "error" : "success"}
          >
            <Input.TextArea {...regField("solution")} />
          </Form.Item>
          <Form.Item
            label="Loại vấn đề"
            help={regField("issueTypeId").error}
            validateStatus={regField("issueTypeId").error ? "error" : "success"}
          >
            <Select
              onChange={(value) => {
                formik.setFieldValue("issueTypeId", value);
              }}
              placeholder="Chọn loại vấn đề"
            >
              {issueType.map((item) => (
                <Select.Option value={item.id}>{item.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Thời gian dự kiến"
            help={regField("estimateAt").error}
            validateStatus={regField("estimateAt").error ? "error" : "success"}
          >
            <DatePicker
              onChange={(date) => {
                formik.setFieldValue("estimateAt", date);
              }}
            />
          </Form.Item>

          <Uploader
            maxFiles={1}
            buttonText="Tạo vấn đề"
            onUploadSuccess={(url) => onUploadSuccess(url[0])}
          />
        </Form>
      </Modal>

      <Modal
        visible={visibleDetail}
        onCancel={() => setVisibleDetail(false)}
        footer={null}
        title="Chi tiết vấn đề"
      >
        <Form layout="vertical">
          <Form.Item label="Tên vấn đề">
            <Input value={selectIssue?.name} disabled />
          </Form.Item>
          <Form.Item label="Mô tả">
            <Input.TextArea value={selectIssue?.description} disabled />
          </Form.Item>
          <Form.Item label="Nguyên nhân">
            <Input.TextArea value={selectIssue?.cause} disabled />
          </Form.Item>
          <Form.Item label="Giải pháp">
            <Input.TextArea value={selectIssue?.solution} disabled />
          </Form.Item>
          <Form.Item label="Loại vấn đề">
            <Input value={selectIssue?.issueType} disabled />
          </Form.Item>

          <Form.Item label="Thời gian dự kiến">
            <Input value={selectIssue?.estimateAt} disabled />
          </Form.Item>
          <Form.Item label="Thời gian thực tế">
            <Input value={selectIssue?.actualAt} disabled />
          </Form.Item>

          <Form.Item label="Hình ảnh xác nhận">
            {selectIssue?.confirmImage && (
              <Image
                width={100}
                src={selectIssue?.confirmImage}
                alt="Hình ảnh xác nhận"
              />
            )}
          </Form.Item>

          {selectIssue?.status === IssueStatus.PREVIEWING && (
            <div className="flex gap-2">
              <ButtonAndt
                type="primary"
                onClick={async () => {
                  confirmWarning({
                    message: "Bạn có chắc chắn muốn xác nhận vấn đề?",
                    title: "Xác nhận",
                    yes: async () => {
                      const res = await confirmIssue(selectIssue.id);
                      if (res.isSuccess) {
                        messageSuccess("Xác nhận vấn đề thành công");
                        await dispatch(
                          projectStateDetailActions.fetchIssueConstructionItem({
                            idProject: id,
                            idConstructionItem: idItem,
                          })
                        );
                      }

                      setVisibleDetail(false);
                    },
                  });
                }}
              >
                Xác nhận
              </ButtonAndt>
              <ButtonAndt
                type="primary"
                onClick={() => {
                  setOpen(true);
                  // setSelectIssue(selectIssue);
                }}
              >
                Từ chối
              </ButtonAndt>
            </div>
          )}
        </Form>
        {ModalDeny()}
      </Modal>
    </div>
  );
};

export default ModalIssue;
