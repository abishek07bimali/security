import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import renderTabContent from "../../component/TabContent";
import { getSingleCompanyApi } from "../../apis/api";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [company, setCompany] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: user?.username,
    email: user?.email,
    phone: user?.phone,
    mobile: "9826351470",
    address: user?.address,
  });
  const [activeTab, setActiveTab] = useState("companyInformation");
  const [companyContent, setCompanyContent] = useState(null);
  const [companyId, setCompanyId] = useState("");

  const handleEditEnable = () => {
    if (editProfile === false) {
      enableEdit();
    } else {
      handleSave();
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    setisLogout(true);
  };

  const handleCompleteLogout = () => {
    localStorage.clear();
    navigate("/");
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

  const [isLogout, setisLogout] = useState(false);
  const handleCloseModal = () => {
    setisLogout(false);
  };

  useEffect(() => {
    if (user.claimedCompany.length > 0) {
      setCompany(true);
      setCompanyId(user.claimedCompany[0]);
    }
  }, [user.claimedCompany.length]);

  useEffect(() => {
    getSingleCompanyApi(companyId)
      .then((response) => {
        setCompanyContent(response?.data.companies[0]);
      })
      .catch((error) => {
        console.error("Error fetching content:", error);
      });
  }, [companyId]);
  return (
    <div>
      <h1 className="text-center text-4xl md:text-[45px] font-bold mb-4 border-b-2 border-black p-2">
        Profile
      </h1>
      <div className="mb-8 w-11/12 md:w-4/6 mx-auto">
        <h2 className="text-2xl md:text-[25px] font-bold mb-4">
          Personal Profile
        </h2>
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/3 p-4 md:p-20 text-center rounded-sm border border-black">
            <img
              src="images/logo/logo.png"
              alt="John Doe"
              className="w-24 h-24 rounded-full mx-auto border border-green-500"
            />
            <div>
              <h2 className="text-xl font-semibold capitalize">
                {profileData.fullName}
              </h2>
              <p>Founder and Co-founder</p>
              <p>{profileData.address}</p>
              <button
                onClick={handleLogout}
                className="bg-green-500  text-white px-4 py-2 rounded-lg font-bold mt-3"
              >
                Logout
              </button>
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
              className="absolute md:bottom-4 right-4 bg-green-500 text-white py-2 px-6 rounded font-bold"
            >
              {editProfile === false ? "Edit" : "Save"}
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto w-11/12 md:w-4/6 mb-10 ">
        {company === false ? (
          <Link
            to="/add-company-form"
            className="bg-green-500 mb-8 w-full md:w-1/6 text-white py-2 px-4 rounded mx-auto"
          >
            List Your Company
          </Link>
        ) : (
          <>
            <h2 className="text-2xl md:text-[25px] font-bold mb-6 mt-4">
              Your Company
            </h2>
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/3 border-r border-black p-4">
                <h3 className="text-xl md:text-[20px] font-bold mb-10 mt-4">
                  Company Detail
                </h3>
                <button
                  className={`block w-full text-left py-4 px-2 hover:bg-gray-100 ${
                    activeTab === "companyInformation"
                      ? "text-green-500 font-semibold border-l-4 border-green-500"
                      : ""
                  }`}
                  onClick={() => setActiveTab("companyInformation")}
                >
                  Company Information
                </button>
                <button
                  className={`block w-full text-left py-4 px-2 hover:bg-gray-100 ${
                    activeTab === "productsServices"
                      ? "text-green-500 font-semibold border-l-4 border-green-500"
                      : ""
                  }`}
                  onClick={() => setActiveTab("productsServices")}
                >
                  Products/Services
                </button>
                <button
                  className={`block w-full text-left py-4 px-2 hover:bg-gray-100 ${
                    activeTab === "basicInformation"
                      ? "text-green-500 font-semibold border-l-4 border-green-500"
                      : ""
                  }`}
                  onClick={() => setActiveTab("basicInformation")}
                >
                  Basic Information
                </button>
                <button
                  className={`block w-full text-left py-4 px-2 hover:bg-gray-100 ${
                    activeTab === "timeline"
                      ? "text-green-500 font-semibold border-l-4 border-green-500"
                      : ""
                  }`}
                  onClick={() => setActiveTab("timeline")}
                >
                  Timeline
                </button>
                <button
                  className={`block w-full text-left py-4 px-2 hover:bg-gray-100 ${
                    activeTab === "market"
                      ? "text-green-500 font-semibold border-l-4 border-green-500"
                      : ""
                  }`}
                  onClick={() => setActiveTab("market")}
                >
                  Market
                </button>
                <button
                  className={`block w-full text-left py-4 px-2 hover:bg-gray-100 ${
                    activeTab === "funding"
                      ? "text-green-500 font-semibold border-l-4 border-green-500"
                      : ""
                  }`}
                  onClick={() => setActiveTab("funding")}
                >
                  Funding
                </button>
              </div>
              <div className="w-full md:w-2/3 p-6 rounded-lg relative">
                <h3 className="text-xl md:text-[20px] font-bold mb-10 mt-4 self-center text-center">
                  Company Information
                </h3>

                {renderTabContent(activeTab, companyContent)}
                <Link
                  to={`/user-edit-company/${companyContent?._id}`}
                  className="absolute md:bottom-4 right-4 bg-green-500 text-white py-2 px-6 font-bold rounded"
                >
                  Edit
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
      {isLogout && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 m-2">
          <div className="bg-green-100 p-6 rounded-lg shadow-lg w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <div className="flex flex-col items-center mb-6">
              <img
                src="/images/logo/logo.png"
                alt="BusinessOne Logo"
                className="w-16 h-16"
              />
            </div>
            <h2 className="text-[25px] font-semibold mb-4 text-center">
              Do you really want to logout?
            </h2>
            <div className="flex justify-between">
              <button
                className=" bg-green-500 text-white py-2 px-6 rounded font-bold"
                onClick={handleCompleteLogout}
              >
                Yes
              </button>
              <button
                className="bg-green-500 text-white py-2 px-6 rounded font-bold"
                onClick={handleCloseModal}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
