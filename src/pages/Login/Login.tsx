import ImgLogo from "@/assets/images/logo.png";
import useForm from "@/hooks/useForm";
import { RoleUser } from "@/models/enums/RoleUser";
import {
  authActions,
  LoginPayload,
  selectCurrentUser,
  selectIsAuthenticated,
  selectRole,
} from "@/redux/slices/auth/authSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { validateLogin } from "@/validations/validate";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const currentUser = useAppSelector(selectCurrentUser);
  const roleUser = useAppSelector(selectRole);

  const isLoading = useAppSelector((state) => state.auth.loading);
  const { loading, regField, regHandleSubmit } = useForm({
    values: {
      email: "",
      password: "",
    },
    validationSchema: validateLogin,
    onSubmit: async (values: LoginPayload) => {
      dispatch(authActions.login(values));
    },
  });

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      switch (roleUser) {
        case RoleUser.CUSTOMER:
          navigate("/");
          break;
        case RoleUser.ADMINISTRATOR:
          navigate("/admin");
          break;
        case RoleUser.CONSTRUCTOR:
          navigate("/constructor");
          break;
        case RoleUser.CONSULTANT:
          navigate("/consultant");
          break;
        case RoleUser.DESIGNER:
          navigate("/designer");
          break;
        case RoleUser.MANAGER:
          navigate("/manager");
          break;
      }
    }
  }, [isAuthenticated, currentUser, roleUser, navigate]);

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
          Đăng nhập
        </h2>
        <div className="flex flex-col rounded-3xl p-10 m-8 min-h-[500px] w-full max-w-xl ">
          <div className="">
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              variant="outlined"
              {...regField("email")}
              error={Boolean(regField("email").error)}
              helperText={regField("email").error}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              variant="outlined"
              {...regField("password")}
              error={Boolean(regField("password").error)}
              helperText={regField("password").error}
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {isLoading ? "Loading..." : "Đăng nhập"}
            </Button>

            <div className="flex justify-between items-center mt-4">
              <Typography variant="body2" color="textSecondary">
                Bạn chưa có tài khoản?{" "}
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => navigate("/register")}
                >
                  Đăng ký
                </Button>
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
