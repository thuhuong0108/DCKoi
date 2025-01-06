  import { useRoutes } from "react-router-dom";
  import { Home, Login, Register } from "@/pages";
import MainLayout from "@/layouts";

  const Routers = () => {
    const element = useRoutes([
      { path: "/", element: <MainLayout Pages={Home} /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ]);
    return <div>{element}</div>;
  };

  export default Routers;
