import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogInPage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  // Environment-aware backend URL
  const API_BASE_URL = import.meta.env.VITE_API_URL || "";

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const logInUser = async (body) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Error logging in user");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      return data;
    } catch (error) {
      console.error("Failed to log in user:", error);
      return null;
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const result = await logInUser(form);

    if (result) {
      setIsAuthenticated(true);
      navigate("/");
    }

    // Reset form
    setForm({
      email: "",
      password: "",
    });
  };

  return (
    <div className="create">
      <h2>Log In</h2>
      <form onSubmit={submitForm}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          required
          value={form.email}
          onChange={handleInputChange}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          required
          value={form.password}
          onChange={handleInputChange}
        />

        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LogInPage;
