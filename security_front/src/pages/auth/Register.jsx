import React, { useState } from "react";
import { createUserAccount, verifyUserAccount } from "../../apis/api";
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
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [OTP, setOTP] = useState("");

  const validateEmail = (email) => {
    // Regex for validating email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
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
          setIsOTPModalOpen(true);

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
 
  const handleCloseModal = () => {
    setIsOTPModalOpen(false);
    
    setOTP(new Array(4).fill(""));
    setIsLoading(false);
  };

  const handleVerifyClick = async () => {

    setIsLoading(true);
    try {
      const response = await verifyUserAccount({ email: formData.email, otp: OTP });
      if (!response.data.success) {
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
        setIsOTPModalOpen(false);
        setFormData({
          username: "",
          email: "",
          phone: "",
          address: "",
          password: "",
        });
      }
    } catch (error) {
      console.error("Error sending verification code:", error);
      toast.error("Error sending verification code");
    } finally {
      setIsLoading(false);
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
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-1 ${
              passwordError ? "border-red-500" : ""
            }`}
            required
          />
          {passwordError && (
            <p className="text-red-500 text-center mt-1">{passwordError}</p>
          )}
          {/* <div className="flex items-center"> */}
          {/* <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-sm">
              Remember Password
            </label>
          </div> */}
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
      {isOTPModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <div className="flex flex-col items-center mb-6">
              <img
                src="/images/logo/logo.png"
                alt="VentureLed Logo"
                className="w-16 h-16"
              />
            </div>
            <h2 className="text-[25px] font-semibold mb-4 text-center">
              Verify Your Account with the OTP sent in your email.
            </h2>
            <input
              type="email"
              placeholder="OTP"
              value={OTP}
              onChange={(e) => setOTP(e.target.value)}
              className="w-full px-4 py-2 mb-4 border border-gray-500 rounded-md focus:outline-none focus:ring-1"
              required
            />
            <button
              onClick={handleVerifyClick}
              className={`w-full py-2 ${
                OTP
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-gray-300 cursor-not-allowed"
              } text-white rounded-md focus:outline-none focus:ring-1 mb-2`}
              disabled={!OTP || isLoading}
            >
              {isLoading ? (
                <>
                  <div class="text-center">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                </>
              ) : (
                "Verify"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
