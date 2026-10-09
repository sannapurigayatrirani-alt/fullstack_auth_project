import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle checkbox
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  // Handle Sign In
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Do nothing if checkbox is unchecked
    if (!isChecked) {
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/signin",
        formData
      );

      // Store JWT token
      localStorage.setItem("token", response.data.token);

      // Store user details
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.data)
      );

      toast.success("Login successful!");

      // Redirect to Home
      navigate("/home");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background:
          "linear-gradient(135deg, #eef2ff 0%, #f8fafc 50%, #e0f2fe 100%)",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-4">

            <div
              className="card border-0 shadow-lg"
              style={{
                borderRadius: "20px",
                overflow: "hidden",
              }}
            >

              {/* Header */}
              <div className="card-body p-4 p-md-5">

                <div className="text-center mb-4">

                  <div
                    className="d-inline-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "16px",
                      background:
                        "linear-gradient(135deg, #2563eb, #4f46e5)",
                      color: "white",
                      fontSize: "25px",
                    }}
                  >
                    🔐
                  </div>

                  <h2 className="fw-bold mb-2">
                    Welcome Back
                  </h2>

                  <p className="text-muted mb-0">
                    Sign in to continue to your account
                  </p>

                </div>

                <form onSubmit={handleSubmit}>

                  {/* Email */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      className="form-control form-control-lg"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{
                        borderRadius: "12px",
                      }}
                    />
                  </div>

                  {/* Password */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Password
                    </label>

                    <input
                      type="password"
                      name="password"
                      className="form-control form-control-lg"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      style={{
                        borderRadius: "12px",
                      }}
                    />
                  </div>

                  {/* Checkbox */}
                  <div
                    className="d-flex align-items-center gap-2 p-3 mb-4"
                    style={{
                      backgroundColor: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                    }}
                  >
                    <input
                      type="checkbox"
                      id="loginConfirm"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                      style={{
                        width: "18px",
                        height: "18px",
                        cursor: "pointer",
                      }}
                    />

                    <label
                      htmlFor="loginConfirm"
                      className="mb-0 text-secondary"
                      style={{
                        cursor: "pointer",
                        fontSize: "14px",
                      }}
                    >
                      I confirm that I want to sign in
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!isChecked || loading}
                    className="btn btn-lg w-100 fw-semibold"
                    style={{
                      borderRadius: "12px",
                      border: "none",
                      color: "white",
                      backgroundColor: isChecked
                        ? "#2563eb"
                        : "#9ca3af",
                      cursor:
                        isChecked && !loading
                          ? "pointer"
                          : "not-allowed",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </button>

                </form>

              </div>

              {/* Footer */}
              <div
                className="text-center py-3"
                style={{
                  backgroundColor: "#f8fafc",
                  borderTop: "1px solid #e2e8f0",
                }}
              >
                <small className="text-muted">
                  Secure authentication powered by JWT
                </small>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;