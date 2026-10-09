import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/signin");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
      <div className="container">
        <span
          className="navbar-brand fw-semibold"
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (token) {
              navigate("/home");
            } else {
              navigate("/signin");
            }
          }}
        >
          MyApp
        </span>

        <div className="ms-auto">
          {token ? (
            <button
              className="btn btn-link text-dark text-decoration-none"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <button
              className="btn btn-link text-dark text-decoration-none"
              onClick={() => navigate("/signin")}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;