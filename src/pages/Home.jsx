import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getHomeData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/signin");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/home",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMessage(response.data.message);
        setUser(response.data.user);
      } catch (error) {
        console.error("Home API Error:", error);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/signin");
      } finally {
        setLoading(false);
      }
    };

    getHomeData();
  }, [navigate]);

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="container mt-5 text-center">
          <p>Checking authentication...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">

            <h1 className="text-center mb-4">
              Home
            </h1>

            <div className="card">
              <div className="card-body">

                <h4 className="mb-3">
                  Welcome!
                </h4>

                <p>
                  {message}
                </p>

                {user && (
                  <div className="mt-4">
                    <p>
                      <strong>Email:</strong>{" "}
                      {user.email}
                    </p>

                    <p>
                      <strong>User ID:</strong>{" "}
                      {user.id}
                    </p>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Home;