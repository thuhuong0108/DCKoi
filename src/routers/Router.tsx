import { useRoutes } from "react-router-dom";
import { Home, Login, Register } from "@/pages";

const Routers = () => {
  const element = useRoutes([
    { path: "", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ]);
  return <div> {element}</div>;
};

export default Routers;
