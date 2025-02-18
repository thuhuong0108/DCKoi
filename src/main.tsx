import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import store from "./redux/store/store";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./utils/history";
import { BrowserRouter } from "react-router-dom";
import { NavigationProvider } from "./contexts/NavigationContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      {/* <SocketProvider> */}
      <BrowserRouter>
        <NavigationProvider>
          {/* <ConnectedRouter history={history}> */}
          <App />
        </NavigationProvider>
      </BrowserRouter>
      {/* </ConnectedRouter> */}
      {/* </SocketProvider> */}
    </Provider>
  </StrictMode>
);
