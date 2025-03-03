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
      }
    }
  }, [isAuthenticated, currentUser, roleUser, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-row justify-evenly items-center">
        <img src={ImgLogo} alt="Logo" className="w-[30%]" />
        <div className="flex flex-col rounded-3xl shadow-lg p-10 m-8 min-h-[500px] w-full max-w-xl bg-white">
          <div className="">
            <Box
              component="form"
              onSubmit={regHandleSubmit}
              sx={{
                width: "100%",
                bgcolor: "white",
                padding: 4,
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <Typography
                variant="h5"
                component="h1"
                gutterBottom
                align="left"
                sx={{ fontWeight: 700 }}
              >
                Login
              </Typography>
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
                {isLoading ? "Loading..." : "Login"}
              </Button>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
