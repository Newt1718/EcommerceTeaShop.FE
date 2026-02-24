import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout"; 
import CustomerLayout from "./CustomerLayout"; 
import Login from "./Login/Login.js";
import Home from "./Pages/Home.js";
import Register from "./Login/Register.js";

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC SHOP ROUTES */}
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<Home />} />
        </Route>

        {/* ADMIN BACKEND ROUTES */}
        <Route path="/admin" element={<Layout />}>
          {/* We will add the dashboard pages back in here later! */}
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;