import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Routers from "./routers";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routers />
      <ToastContainer />
    </>
  );
}

export default App;
