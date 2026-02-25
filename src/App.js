import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout"; 
import CustomerLayout from "./CustomerLayout"; 
import Login from "./Login/Login.js";
import Home from "./Pages/Home.js";
import Register from "./Login/Register.js";
import ProfileOverview from "./Pages/ProfileOverview.js";
import EditProfile from "./Pages/EditProfile.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<Home />} />
          <Route path="/profile" element={<ProfileOverview />} />
          <Route path="profile/edit" element={<EditProfile />} />
        </Route>

        <Route path="/admin" element={<Layout />}>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </Router>
  );
}

export default App;