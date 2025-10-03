import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddJobPage = () => {
  const navigate = useNavigate();

  // Use environment variable for backend URL
  const API_BASE_URL = import.meta.env.VITE_API_URL || "";

  const [form, setForm] = useState({
    title: "",
    type: "",
    description: "",
    location: "",
    salary: 0,
    experienceLevel: "Entry",
    applicationDeadline: "",
    requirements: [],
    company: {
      name: "",
      contactEmail: "",
      contactPhone: "",
      website: "",
      size: 0,
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name in form.company) {
      setForm({
        ...form,
        company: {
          ...form.company,
          [name]: value,
        },
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const addJob = async (body) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_BASE_URL}/api/jobs`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Error adding job");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to create job:", error);
      return null;
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const result = await addJob(form);
    if (result) {
      // Reset form
      setForm({
        title: "",
        type: "",
        description: "",
        location: "",
        salary: 0,
        experienceLevel: "Entry",
        applicationDeadline: "",
        requirements: [],
        company: {
          name: "",
          contactEmail: "",
          contactPhone: "",
          website: "",
          size: 0,
        },
      });

      navigate("/");
    }
  };

  return (
    <div className="create">
      <h2>Post a New Job</h2>
      <form onSubmit={submitForm}>
        <label>Job Title:</label>
        <input type="text" required name="title" value={form.title} onChange={handleInputChange} />

        <label>Job Type:</label>
        <select name="type" value={form.type} onChange={handleInputChange} required>
          <option value="">-- Select type --</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
        </select>

        <label>Job Description:</label>
        <textarea name="description" required value={form.description} onChange={handleInputChange}></textarea>

        <label>Location:</label>
        <input type="text" name="location" required value={form.location} onChange={handleInputChange} />

        <label>Salary:</label>
        <input type="number" name="salary" required value={form.salary} onChange={handleInputChange} />

        <label>Experience Level:</label>
        <select name="experienceLevel" value={form.experienceLevel} onChange={handleInputChange}>
          <option value="Entry">Entry</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
        </select>

        <label>Application Deadline:</label>
        <input type="date" name="applicationDeadline" value={form.applicationDeadline} onChange={handleInputChange} />

        <h3>Company Info</h3>
        <label>Company Name:</label>
        <input type="text" name="name" required value={form.company.name} onChange={handleInputChange} />

        <label>Company Email:</label>
        <input type="email" name="contactEmail" required value={form.company.contactEmail} onChange={handleInputChange} />

        <label>Company Phone:</label>
        <input type="text" name="contactPhone" required value={form.company.contactPhone} onChange={handleInputChange} />

        <label>Website:</label>
        <input type="text" name="website" value={form.company.website} onChange={handleInputChange} />

        <label>Company Size (employees):</label>
        <input type="number" name="size" value={form.company.size} onChange={handleInputChange} />

        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default AddJobPage;
