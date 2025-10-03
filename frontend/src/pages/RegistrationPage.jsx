import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationPage = ({ setIsAuthenticated }) => {

    const API_URL = "/api/users"

    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        bio: "",
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target
        setForm({
            ...form,
            [name]: value,
        });
    }

    const addUser = async (body) => {

        try {
            const response = await fetch(`${API_URL}/signup`, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                }
            })

            if (!response.ok) {
                console.error("Error creating user")
            }

            const data = await response.json()

            localStorage.setItem("token", data.token)

            return data

        } catch (error) {
            console.error("Fail creating new product")
        }
    }

    const submitForm = (e) => {
        e.preventDefault();
        console.log("Form submitted:", form);

        addUser(form)
        setForm({
            name: "",
            email: "",
            password: "",
            role: "",
            bio: "",
        });
        setIsAuthenticated(true);
        navigate("/");
    };

    return (
        <div className="create">
            <h2>Register</h2>
            <form onSubmit={submitForm}>
                <label>Name:</label>
                <input
                    type="text"
                    required
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                />

                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleInputChange}
                ></input>

                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    required
                    value={form.password}
                    onChange={handleInputChange}
                />

                <label>Role</label>
                <select
                    name="role"
                    required
                    value={form.role} // controls the current selection
                    onChange={handleInputChange}
                >
                    <option value="Admin">Admin</option>
                    <option value="Seller">Seller</option>
                    <option value="Buyer">Buyer</option>
                </select>


                <label>Bio:</label>
                <textarea
                    type="text"
                    name="bio"
                    required
                    value={form.bio}
                    onChange={handleInputChange}
                />


                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default RegistrationPage;
