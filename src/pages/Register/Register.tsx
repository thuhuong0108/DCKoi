import { signUpApi } from "@/api/auth";
import { messageError, messageSuccess } from "@/components";
import Button from "@/components/ui/Button";
import useForm from "@/hooks/useForm";
import { RegisterRequest } from "@/models/Request/RegisterType";
import { validateRegister } from "@/validations/validate";
import { TextField } from "@mui/material";
import { Col, Row, Select } from "antd";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const optionGender = ["Nam", "Nữ", "Khác"];
  const { loading, regField, regHandleSubmit, formik } = useForm({
    values: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      address: "",
      dob: "2000-01-01",
      gender: "Nam",
    },
    validationSchema: validateRegister,
    onSubmit: async (values: RegisterRequest) => {
      const res = await signUpApi(values);
      if (res.isSuccess) {
        messageSuccess(res.message);
        navigate("/login");
      } else {
        messageError(res.message);
      }
    },
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://i.pinimg.com/736x/70/ed/a5/70eda54dc66611bb3cdfb74e65c60103.jpg")',
      }}
    >
      <div className="flex flex-col gap-4 bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-center text-2xl font-bold text-blue-700 mb-6">
          Đăng Ký Tài Khoản
        </h2>

        <TextField
          required
          label="Họ và tên"
          {...regField("fullName")}
          error={Boolean(regField("fullName").error)}
          helperText={regField("fullName").error}
        />

        <TextField
          required
          type="email"
          label="Email"
          {...regField("email")}
          error={Boolean(regField("email").error)}
          helperText={regField("email").error}
        />

        <TextField
          required
          label="Số điện thoại"
          {...regField("phone")}
          error={Boolean(regField("phone").error)}
          helperText={regField("phone").error}
        />

        <TextField
          required
          type="password"
          label="Mật khẩu"
          {...regField("password")}
          error={Boolean(regField("password").error)}
          helperText={regField("password").error}
        />

        {/* <TextField
          required
          type="password"
          label="Xác nhận mật khẩu"
          {...regField("password")}
          error={Boolean(regField("password").error)}
          helperText={regField("password").error}
        /> */}

        <TextField
          required
          label="Địa chỉ"
          {...regField("address")}
          error={Boolean(regField("address").error)}
          helperText={regField("address").error}
        />

        <Row className="flex flex-row justify-between items-center w-full">
          <TextField
            className="w-1/2"
            required
            type="date"
            label="Ngày tháng năm sinh"
            {...regField("dob")}
            error={Boolean(regField("dob").error)}
            helperText={regField("dob").error}
          />

          <Col className="w-1/2">
            <Select
              className="bg-opacity-80 "
              size="large"
              style={{ width: "100%", height: "60px" }}
              value={regField("gender")}
              onChange={(value) => formik.setFieldValue("gender", value)}
            >
              {optionGender.map((gd, index) => (
                <Select.Option
                  key={index}
                  value={gd}
                  style={{ padding: "12px 16px", fontSize: "16px" }}
                >
                  {gd}
                </Select.Option>
              ))}
            </Select>
          </Col>
        </Row>

        <Button
          primary
          size="lg"
          onClick={regHandleSubmit}
          title="Đăng kí"
          loading={loading}
        />

        <Button
          ghost
          size="lg"
          title="Bạn có tài khoản? Đăng nhập"
          onClick={() => navigate("/login")}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Register;
