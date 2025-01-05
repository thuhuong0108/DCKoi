const Login = () => {
  const handleLogin = () => {
    console.log("login");
  };
  return (
    <>
      <button onClick={() => handleLogin()}>Login</button>
    </>
  );
};

export default Login;
