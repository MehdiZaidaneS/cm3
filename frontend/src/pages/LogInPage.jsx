import { useState } from "react";

const LogInPage = ({setIsAuthenticated}) => {

    const API_URL = "/api/users"

    const [form, setForm] = useState({
        email: "",
        password: "",
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target
        setForm({
            ...form,
            [name]: value,
        });
    }

const logInUser = async (body) => {

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            }
        })

        if (!response.ok) {
            console.error("Error adding product")
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

    logInUser(form)
    setForm({

        email: "",
        password: "",
    
    });

    setIsAuthenticated(true);
    navigate("/");
};

return (
    <div className="create">
        <h2>Log In</h2>
        <form onSubmit={submitForm}>
            

            <label>Email:</label>
            <input
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

            <button type="submit">Submit</button>
        </form>
    </div>
);
};

export default LogInPage;
