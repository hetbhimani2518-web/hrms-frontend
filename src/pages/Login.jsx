import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import api from "../api/axios";
import "../styles/login.css";

import {
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  CheckIcon,
  ErrorIcon
} from "../components/Icons";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();
  
  const emailValid = email.includes("@");
  const passwordValid = password.length >= 20;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-left">
        <div>
          <h1>HRMS</h1>
          <p>Human Resource Management System</p>
        </div>
        <p>Secure access to your organization</p>
        <p>© 2025 HRMS</p>
      </div>

      <div className="login-right">
        <div className="login-card">

          <h2>Welcome Back</h2>
          <p>Login to continue</p>

          {error && <div className="error-text">{error}</div>}

          <form onSubmit={handleLogin}>

            <div className="field-group">
              <label className="field-label">
                <MailIcon className="icon" /> Email
              </label>

              <div className="input-wrapper">
                <input
                  type="email"
                  className="field-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />

                {email && (
                  <span className={`validation-icon ${emailValid ? "success" : "error"}`}>
                    {emailValid ? <CheckIcon className="icon" /> : <ErrorIcon className="icon" />}
                  </span>
                )}
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">
                <LockIcon className="icon" /> Password
              </label>

              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  className="field-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />

                {password && (
                  <span className={`validation-icon ${passwordValid ? "success" : "error"}`}>
                    {passwordValid ? <CheckIcon className="icon" /> : <ErrorIcon className="icon" />}
                  </span>
                )}

                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="icon eye-animate rotate" />
                  ) : (
                    <EyeIcon className="icon eye-animate" />
                  )}
                </span>
              </div>
            </div>

            <button className="login-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
