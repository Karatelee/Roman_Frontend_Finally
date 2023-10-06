import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import "../scss/styles.scss";
// import "@/Login.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(!!user);

    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
  }, []);

  const onSubmit = (data) => {
    axios
      .post(`http://localhost:8000/auth/jwt/create/`, data)
      .then((res) => {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        axios
          .get(`http://localhost:8000/auth/users/me/`, {
            headers: {
              Authorization: `Bearer ${res.data.access}`,
            },
          })
          .then((res) => {
            localStorage.setItem("user", JSON.stringify(res.data));
            window.location.href = "/";
          });
      })
      .catch((err) => console.error(err));
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <h1>Login</h1>
        {isLoggedIn ? (
          <div>
            <p>User is logged in!</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <input
              className="login-input"
              type="text"
              placeholder="Username"
              {...register("username", { required: true })}
            />
            <input
              className="login-input"
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            <button className="login-button" type="submit">
              Login
            </button>
            <NavLink className="login-button" to="/register">
              Register
            </NavLink>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;