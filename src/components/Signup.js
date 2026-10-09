import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submit button clicked");
    console.log("Sending request:", formData);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );

      console.log(response.data);

      toast.success(response.data.message);

      // Clear the form
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
  console.log("Full Error:", error);
  console.log("Response:", error.response);
  console.log("Response Data:", error.response?.data);

  toast.error(
    error.response?.data?.message || error.message
  );
}
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow p-4">
            <h1 className="text-center mb-4">Signup</h1>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;