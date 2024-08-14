import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  ResetPassword,
  createLoginAccount,
  verifyEmailForget,
  verifyOTPForget,
} from "../../apis/api";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleForgotPasswordClick = (event) => {
    event.preventDefault();
    setIsEmailModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEmailModalOpen(false);
    setIsOtpModalOpen(false);
    setIsPasswordModalOpen(false);
    setEmail("");
    setConfirmPassword("");
    setNewPassword("");
    setPasswordMatchError("");
    setOtp(new Array(4).fill(""));
    setIsLoading(false);
  };

  const validateEmail = (email) => {
    // Regex for validating email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{2,}$/;
    return passwordRegex.test(password);
  };

  const handleVerifyClick = async () => {
    if (!captchaToken) {
      toast.error("Please complete the CAPTCHA");
      return;
    }
    const token = await captchaToken.executeAsync();

    setIsLoading(true);
    try {
      const response = await verifyEmailForget({ email, recaptchaToken: token });
      if (!response.data.success) {
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
        setIsOtpModalOpen(true);
      }
      setIsEmailModalOpen(false);
    } catch (error) {
      console.error("Error sending verification code:", error);
      toast.error("Error sending verification code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const otpCode = otp.join("");
      const response = await verifyOTPForget({ email, otp: otpCode });

      if (!response.data.success) {
        toast.error(response.data.message || "Failed to verify OTP");
      } else {
        toast.success(response.data.message);
        setIsOtpModalOpen(false);
        setIsPasswordModalOpen(true);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Error verifying OTP");
    }
  };

  const handleSavePassword = async () => {
    if (newPassword === confirmPassword) {
      try {
        ResetPassword(JSON.stringify({ email, newPassword })).then(
          (response) => {
            if (!response.data.success) {
              toast.error(response.data.message || "Failed to reset password");
            } else {
              toast.success(
                response.data.message || "Failed to reset password"
              );
              handleCloseModal();
            }
          }
        );
      } catch (error) {
        console.error("Error resetting password:", error);
        toast.error("Error resetting password");
      }
    } else {
      setPasswordMatchError("Passwords do not match.");
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!captchaToken) {
      toast.error("Please complete the CAPTCHA");
      return;
    }
    const token = await captchaToken.executeAsync();


    // Validate email and password
    const isEmailValid = validateEmail(emailLogin);
    const isPasswordValid = validatePassword(passwordLogin);

    if (!isEmailValid) {
      setEmailError("Please enter a valid email address.");
      return;
    } else {
      setEmailError("");
    }

    // if (!isPasswordValid) {
    //   setPasswordError(
    //     "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character."
    //   );
    //   return;
    // } else {
    //   setPasswordError("");
    // }

    setIsLoading(true);
    try {
      const response = await createLoginAccount({
        email: emailLogin,
        password: passwordLogin,
        recaptchaToken: token
      });
      if (!response.data.success) {
        toast.error(response.data.message || "Invalid email or password");
      } else {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        if (!response.data.data.isAdmin) {
          navigate("/");
          window.location.reload();
        } else {
          navigate("/dashboard");
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setLoginError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleChangeOtp = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-2 sm:p-6 lg:p-8">
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
          Get Started with VentureLed
        </h2>
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={emailLogin}
            onChange={(e) => setEmailLogin(e.target.value)}
            className={`w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-1 ${
              emailError ? "border-red-500" : ""
            }`}
            required
          />
          {emailError && (
            <p className="text-red-500 text-center mt-1">{emailError}</p>
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={passwordLogin}
            onChange={(e) => setPasswordLogin(e.target.value)}
            className={`w-full px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-1 ${
              passwordError ? "border-red-500" : ""
            }`}
            required
          />
          {passwordError && (
            <p className="text-red-500 text-center mt-1">{passwordError}</p>
          )}
             <div className="mt-6  w-full">
              <ReCAPTCHA
                sitekey="6LfrjiUqAAAAAJbLINUKVlWJelSmkleQUfaDF2A2"  // Replace with your reCAPTCHA v3 Site Key
                size="invisible"
                ref={(el) => setCaptchaToken(el)}
              />
            </div>
          <div className="flex items-center">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-sm">
              Remember Password
            </label>
          </div>
          <div className="text-right">
            <a
              href="#"
              onClick={handleForgotPasswordClick}
              className="text-red-500 font-semibold"
            >
              Forget Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-1/2 sm:w-1/3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-1 mx-auto block text-lg"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          {loginError && (
            <p className="text-red-500 text-center mt-2">{loginError}</p>
          )}
        </form>
        <div className="flex justify-center items-center mt-4 text-sm">
          <span className="text-[15px]">
            Don’t have an account?{" "}
            <a href="/register" className="text-red-500 font-semibold">
              Sign Up
            </a>
          </span>
        </div>
      </div>

      {isEmailModalOpen && (
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
              Recover Your Account
            </h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleChangeEmail}
              className="w-full px-4 py-2 mb-4 border border-gray-500 rounded-md focus:outline-none focus:ring-1"
              required
            />
            <div className="mt-6  w-full">
              <ReCAPTCHA
                sitekey="6LfrjiUqAAAAAJbLINUKVlWJelSmkleQUfaDF2A2"  // Replace with your reCAPTCHA v3 Site Key
                size="invisible"
                ref={(el) => setCaptchaToken(el)}
              />
            </div>
            <button
              onClick={handleVerifyClick}
              className={`w-full py-2 ${
                email
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-gray-300 cursor-not-allowed"
              } text-white rounded-md focus:outline-none focus:ring-1 mb-2`}
              disabled={!email || isLoading}
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
            <div className="flex justify-center items-center mt-4 text-sm">
              <span className="text-[15px]">
                Remembered account?{" "}
                <button
                  onClick={handleCloseModal}
                  className="text-red-500 font-semibold"
                >
                  Login
                </button>
              </span>
            </div>
          </div>
        </div>
      )}

      {isOtpModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <h2 className="text-[25px] font-bold mb-4 text-center">
              Verify that the Email belongs to you
            </h2>
            <div className="flex justify-center space-x-2 mb-4">
              {otp.map((data, index) => (
                <input
                  type="text"
                  maxLength="1"
                  key={index}
                  value={data}
                  onChange={(e) => handleChangeOtp(e.target, index)}
                  onFocus={(e) => e.target.select()}
                  className="w-12 h-12 px-2 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-1 text-center"
                  required
                />
              ))}
            </div>
            <button
              onClick={handleOtpSubmit}
              className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-1 mb-2"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {isPasswordModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <h2 className="text-[20px] font-bold mb-4 text-center">
              Enter Your New Password and Remember it
            </h2>
            <input
              type="password"
              placeholder="New Password"
              onChange={handleChangePassword}
              value={newPassword}
              className="w-full px-4 py-2 mb-4 border border-gray-500 rounded-md focus:outline-none focus:ring-1"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={handleChangeConfirmPassword}
              value={confirmPassword}
              className="w-full px-4 py-2 mb-4 border border-gray-500 rounded-md focus:outline-none focus:ring-1"
              required
            />
            {passwordMatchError && (
              <p className="text-red-500 mb-4">{passwordMatchError}</p>
            )}
            <button
              onClick={handleSavePassword}
              className="w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-1 mb-2"
            >
              Save Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
