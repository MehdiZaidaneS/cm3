import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogInPage = ({ setIsAuthenticated }) => {
  const API_URL = "/api/users";
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const logInUser = async (body) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Error logging in user");
        return null;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      console.error("Failed to log in user", error);
      return null;
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);

    const result = await logInUser(form);

    if (result) {
      setIsAuthenticated(true);
      navigate("/");
    }

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
