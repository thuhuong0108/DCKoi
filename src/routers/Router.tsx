import { useRoutes } from "react-router-dom";
import { Contact, Home, Login, Register } from "@/pages";
import MainLayout from "@/layouts";

const Routers = () => {
  const element = useRoutes([
    { path: "/", element: <MainLayout Pages={Home} /> },
    { path: "/contact", element: <MainLayout Pages={Contact} /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ]);
  return <div>{element}</div>;
};

export default Routers;
