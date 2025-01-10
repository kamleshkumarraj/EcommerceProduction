import { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { Provider, useDispatch } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiCalling } from "./api/apiCalling.api";
import { GlobalProvider } from "./contexts/GlobalProvider";
import { SocketProvider } from "./contexts/Socket";
import { router } from "./route";
import { setUser } from "./store/slices/selfHandler.slice";
import { store } from "./store/store";

const MyApp = ({ children }) => {
  //api calling for when jwt token is not expired then login the user.
  const dispatch = useDispatch();
  
  useEffect(() => {
    (async function directLogin() {
      const options = {
        url: "http://localhost:2000/api/v2/auth/direct-login",
        method: "POST",
      };
      const response = await dispatch(apiCalling(options));
      if (response?.success) {
        console.log("User logged in successfully");
        dispatch(setUser(response.data));
        
      } else {
        console.log("We get error during login the user !");
      }
    })();
  }, []);
  return <div id="my-app">{children}</div>;
};

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <SocketProvider>
      <MyApp>
        <GlobalProvider>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            style={{ zIndex: 999999999 }}
          />
          <RouterProvider router={router} />
        </GlobalProvider>
      </MyApp>
    </SocketProvider>
  </Provider>
);
