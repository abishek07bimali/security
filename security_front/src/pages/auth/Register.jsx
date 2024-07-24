import React, { useState } from "react";
import { createUserAccount } from "../../apis/api";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    // Regex for validating email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate email and password
    const isEmailValid = validateEmail(formData.email);
    const isPasswordValid = validatePassword(formData.password);

    if (!isEmailValid) {
      setEmailError("Please enter a valid email address.");
      return;
    } else {
      setEmailError("");
    }

    if (!isPasswordValid) {
      setPasswordError(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character."
      );
      return;
    } else {
      setPasswordError("");
    }

    setLoading(true);
    setError(null);

    try {
      createUserAccount(formData).then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          setFormData({
            username: "",
            email: "",
            phone: "",
            address: "",
            password: "",
          });
        } else {
          toast.error(response.data.message);
        }
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-2 sm:p-4 lg:p-6">
      <div className="bg-white p-8 rounded-lg shadow-md xss:w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 border border-black">
        <div className="flex flex-col items-center mb-6">
          <img
            src="/images/logo/logo.png"
            alt="VentureLed Logo"
            className="w-16 h-16"
          />
          <h1 className="text-2xl font-bold text-red-500">VentureLed</h1>
        </div>
        <h2 className="text-xl font-semibold text-center mb-6">
          Get Started with Ventureled
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 justify-center">
          <input
            type="text"
            name="username"
            placeholder="Full Name"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-1"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-1"
            required
          />
          <input
            type="number"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-1"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-1"
            required
          />
          <input
            type="password"
            placeholder="Password"
            // value={formData.password}
            onChange={(e) => handleChange}
            className={`w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-1 ${
              passwordError ? "border-red-500" : ""
            }`}
            required
          />
          {passwordError && (
            <p className="text-red-500 text-center mt-1">{passwordError}</p>
          )}
          <div className="flex items-center">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-sm">
              Remember Password
            </label>
          </div>
          <button
            type="submit"
            className="w-1/3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-1 mx-auto block text-[20px]"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          <p className="font-normal text-center mt-4">
            By signing up, I agree to the{" "}
            <a href="#" className="text-red-500 font-semibold">
              Terms of Use
            </a>{" "}
            and{" "}
            <a href="#" className="text-red-500 font-semibold">
              Privacy Policy
            </a>
          </p>
        </form>
        <div className="flex justify-center items-center mt-4 text-sm">
          <span className="text-[15px]">
            Already have an account?{" "}
            <a href="/login" className="text-red-500 font-semibold">
              Login
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
