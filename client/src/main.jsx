import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./route";
import { store } from "./store/store";
import { GlobalProvider } from "./contexts/GlobalProvider";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  </Provider>
);
