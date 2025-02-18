import ImgLogo from "@/assets/images/logo.png";
import useForm from "@/hooks/useForm";
import { authActions, LoginPayload } from "@/redux/slices/auth/authSlices";
import { useAppDispatch, useAppSelector } from "@/redux/store/hook";
import { validateLogin } from "@/validations/validate";
import { Box, Button, TextField, Typography } from "@mui/material";

const Login = () => {
  const dispatch = useAppDispatch();
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
                align="center"
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
