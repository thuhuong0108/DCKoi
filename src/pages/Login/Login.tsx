import { loginSuccess } from "@/redux/slices/authSlices";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const handleLogin = () => {
    console.log("login");
    dispatch(loginSuccess());
    console.log("login");
  };
  return (
    <>
      <button onClick={() => handleLogin()}>Login</button>
    </>
  );
};

export default Login;
