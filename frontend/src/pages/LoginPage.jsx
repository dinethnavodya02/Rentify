import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );
      const { token, userType } = res.data;
      localStorage.setItem("token", token);

      alert("Login successful!");

      if (userType === "admin") {
        navigate("/rent_admin_home");
      } else {
        navigate("/tools_home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white shadow-lg rounded-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input
          className="border p-2 w-full mb-4 rounded"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          className="border p-2 w-full mb-6 rounded"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-[#6A9C89] text-white p-2 rounded w-full hover:bg-[#5a8e74] transition"
        >
          {loading ? <Spinner /> : "Login"}
        </button>
        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-[#6A9C89] cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
