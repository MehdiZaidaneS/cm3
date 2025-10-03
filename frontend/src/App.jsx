import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// pages & components
import Home from "./pages/HomePage";
import AddProductPage from "./pages/AddProductPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage"
import RegistrationPage from "./pages/RegistrationPage";
import LogInPage from "./pages/LogInPage";
import { useState } from "react";
import ProductPage from "./pages/ProductPage";
import EditProductPage from "./pages/EditProductPage";


const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(
  !!localStorage.getItem("token") // convert string → boolean
);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
        <div className="content">
          <Routes>
            <Route path="/register"
              element={isAuthenticated ? <Navigate to="/" /> : <RegistrationPage  setIsAuthenticated={setIsAuthenticated}/>}
            />
            <Route path="/login" 
               element={isAuthenticated ? <Navigate to="/" /> : <LogInPage setIsAuthenticated={setIsAuthenticated}/>} />
            <Route path="/" 
                element={!isAuthenticated ? <Navigate to= "/login"/> : <Home />} />
            <Route path="/add-job" element={<AddProductPage />} />
            <Route path="/products/:id" element={<ProductPage isAuthenticated={isAuthenticated}/>} />
            <Route path='*' element={<NotFoundPage />} />
            <Route path="/edit-product/:id" element={<EditProductPage isAuthenticated={isAuthenticated}/>} />
            
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
