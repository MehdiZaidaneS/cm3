import { useState } from "react";
import { useNavigate } from "react-router-dom";
const AddProductPage = () => {

  const API_URL = "/api/products"
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    price: 0,
    stockQuantity: 0,
    supplier: {
      name: "",
      contactEmail: "",
      contactPhone: "",
      rating: 0,
    },
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name in form.supplier) {
      setForm({
        ...form,
        supplier: {
          ...form.supplier,
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

  const addProduct = async (body) => {
    
    const token = localStorage.getItem("token")
    try {
      const response = await fetch(`${API_URL}/`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      })
       
      if(!response.ok){
        console.error("Error adding product")
      }

      const data = await response.json()

      return data

    } catch (error) {
        console.error("Fail creating new product")
    }
  }

  const submitForm = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  
    addProduct(form)
    setForm({
      title: "",
      category: "",
      description: "",
      price: 0,
      stockQuantity: 0,
      supplier: {
        name: "",
        contactEmail: "",
        contactPhone: "",
        rating: 0,
      },
    });

    navigate("/")



  };

  return (
    <div className="create">
      <h2>Add a New Product</h2>
      <form onSubmit={submitForm}>
        <label>Product title:</label>
        <input
          type="text"
          required
          name="title"
          value={form.title}
          onChange={handleInputChange}
        />

        <label>Product category:</label>
        <select
          name="category"
          value={form.category}
          onChange={handleInputChange}
          required
        >
          <option value="">-- Select a category --</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Furniture">Furniture</option>
        </select>

        <label>Product Description:</label>
        <textarea
          name="description"
          required
          value={form.description}
          onChange={handleInputChange}
        ></textarea>

        <label>Product price:</label>
        <input
          type="number"
          name="price"
          required
          value={form.price}
          onChange={handleInputChange}
        />

        <label>Stock quantity:</label>
        <input
          type="number"
          name="stockQuantity"
          required
          value={form.stockQuantity}
          onChange={handleInputChange}
        />

        <label>Contact Name:</label>
        <input
          type="text"
          name="name"
          required
          value={form.supplier.name}
          onChange={handleInputChange}
        />

        <label>Contact Email:</label>
        <input
          type="email"
          name="contactEmail"
          required
          value={form.supplier.contactEmail}
          onChange={handleInputChange}
        />

        <label>Contact Phone:</label>
        <input
          type="text"
          name="contactPhone"
          required
          value={form.supplier.contactPhone}
          onChange={handleInputChange}
        />

        <label>Rating:</label>
        <input
          type="number"
          name="rating"
          required
          value={form.supplier.rating}
          onChange={handleInputChange}
        />

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProductPage;
