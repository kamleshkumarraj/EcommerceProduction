import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Admin from "./admin/Admin.jsx";
import AnalyticsPage from "./admin/pages/AnalyticsPage.jsx";
import OrdersPage from "./admin/pages/OrdersPage.jsx";
import OverviewPage from "./admin/pages/OverviewPage.jsx";
import ProductsPage from "./admin/pages/ProductsPage.jsx";
import SalesPage from "./admin/pages/SalesPage.jsx";
import SettingsPage from "./admin/pages/SettingsPage.jsx";
import UsersPage from "./admin/pages/UsersPage.jsx";
import BlogApp from "./blog/Blog.jsx";
import ForgotPassword from "./blog/components/authentication/ForgotPassword.jsx";
import ResetPassword from "./blog/components/authentication/ResetPassword.jsx";
import SinglePage from "./blog/components/singleBlog/page.jsx";
import WritePage from "./blog/components/write/page.jsx";
import BlogHome from "./blog/pages/Home.page.jsx";
import BlogPage from "./blog/pages/blog/page.jsx";
import DeliveryChecker from "./components/order/DeliveryChecker.jsx";
import MyOrder from "./components/profile/MyOrder.jsx";
import SingleOrder from "./components/profile/SingleOrderDetails.jsx";
import "./index.css";
import AboutUs from "./pages/About.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderConfirmation from "./pages/ConfirmedOrder.jsx";
import ContactUs from "./pages/Contact.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import MyAccount from "./pages/MyAccount.jsx";
import MyProfile from "./pages/MyProfile.page.jsx";
import ProductsDetails from "./pages/ProductsDetails.jsx";
import Register from "./pages/Register.jsx";
import SearchingCategoryPage from "./pages/SearchingCategory.page.jsx";
import ShoppingPage from "./pages/ShoppingPage.jsx";
import Wishlist from "./pages/Wishlist.jsx";

export const router = createBrowserRouter([
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
        path: "/category/searching/:value",
        element: <SearchingCategoryPage />,
      },
      {
        path: "/shopping",
        element: <ShoppingPage />,
      },
      {
        path: "/products-details/:id",
        element: <ProductsDetails />,
      },
      {
        path : '/about',
        element : <AboutUs />
      },
      {
        path : '/contact',
        element : <ContactUs />
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
  {
    path: "/blog",
    element: (
        <BlogApp />
    ),
    children: [
      {
        path: "/blog",
        element: <BlogHome />,
      },
      {
        path: "/blog/blog-page",
        element: <BlogPage />,
      },
      {
        path: "/blog/blog-details/:blog_id",
        element: <SinglePage />,
      },
      {
        path: "/blog/login",
        element: <Login />,
      },
      {
        path: "/blog/signin",
        element: <Register />,
      },
      {
        path: "/blog/forgot-password",
        element: <ForgotPassword />,
      },
      
      {
        path: "/blog/write",
        element: <WritePage />,
      },
    ],
  },
  {
    
      path: "/api/v1/auth/reset-password/:tocken",
      element: <ResetPassword />,
    
  }
]);
