import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./route";
import { store } from "./store/store";
import { GlobalProvider } from "./contexts/GlobalProvider";
import { SocketProvider } from "./contexts/Socket";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GlobalProvider>
    <SocketProvider>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        style={{ zIndex: 999999999 }}
      />
      <RouterProvider router={router} />
      </SocketProvider>
    </GlobalProvider>
  </Provider>
);
