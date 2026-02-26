import { useSelector } from "react-redux";
import { Navigate, useRoutes } from "react-router-dom";
import CustomerLayout from "../Common/Layout/CustomerLayout/CustomerLayout";
import Home from "../Pages/Home/Home";
import ProfileOverview from "../Pages/ProfileOverview/ProfileOverview";
import EditProfile from "../Pages/EditProfile/EditProfile";
import Login from "../Common/Account/Login/Login";
import Register from "../Common/Account/Register/Register";
import ForgotPassword from "../Common/Account/ForgotPassword/ForgotPassword";
import Cart from "../Pages/Cart/Cart";
import About from "../Pages/About/About";
import Checkout from "../Pages/Checkout/Checkout";
import Journal from "../Pages/Journal/Journal";
import Contact from "../Pages/Contact/Contact";
import FAQ from "../Pages/FAQ/FAQ";
import ProductDetail from "../Pages/Product/ProductDetail";
import Shop from "../Pages/Shop/Shop";

const Routers = () => {
  const { isAuthenticated, user } = useSelector(
    (state) => state.auth || { isAuthenticated: false, user: null },
  );
  const isAdmin = user?.role === "admin";

  const routing = useRoutes([
    {
      path: "/",
      element: <CustomerLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "profile", element: <ProfileOverview /> },
        { path: "profile/edit", element: <EditProfile /> },
        { path: "cart", element: <Cart /> },
        { path: "about", element: <About /> },
        { path: "checkout", element: <Checkout /> },
        { path: "journal", element: <Journal /> },
        { path: "contact", element: <Contact /> },
        { path: "faq", element: <FAQ /> },
        { path: "product/:id", element: <ProductDetail /> },
        { path: "shop", element: <Shop /> },
      ],
    },

    {
      path: "/login",
      element: !isAuthenticated ? <Login /> : <Navigate to="/" />,
    },
    { path: "/register", element: <Register /> },
    { path: "/forgot-password", element: <ForgotPassword /> },

    { path: "*", element: <Navigate house to="/" /> },
  ]);

  return routing;
};

export default Routers;
