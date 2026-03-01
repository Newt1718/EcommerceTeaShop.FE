import { useSelector } from "react-redux";
import { useRoutes, Navigate } from "react-router-dom";
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
import NotFoundPage from "../Pages/NotFound/NotFoundPage";
import OurStory from "../Pages/OurStory/OurStory";
import Sustainability from "../Pages/Sustainability/Sustainability";
import TeaVerification from "../Pages/TeaVerification/TeaVerification";
import TeaExperts from "../Pages/TeaExperts/TeaExperts";
import ShippingPolicy from "../Pages/ShippingPolicy/ShippingPolicy";
import ReturnsRefund from "../Pages/ReturnsRefund/ReturnsRefund";
import JournalDetails from "../Pages/Journal/JournalDetails/JournalDetails";
import Layout from "../Common/Layout/Layout";
import Dashboard from "../Pages/Admin/Dashboard/Dashboard";
import Orders from "../Pages/Admin/Orders/Orders";
import ProductEdit from "../Pages/Admin/Products/ProductEdit";
import Products from "../Pages/Admin/Products/Products";

const Routers = () => {
  const { isAuthenticated, user } = useSelector(
    (state) => state.auth || { isAuthenticated: false, user: null },
  );
  //const isAdmin = user?.role === "admin";
  const isAdmin = true;

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
        { path: "journal/:id", element: <JournalDetails /> },
        { path: "contact", element: <Contact /> },
        { path: "faq", element: <FAQ /> },
        { path: "product/:id", element: <ProductDetail /> },
        { path: "shop", element: <Shop /> },
        { path: "our-story", element: <OurStory /> },
        { path: "sustainability", element: <Sustainability /> },
        { path: "tea-verification", element: <TeaVerification /> },
        { path: "tea-experts", element: <TeaExperts /> },
        { path: "shipping-policy", element: <ShippingPolicy /> },
        { path: "returns-refund", element: <ReturnsRefund /> },
      ],
    },
    {
      path: "/admin",
      element: isAdmin ? <Layout /> : <Navigate to="/login" />, 
      children: [
        { 
          index: true, 
          element: (
            <div className="p-10">
              <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-500 mt-2">Welcome to the TeaVault control center.</p>
            </div>
          ) 
        },
        { path: "dashboard", element: <Dashboard /> },
        { path: "orders", element: <Orders /> },
        { path: "products", element: <Products /> },
        { path: "products/edit", element: <ProductEdit /> },
        { path: "products/add", element: <ProductEdit /> }
      ],
    },
    {
      path: "/login",
      element: !isAuthenticated ? <Login /> : <Navigate to="/" />,
    },
    { path: "/register", element: <Register /> },
    { path: "/forgot-password", element: <ForgotPassword /> },

    { path: "*", element: <NotFoundPage /> },
  ]);

  return routing;
};

export default Routers;
