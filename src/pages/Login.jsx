import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/auth/login",
        { email, password }
      );

      login(res.data);

      // 🔀 Redirect by role
      if (res.data.roles.includes("ROLE_ADMIN")) {
        navigate("/admin");
      } else if (res.data.roles.includes("ROLE_HR")) {
        navigate("/hr");
      } else if (res.data.roles.includes("ROLE_MANAGER")) {
        navigate("/manager");
      } else {
        navigate("/employee");
      }

    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div>
      <h2>HRMS Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
