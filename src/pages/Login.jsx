import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import api from "../api/axios";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      login(res.data);

      if (res.data.roles.includes("ROLE_ADMIN")) {
        navigate("/admin");
      } else if (res.data.roles.includes("ROLE_HR")) {
        navigate("/hr");
      } else if (res.data.roles.includes("ROLE_MANAGER")) {
        navigate("/manager");
      } else {
        navigate("/employee");
      }

    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
           
      <div className="hidden lg:flex w-1/2 bg-indigo-600 text-white p-12 flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold">HRMS</h1>
          <p className="mt-2 text-indigo-200">
            Human Resource Management System
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold leading-snug">
            Manage People.<br />Manage Growth.
          </h2>
          <p className="mt-4 text-indigo-200 max-w-md">
            A modern platform to manage employees, roles,
            authentication, and organizational growth securely.
          </p>
        </div>

        <p className="text-sm text-indigo-200">
          © 2026 HRMS Platform
        </p>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">

          <h2 className="text-2xl font-bold text-slate-800">
            Welcome Back,
          </h2>
          <p className="text-slate-500 mt-1">
            Login to your account
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="admin@hrms.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700
                         text-white py-2 rounded-lg font-semibold
                         transition duration-200"
            >
              Login
            </button>

          </form>
        </div>
      </div>

    </div>
  );
}

export default Login;
