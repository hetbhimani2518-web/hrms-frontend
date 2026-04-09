import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import api from "../api/axios";
import ThemeToggle from "../theme/ThemeToggle";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login, auth } = useAuth();

  useEffect(() => {
    if (auth?.roles) {
      if (auth.roles.includes("ROLE_ADMIN")) navigate("/admin");
      else if (auth.roles.includes("ROLE_HR")) navigate("/hr");
      else if (auth.roles.includes("ROLE_MANAGER")) navigate("/manager");
      else navigate("/employee");
    }
  }, [auth, navigate]);

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
    // <div className="login-page">
    //   <div className="login-container">        

    //     <div className="login-left">
    //       <div className="login-left-content">
    //         <h1>HRMS Portal</h1>
    //         <p>Manage employees, roles & growth securely</p>
    //       </div>
    //     </div>

    //     <div className="login-right">
    //       <div className="login-card">
    //         <h2>Welcome Back!</h2>
    //         <p>Sign in To Continue</p>

    //         {error && <div className="error-text">{error}</div>}

    //         <form onSubmit={handleLogin}>
    //           <div className="field-group">
    //             <label className="field-label">Email</label>
    //             <input
    //               className="field-input"
    //               type="email"
    //               value={email}
    //               onChange={(e) => setEmail(e.target.value)}
    //               disabled={loading}
    //               required
    //             />
    //           </div>

    //           <div className="field-group">
    //             <label className="field-label">Password</label>

    //             <div className="input-wrapper">
    //               <input
    //                 className="field-input"
    //                 type={showPassword ? "text" : "password"}
    //                 value={password}
    //                 onChange={(e) => setPassword(e.target.value)}
    //                 disabled={loading}
    //                 required
    //               />

    //               <span
    //                 className="toggle-password"
    //                 onClick={() => setShowPassword(!showPassword)}
    //               >
    //                 {showPassword ? <EyeOffIcon /> : <EyeIcon />}
    //               </span>
    //             </div>
    //           </div>

    //           <button className="login-button" disabled={loading}>
    //             {loading ? "Signing in..." : "Sign in"}
    //           </button>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="login-page">
      <div style={{ position: "absolute", top: "20px", right: "20px", zIndex: 10 }}>
        <ThemeToggle />
      </div>
      <div className="login-shell">
        <div className="login-container">
          {/* Left visual section */}
          <div className="login-left">
            <div className="login-left-content">
              <h1>HRMS Portal</h1>
              <p>Manage employees, roles &amp; growth securely</p>
            </div>
          </div>

          {/* Right form section */}
          <div className="login-right">
            <div className="login-card">
              <header className="login-header">
                <h2>Welcome Back!</h2>
                <p>Sign in to continue</p>
              </header>

              {error && <div className="error-text">{error}</div>}

              <form onSubmit={handleLogin} className="login-form">
                <div className="field-group">
                  <label className="field-label">Email</label>
                  <input
                    className="field-input glass-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    required
                    placeholder="you@example.com"
                  />
                </div>

                <div className="field-group">
                  <label className="field-label">Password</label>
                  <div className="input-wrapper">
                    <input
                      className="field-input glass-input"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      required
                      placeholder="Enter your password"
                    />

                    <button
                      type="button"
                      className="toggle-password text-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <button
                  className="login-button"
                  disabled={loading}
                  type="submit"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;