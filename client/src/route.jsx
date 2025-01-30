import "./index.css";
import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import { lazy, Suspense } from "react";
import FetchingLoading from "./components/cart/FetchingLoading.jsx";
import Loader from "./components/cart/Loader.jsx";

// that types of imports are lazy loading, which means they are loaded only when they are needed.

const Admin = lazy(() => import("./admin/Admin.jsx"));
const SinglePage = lazy(() => import("./blog/components/singleBlog/page.jsx"));
const WritePage = lazy(() => import("./blog/components/write/page.jsx"));
const BlogHome = lazy(() => import("./blog/pages/Home.page.jsx"));
const BlogPage = lazy(() => import("./blog/pages/blog/page.jsx"));
const AnalyticsPage = lazy(() => import("./admin/pages/AnalyticsPage.jsx"));
const OrdersPage = lazy(() => import("./admin/pages/OrdersPage.jsx"));
const OverviewPage = lazy(() => import("./admin/pages/OverviewPage.jsx"));
const ProductsPage = lazy(() => import("./admin/pages/ProductsPage.jsx"));
const SalesPage = lazy(() => import("./admin/pages/SalesPage.jsx"));
const SettingsPage = lazy(() => import("./admin/pages/SettingsPage.jsx"));
const UsersPage = lazy(() => import("./admin/pages/UsersPage.jsx"));
const BlogApp = lazy(() => import("./blog/Blog.jsx"));
const ForgotPassword = lazy(() => import("./blog/components/authentication/ForgotPassword.jsx"));
const ResetPassword = lazy(() => import("./blog/components/authentication/ResetPassword.jsx"));
const DeliveryChecker = lazy(() => import("./components/order/DeliveryChecker.jsx"));
const MyOrder = lazy(() => import("./components/profile/MyOrder.jsx"));
const SingleOrder = lazy(() => import("./components/profile/SingleOrderDetails.jsx"));
const AboutUs = lazy(() => import("./pages/About.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
const Checkout = lazy(() => import("./pages/Checkout.jsx"));
const OrderConfirmation = lazy(() => import("./pages/ConfirmedOrder.jsx"));
const ContactUs = lazy(() => import("./pages/Contact.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const MyAccount = lazy(() => import("./pages/MyAccount.jsx"));
const MyProfile = lazy(() => import("./pages/MyProfile.page.jsx"));
const ProductsDetails = lazy(() => import("./pages/ProductsDetails.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const SearchingCategoryPage = lazy(() => import("./pages/SearchingCategory.page.jsx"));
const ShoppingPage = lazy(() => import("./pages/ShoppingPage.jsx"));
const Wishlist = lazy(() => import("./pages/Wishlist.jsx"));
const About = lazy(() => import('./blog/pages/About.page.jsx'))

const fallbackHandler = () => {
  return <Loader />
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App /> ,
    children: [
      {
        path: "/",
        element: <Home /> ,
      },
      {
        path: "/login",
        element: <Suspense fallback = {fallbackHandler} > <Login /> </Suspense>,
      },
      {
        path: "/signup",
        element: <Suspense fallback = {fallbackHandler} > <Register /> </Suspense>,
      },

      {
        path: "/cart",
        element: <Suspense fallback = {fallbackHandler} > <Cart /> </Suspense> ,
      },
      {
        path: "/wishlist",
        element: <Suspense fallback = {fallbackHandler} > <Wishlist /> </Suspense> ,
      },
      {
        path: "/checkout",
        element: <Suspense fallback = {fallbackHandler} > <Checkout /> </Suspense> ,
      },
      {
        path: "/order-confirmation",
        element: <Suspense fallback = {fallbackHandler} > <OrderConfirmation /> </Suspense> ,
      },
      {
        path: "/orderDetails/:id",
        element: <Suspense fallback = {fallbackHandler} > <SingleOrder /> </Suspense> ,
      },
      {
        path: "/category/searching/:value",
        element: <Suspense fallback = {fallbackHandler} > <SearchingCategoryPage /> </Suspense> ,
      },
      {
        path: "/shopping",
        element: <Suspense fallback = {fallbackHandler} > <ShoppingPage /> </Suspense> ,
      },
      {
        path: "/products-details/:id",
        element: <Suspense fallback = {fallbackHandler} > <ProductsDetails /> </Suspense> ,
      },
      {
        path : '/about',
        element :<Suspense fallback = {fallbackHandler} >  <AboutUs /> </Suspense> 
      },
      {
        path : '/contact',
        element :<Suspense fallback = {fallbackHandler} >  <ContactUs /> </Suspense> 
      },
      {
        path: "/my-account",
        element: <Suspense fallback = {fallbackHandler} > <MyAccount /> </Suspense> ,
        children: [
          {
            path: "/my-account/wishlist",
            element: <Suspense fallback = {fallbackHandler} > <Wishlist /> </Suspense> ,
          },
          {
            path: "/my-account/my-orders",
            element: <Suspense fallback = {fallbackHandler} > <MyOrder /> </Suspense> ,
          },
          {
            path: "/my-account/my-info",
            element: <Suspense fallback = {fallbackHandler} > <MyProfile /> </Suspense> ,
          },
          {
            path: "/my-account/address",
            element: <Suspense fallback = {fallbackHandler} > <DeliveryChecker /> </Suspense> ,
          },
        ],
      },
    ],
  },
  {
    path: "/admin/dashboard",
    element: <Suspense fallback = {fallbackHandler} > <Admin /> </Suspense> ,
    children: [
      {
        path: "/admin/dashboard/products",
        element: <Suspense fallback = {fallbackHandler} > <ProductsPage /> </Suspense> ,
      },
      {
        path: "/admin/dashboard/orders",
        element: <Suspense fallback = {fallbackHandler} > <OrdersPage /> </Suspense> ,
      },
      {
        path: "/admin/dashboard/overview",
        element: <Suspense fallback = {fallbackHandler} > <OverviewPage /> </Suspense> ,
      },
      {
        path: "/admin/dashboard/users",
        element: <Suspense fallback = {fallbackHandler} > <UsersPage /> </Suspense> ,
      },
      {
        path: "/admin/dashboard/settings",
        element: <Suspense fallback = {fallbackHandler} > <SettingsPage /> </Suspense> ,
      },
      {
        path: "/admin/dashboard/sales",
        element: <Suspense fallback = {fallbackHandler} > <SalesPage /> </Suspense> ,
      },
      {
        path: "/admin/dashboard/analytics",
        element: <Suspense fallback = {fallbackHandler} > <AnalyticsPage /> </Suspense> ,
      },
    ],
  },
  {
    path: "/blog",
    element: (
         <Suspense fallback = {fallbackHandler} > <BlogApp /> </Suspense> 
    ),
    children: [
      {
        path: "/blog",
        element: <Suspense fallback = {fallbackHandler} > <BlogHome /> </Suspense> ,
      },
      {
        path : '/blog/about',
        element : <Suspense fallback = {fallbackHandler} >  <About /> </Suspense>
      },
      {
        path: "/blog/blog-page",
        element: <Suspense fallback = {fallbackHandler} > <BlogPage /> </Suspense> ,
      },
      {
        path: "/blog/blog-details/:blog_id",
        element: <Suspense fallback = {fallbackHandler} > <SinglePage /> </Suspense> ,
      },
      {
        path: "/blog/login",
        element: <Suspense fallback = {fallbackHandler} > <Login /> </Suspense> ,
      },
      {
        path: "/blog/signin",
        element: <Suspense fallback = {fallbackHandler} > <Register /> </Suspense> ,
      },
      {
        path: "/blog/forgot-password",
        element: <Suspense fallback = {fallbackHandler} > <ForgotPassword /> </Suspense> ,
      },
      
      {
        path: "/blog/write",
        element: <Suspense fallback = {fallbackHandler} > <WritePage /> </Suspense> ,
      },
    ],
  },
  {
    
      path: "/api/v1/auth/reset-password/:tocken",
      element: <Suspense fallback = {fallbackHandler} > <ResetPassword /> </Suspense> ,
    
  }
]);
