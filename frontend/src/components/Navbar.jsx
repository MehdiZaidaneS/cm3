import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Navbar = ({isAuthenticated, setIsAuthenticated}) => {

  const navigate = useNavigate()

 const handleOnClick = () => {
  localStorage.removeItem("token");
  setIsAuthenticated(false);
  navigate("/login");
};


  return (
    <nav className="navbar">
      <h1>Product Search</h1>
      <div className="links">
        {
          isAuthenticated ?
            <>
              <Link to="/">Home</Link>
              <Link to="/add-job">Add Product</Link>
              <button onClick={handleOnClick}>Log out</button>
            </>
            :
            <>
              <Link to="/register">Register</Link>
              <Link to="/login">Log In</Link>
            </>

        }

      </div>
    </nav>
  );
}

export default Navbar;


/* import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const handleClick = (e) => {
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <h1>React Jobs</h1>
      </Link>
      <div className="links">
        {isAuthenticated && (
          <div>
            <Link to="/jobs/add-job">Add Job</Link>
            <span>{JSON.parse(localStorage.getItem("user")).email}</span>
            <button onClick={handleClick}>Log out</button>
          </div>
        )}
        {!isAuthenticated && (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
 */