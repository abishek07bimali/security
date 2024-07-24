import React, { useState } from "react";
import { createContact } from "../../apis/api";
import { toast } from "react-toastify";

function ContactPage() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      createContact(formData).then((response) => {
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
                  className="mt-1 block w-full px-3 py-2 border border-[#9CA3AF] rounded-md shadow-sm focus:outline-none  "
                />
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
                  className="mt-1 block w-full px-3 py-2 border border-[#9CA3AF] rounded-md shadow-sm focus:outline-none  "
                />
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
                  className="mt-1 block w-full px-3 py-2 border border-[#9CA3AF] rounded-md shadow-sm focus:outline-none  "
                />
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
                  className="mt-1 block w-full px-3 py-2 border border-[#9CA3AF] rounded-md shadow-sm focus:outline-none  "
                />
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
                className="mt-1 block w-full px-3 py-2 border border-[#9CA3AF] rounded-md shadow-sm focus:outline-none  "
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 bg-[#F23F2D] "
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
                className="w-[105px] h-[105px] pr-3  top-0"
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
                // style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
