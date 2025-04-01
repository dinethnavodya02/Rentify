import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Rent_home from "./pages/Rent_home";
import Rent_create from "./pages/Rent_create";
import Rent_bookings from "./pages/Rent_bookings";
import Tool_bookings from "./pages/Tool_bookings";
import Tools_home from "./pages/Tool_home";
import Tool_view from "./pages/Tool_view";
import Tool_booking from "./pages/Tool_booking";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard_user" element={<Dashboard />} />
        <Route path="/rent_admin_home" element={<Rent_home />} />
        <Route path="/rent_create" element={<Rent_create />} />
        <Route path="/tools/:id" element={<Rent_create />} />
        <Route path="/tools/:toolId/bookings" element={<Rent_bookings />} />
        <Route path="/tools_home" element={<Tools_home />} />
        <Route path="/tools_home/:id" element={<Tool_view />} />
        <Route path="/booking/:id" element={<Tool_booking />} />
        <Route path="/booking" element={<Tool_bookings />} />
      </Routes>
    </Router>
  );
};

export default App;
