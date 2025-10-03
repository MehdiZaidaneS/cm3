import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationPage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    phone_number: "",
    gender: "",
    date_of_birth: "",
    membership_status: "",
    bio: "",
    address: "",
    profile_picture: "",
  });

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

 const API_URL = import.meta.env.VITE_API_URL + "/api/users";

const addUser = async (body) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message || "Error creating user");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
  const submitForm = async (e) => {
    e.preventDefault();
    const result = await addUser(form);

    if (result) {
      setIsAuthenticated(true);
      navigate("/");
    }
  };

  return (
    <div className="create">
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={submitForm}>
        <label>Name:</label>
        <input type="text" name="name" required value={form.name} onChange={handleInputChange} />

        <label>Username:</label>
        <input type="text" name="username" required value={form.username} onChange={handleInputChange} />

        <label>Password:</label>
        <input type="password" name="password" required value={form.password} onChange={handleInputChange} />

        <label>Phone Number:</label>
        <input type="text" name="phone_number" required value={form.phone_number} onChange={handleInputChange} />

        <label>Gender:</label>
        <select name="gender" required value={form.gender} onChange={handleInputChange}>
          <option value="">-- Select gender --</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>Date of Birth:</label>
        <input type="date" name="date_of_birth" required value={form.date_of_birth} onChange={handleInputChange} />

        <label>Membership Status:</label>
        <select name="membership_status" required value={form.membership_status} onChange={handleInputChange}>
          <option value="">-- Select status --</option>
          <option value="Basic">Basic</option>
          <option value="Premium">Premium</option>
        </select>

        <label>Address:</label>
        <input type="text" name="address" required value={form.address} onChange={handleInputChange} />


        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationPage;
