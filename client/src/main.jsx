import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import MyAccount from "./pages/MyAccount.jsx";
import Register from "./pages/Register.jsx";
import { store } from "./store/store.js";
// import MyOrder from './components/profile/MyOrder.jsx'
import Admin from "./admin/Admin.jsx";
import AnalyticsPage from "./admin/pages/AnalyticsPage.jsx";
import OrdersPage from "./admin/pages/OrdersPage.jsx";
import OverviewPage from "./admin/pages/OverviewPage.jsx";
import ProductsPage from "./admin/pages/ProductsPage.jsx";
import SalesPage from "./admin/pages/SalesPage.jsx";
import SettingsPage from "./admin/pages/SettingsPage.jsx";
import UsersPage from "./admin/pages/UsersPage.jsx";
import DeliveryChecker from "./components/order/DeliveryChecker.jsx";
import MyOrder from "./components/profile/MyOrder.jsx";
import SingleOrder from "./components/profile/SingleOrderDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderConfirmation from "./pages/ConfirmedOrder.jsx";
import MyProfile from "./pages/MyProfile.page.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import SearchingCategoryPage from "./pages/SearchingCategory.page.jsx";
// import Shops from './pages/Shops.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
      
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/order-confirmation",
        element: <OrderConfirmation />,
      },
      {
        path: "/orderDetails",
        element: <SingleOrder />,
      },
      {
        path: "/category&searching/:value",
        element: <SearchingCategoryPage />,
      },
      {
        path: "/my-account",
        element: <MyAccount />,
        children: [
          {
            path: "/my-account/wishlist",
            element: <Wishlist />,
          },
          {
            path: "/my-account/my-orders",
            element: <MyOrder />,
          },
          {
            path: "/my-account/my-info",
            element: <MyProfile />,
          },
          {
            path: "/my-account/address",
            element: <DeliveryChecker />,
          },
        ],
      },
    ],
  },
  {
    path: "/admin/dashboard",
    element: <Admin />,
    children: [
      {
        path: "/admin/dashboard/products",
        element: <ProductsPage />,
      },
      {
        path: "/admin/dashboard/orders",
        element: <OrdersPage />,
      },
      {
        path: "/admin/dashboard/overview",
        element: <OverviewPage />,
      },
      {
        path: "/admin/dashboard/users",
        element: <UsersPage />,
      },
      {
        path: "/admin/dashboard/settings",
        element: <SettingsPage />,
      },
      {
        path: "/admin/dashboard/sales",
        element: <SalesPage />,
      },
      {
        path: "/admin/dashboard/analytics",
        element: <AnalyticsPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
