import { useRoutes } from "react-router-dom";
import { Contact, Login, Register } from "@/pages";
import HomeLayout from "@/layouts";

const Routers = () => {
  const element = useRoutes([
    { path: "/*", element: <HomeLayout /> },
    { path: "/contact", element: <Contact /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ]);
  return <div>{element}</div>;
};

export default Routers;
