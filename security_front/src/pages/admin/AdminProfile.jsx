import React, { useState } from "react";
import { Link } from "react-router-dom";
import renderTabContent from "../../component/TabContent";
import AdminSideNav from "../../component/AdminSideNav";

const AdminProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [company, setCompany] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: user.username,
    email: user.email,
    phone: user.phone,
    mobile: "9826351470",
    address: user.address,
  });
  const handleEditEnable = () => {
    if (editProfile === false) {
      enableEdit();
    } else {
      handleSave();
    }
  };

  const enableEdit = () => {
    setEditProfile(true);
    console.log("Editing enabled");
  };

  const handleSave = () => {
    setEditProfile(false);
    console.log("Changes saved");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileData({ ...profileData, [name]: value });
  };
  return (
    <AdminSideNav>
      <div className="mb-8 w-11/12 md:w-4/6 mx-auto flex flex-col justify-center items-center min-h-screen ">
        <h2 className="text-2xl text-left md:text-[25px] font-bold mb-4">
          Personal Profile
        </h2>
        <div className="md:flex md:flex-row flex flex-col w-full">
          <div className="w-full md:w-3/5 p-4 md:p-20 text-center rounded-sm border border-black">
            <img
              src="images/logo/logo.png"
              alt="John Doe"
              className="w-24 h-24 rounded-full mx-auto border border-red-500"
            />
            <div>
              <h2 className="text-xl font-semibold capitalize">
                {profileData.fullName}
              </h2>
              <p>Founder and Co-founder</p>
              <p>{profileData.address}</p>
            </div>
          </div>
          <div className="w-full md:w-2/3 p-6 rounded-lg relative">
            <div>
              <div className="mb-4 flex flex-wrap items-center">
                <strong className="w-full md:w-1/5">Full Name:</strong>
                {editProfile === false ? (
                  profileData.fullName
                ) : (
                  <input
                    type="text"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleChange}
                    className="border border-gray-400 rounded-md px-3 py-2 ml-3 w-full md:w-3/5"
                  />
                )}
              </div>
              <div className="mb-4 flex flex-wrap items-center">
                <strong className="w-full md:w-1/5">Email:</strong>
                {editProfile === false ? (
                  profileData.email
                ) : (
                  <input
                    type="text"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    className="border border-gray-400 rounded-md px-3 py-2 ml-3 w-full md:w-3/5"
                  />
                )}
              </div>
              <div className="mb-4 flex flex-wrap items-center">
                <strong className="w-full md:w-1/5">Phone:</strong>
                {editProfile === false ? (
                  profileData.phone
                ) : (
                  <input
                    type="text"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleChange}
                    className="border border-gray-400 rounded-md px-3 py-2 ml-3 w-full md:w-3/5"
                  />
                )}
              </div>
              <div className="mb-4 flex flex-wrap items-center">
                <strong className="w-full md:w-1/5">Mobile:</strong>
                {editProfile === false ? (
                  profileData.mobile
                ) : (
                  <input
                    type="text"
                    name="mobile"
                    value={profileData.mobile}
                    onChange={handleChange}
                    className="border border-gray-400 rounded-md px-3 py-2 ml-3 w-full md:w-3/5"
                  />
                )}
              </div>
              <div className="mb-4 flex flex-wrap items-center">
                <strong className="w-full md:w-1/5">Address:</strong>
                {editProfile === false ? (
                  profileData.address
                ) : (
                  <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={handleChange}
                    className="border border-gray-400 rounded-md px-3 py-2 ml-3 w-full md:w-3/5"
                  />
                )}
              </div>
            </div>
            <button
              onClick={handleEditEnable}
              className="absolute md:bottom-4 right-4 bg-red-500 text-white py-2 px-6 rounded font-bold"
            >
              {editProfile === false ? "Edit" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </AdminSideNav>
  );
};

export default AdminProfile;
