import React, { useState } from "react";
import { createContact } from "../../apis/api";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";

function ContactPage() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [captchaToken, setCaptchaToken] = useState(null);

  const validateFullName = (name) => {
    const fullNameRegex = /^[a-zA-Z\s]+$/;
    return fullNameRegex.test(name);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/; // Example: 10 digit number
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullname) {
      errors.fullname = "Full name is required.";
    } else if (!validateFullName(formData.fullname)) {
      errors.fullname = "Full name can only contain letters and spaces.";
    }

    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formData.phone) {
      errors.phone = "Phone number is required.";
    } else if (!validatePhone(formData.phone)) {
      errors.phone = "Phone number must be 10 digits.";
    }

    if (!formData.address) {
      errors.address = "Address is required.";
    }

    if (!formData.message) {
      errors.message = "Message is required.";
    }

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      
      ...formData,
      [name]: value,

    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    if (!captchaToken) {
      toast.error("Please complete the CAPTCHA");
      return;
    }

    setLoading(true);

    try {
      const token = await captchaToken.executeAsync(); // Generate CAPTCHA token

      const updatedFormData = {
        ...formData,
        captchaToken: token, 
      };


      createContact(updatedFormData).then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          setFormData({
            fullname: "",
            email: "",
            phone: "",
            address: "",
            message: "",
          });
        } else {
          if (response.data.errors && response.data.errors.length > 0) {
            response.data.errors.forEach((error) => {
              toast.error(`${error.path}: ${error.msg}`);
            });
          } else {
            toast.error(response.data.message || "An error occurred.");
          }
        }
      });
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          data.errors.forEach((error) =>
            toast.error(`${error.path}: ${error.msg}`)
          );
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      } else if (error.request) {
        toast.error("No response received from the server.");
      } else {
        toast.error("Error in setting up the request.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap justify-between mt-10 mb-10 ">
        <div className="w-full lg:w-1/2 px-4 mb-8 ">
          <form onSubmit={handleSubmit} className="space-y-4 mt-10 mb-10">
            <div className="flex flex-wrap -mx-2">
              <div className="w-1/2 px-2">
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium text-black mb-4"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    error.fullname ? "border-red-500" : "border-[#9CA3AF]"
                  } rounded-md shadow-sm focus:outline-none`}
                />
                {error.fullname && (
                  <p className="text-red-500 text-sm">{error.fullname}</p>
                )}
              </div>
              <div className="w-1/2 px-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-black mb-4"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    error.email ? "border-red-500" : "border-[#9CA3AF]"
                  } rounded-md shadow-sm focus:outline-none`}
                />
                {error.email && (
                  <p className="text-red-500 text-sm">{error.email}</p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap -mx-2">
              <div className="w-1/2 px-2">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-black mb-4"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    error.address ? "border-red-500" : "border-[#9CA3AF]"
                  } rounded-md shadow-sm focus:outline-none`}
                />
                {error.address && (
                  <p className="text-red-500 text-sm">{error.address}</p>
                )}
              </div>
              <div className="w-1/2 px-2">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-black mb-4"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    error.phone ? "border-red-500" : "border-[#9CA3AF]"
                  } rounded-md shadow-sm focus:outline-none`}
                />
                {error.phone && (
                  <p className="text-red-500 text-sm">{error.phone}</p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-black mb-4"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className={`mt-1 block w-full px-3 py-2 border ${
                  error.message ? "border-red-500" : "border-[#9CA3AF]"
                } rounded-md shadow-sm focus:outline-none`}
              ></textarea>
              {error.message && (
                <p className="text-red-500 text-sm">{error.message}</p>
              )}
            </div>
            {/* <div className="mt-6  w-full"> */}
              <ReCAPTCHA
                sitekey="6LfrjiUqAAAAAJbLINUKVlWJelSmkleQUfaDF2A2"  // Replace with your reCAPTCHA v3 Site Key
                size="invisible"
                ref={(el) => setCaptchaToken(el)}
              />
            {/* </div> */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 bg-[#22c55e]"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
        <div className="w-full lg:w-1/2 px-4">
          <div className="bg-white p-5 shadow-lg rounded-lg h-full">
            <h2 className="text-lg font-bold">Address</h2>
            <hr className="mt-4 mb-3" />
            <div className="mb-4 flex flex-wrap">
              <img
                src="/images/logo/logo.png"
                alt=""
                className="w-[105px] h-[105px] pr-3 top-0"
              />
              <div className="font-semibold">
                <p>Kathmandu, Nepal</p>
                <p>Email: example@gmail.com</p>
                <p>Website: www.example.com</p>
              </div>
            </div>
            {/* Placeholder for map */}
            <div className="h-100 w-100 bg-gray-300 rounded-lg flex justify-center items-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d964.3582239122129!2d85.32939060263661!3d27.70618250126379!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190a74aa1f23%3A0x74ebef82ad0e5c15!2sSoftwarica%20College%20of%20IT%20and%20E-Commerce!5e0!3m2!1sen!2snp!4v1719284741307!5m2!1sen!2snp"
                width="700"
                height="250"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
