import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

// pages & components
import Home from "./pages/HomePage";
import AddJobPage from "./pages/AddJobPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage";
import RegistrationPage from "./pages/RegistrationPage";
import LogInPage from "./pages/LogInPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import EditJobPage from "./pages/EditJobPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token") // convert string → boolean
  );

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        <div className="content">
          <Routes>
            <Route
              path="/register"
              element={
                isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <RegistrationPage setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <LogInPage setIsAuthenticated={setIsAuthenticated} />
                )
              }
            />
            <Route
              path="/"
              element={
                !isAuthenticated ? <Navigate to="/login" /> : <Home />
              }
            />
            <Route path="/jobs/add" element={<AddJobPage />} />
            <Route
              path="/jobs/:id"
              element={<JobDetailsPage isAuthenticated={isAuthenticated} />}
            />
            <Route
              path="/jobs/edit/:id"
              element={<EditJobPage isAuthenticated={isAuthenticated} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
