import React, { useEffect, useState } from "react";
import {
  Tabs,
  Avatar,
  Button,
  Input,
  Form,
  Select,
  Typography,
  Divider,
  Row,
  Col,
  Space,
  Modal,
} from "antd";
import { User } from "@/models/User";
import { getInforUser, updateInforUser } from "@/api/user";
import useForm from "@/hooks/useForm";
import { validateInfoUser } from "@/validations/validate";
import { messageSuccess, Uploader } from "@/components";
import { useAppDispatch } from "@/redux/store/hook";
import { authActions } from "@/redux/slices/auth/authSlices";

const { TabPane } = Tabs;
const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const optionGender = ["Nam", "Nữ", "Khác"];

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<User | null>(null);

  const { formik, regField, regHandleSubmit } = useForm({
    values: {
      fullName: "",
      email: "",
      gender: "",
      phone: "",
      address: "",
      dob: "",
    },
    onSubmit: async (values) => {
      const res = await updateInforUser(data?.id, values);
      if (res.isSuccess) {
        messageSuccess(res.message);
        dispatch(authActions.updateName(values.fullName));
        setData((prev) => ({
          ...prev,
          fullName: values.fullName,
        }));
      }
    },
    validationSchema: validateInfoUser,
  });

  const fetchUserInfo = async () => {
    setLoading(true);
    const response = await getInforUser();

    if (response.isSuccess) {
      setData(response.data);
      await formik.setFieldValue("fullName", response.data.fullName);
      await formik.setFieldValue("email", response.data.email);
      await formik.setFieldValue("gender", response.data.gender);
      await formik.setFieldValue("phone", response.data.phone);
      await formik.setFieldValue("address", response.data.address);
      await formik.setFieldValue("dob", response.data.dob);
    }

    setLoading(false);
  };

  const dispatch = useAppDispatch();
  useEffect(() => {
    fetchUserInfo();
  }, []);

  const [open, setOpen] = useState(false);

  const handleUploadSuccess = async (urls: string[]) => {
    const Upload = {
      avatar: urls[0],
    };
    const res = await updateInforUser(data.id, Upload);
    if (res.isSuccess) {
      setData((prev) => ({
        ...prev,
        avatar: urls[0],
      }));
      await dispatch(authActions.updateAvatar(urls[0]));
      setOpen(false);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen w-full">
      <Modal
        title="Upload ảnh đại diện"
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        footer={null}
      >
        <Uploader
          maxFiles={1}
          buttonText="Tải ảnh lên "
          onUploadSuccess={handleUploadSuccess}
        />
      </Modal>
      <Title level={2}>Hồ sơ</Title>
      <Text type="secondary">Điều chỉnh tài khoản.</Text>

      <Tabs defaultActiveKey="1" className="mt-6">
        <TabPane tab="Cá nhân" key="1">
          <Row gutter={32}>
            <Col xs={24} md={12}>
              <Title level={4}>Thông tin cá nhân</Title>
              <Divider />
              <Space align="start" size={24}>
                <Avatar size={100} src={data?.avatar} />
                <div>
                  <Text strong>{data?.fullName}</Text>
                  <Paragraph type="secondary"></Paragraph>
                  <Button
                    type="link"
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    Upload
                  </Button>
                </div>
              </Space>

              <Form layout="vertical" className="mt-6">
                <Form.Item
                  label="Họ và tên"
                  help={regField("fullName").error}
                  validateStatus={
                    regField("fullName").error ? "error" : "success"
                  }
                >
                  <Input
                    {...regField("fullName")}
                    placeholder="Nhập họ và tên"
                  />
                </Form.Item>

                <Form.Item
                  label="Email"
                  help={regField("email").error}
                  validateStatus={regField("email").error ? "error" : "success"}
                >
                  <Input {...regField("email")} placeholder="Nhập email" />
                </Form.Item>

                <Form.Item
                  label="Giới tính"
                  help={regField("gender").error}
                  validateStatus={
                    regField("gender").error ? "error" : "success"
                  }
                >
                  <Select
                    {...regField("gender")}
                    value={formik.values.gender}
                    onChange={(value) => formik.setFieldValue("gender", value)}
                    placeholder="Chọn giới tính"
                  >
                    {optionGender.map((gender) => (
                      <Option key={gender} value={gender}>
                        {gender}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Số điện thoại"
                  help={regField("phone").error}
                  validateStatus={regField("phone").error ? "error" : "success"}
                >
                  <Input
                    {...regField("phone")}
                    placeholder="Nhập số điện thoại"
                  />
                </Form.Item>
                <Form.Item
                  label="Địa chỉ"
                  help={regField("address").error}
                  validateStatus={
                    regField("address").error ? "error" : "success"
                  }
                >
                  <Input {...regField("address")} placeholder="Nhập địa chỉ" />
                </Form.Item>

                <Button
                  type="primary"
                  block
                  className="mt-6"
                  onClick={regHandleSubmit}
                  loading={loading}
                >
                  Cập nhật
                </Button>
              </Form>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Bảo mật" key="3">
          <Row gutter={32}>
            <Col xs={24} md={12}>
              <Title level={4}>Đổi mật khẩu</Title>
              <Text type="secondary">
                Thay đổi mật khẩu hiện tại bằng mật khẩu mới.
              </Text>
              <Button type="primary" className="mt-4">
                Đổi mật khẩu
              </Button>
            </Col>
            <Col xs={24} md={12}>
              <Title level={4}>Xác thực 2 yếu tố</Title>
              <Text type="secondary">
                Cài đặt hoặc gỡ bỏ thiết bị xác thực đa lớp (MFA).
              </Text>
              <Button type="primary" className="mt-4">
                Cài đặt / Gỡ bỏ
              </Button>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Profile;
