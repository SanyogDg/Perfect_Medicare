import React, { useContext, useState } from 'react'
import {Context} from "../main"
import axios from 'axios';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';

export const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:3004/api/v1/user/login",
          { email, password, role: "Admin" },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <> <section className="container form-component">
    <img src="/logo.png" alt="logo" className="logo lcss" />
    <h1 className="form-title">WELCOME TO Perfect MediCare</h1>
    <p>Only Admins Are Allowed To Access!</p>
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div style={{ justifyContent: "center", alignItems: "center" }}>
        <button type="submit">Login</button>
      </div>
    </form>
  </section></>
  )
}
