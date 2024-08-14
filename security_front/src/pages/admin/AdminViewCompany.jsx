import React, { useState, useEffect } from "react";
import { deleteCompanyApi, getAllCompanyApi } from "../../apis/api";
import AdminSideNav from "../../component/AdminSideNav";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importing Font Awesome icons
import { Link } from "react-router-dom"; // Importing Link for navigation
import { Button } from "flowbite-react";
import AddBlogs from "./AddBlogs";
import { toast } from "react-hot-toast";

const AdminViewCompany = () => {
  const [savedContent, setSavedContent] = useState([]);

  useEffect(() => {
    fetchCompany();
  }, []);

  const fetchCompany = () => {
    getAllCompanyApi()
      .then((response) => {
        setSavedContent(response?.data.companies);
      })
      .catch((error) => {
        console.error("Error fetching Company:", error);
      });
  };

  const handleDelete = (id) => {
    deleteCompanyApi(id)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Comapny deleted successfully");
          fetchCompany();
        } else {
          toast.error("Failed to delete the company");
        }
      })
      .catch((error) => {
        console.error("Error deleting company:", error);
        if (error.response) {
          toast.error(`Deletion failed: ${error.response.data.message}`);
        } else {
          toast.error("Deletion failed: Network error or server is down");
        }
      });
  };

  return (
    <AdminSideNav>
      <>
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Admin View Company</h1>
            <Link
              to="/admin-company-add"
              className="bg-[#EF4136] text-white py-2 px-4 rounded"
            >
              <i className="fas fa-plus mr-3"></i>
              Add Company
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg text-left">
              <thead>
                <tr>
                  <th className="px-2 py-4 border-b ">ID</th>
                  <th className="px-2 py-4 border-b">Logo</th>
                  <th className="px-2 py-4 border-b">Name</th>
                  <th className="px-2 py-4 border-b">Address</th>
                  <th className="px-2 py-4 border-b">Category</th>
                  <th className="px-2 py-4 border-b">Business Type</th>
                  <th className="px-2 py-4 border-b">Status</th>
                  <th className="px-2 py-4 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {savedContent.map((comapny, index) => (
                  <tr key={comapny._id} className="hover:bg-gray-100">
                    <td className="px-2 py-4 border-b">{index + 1}</td>
                    <td className="px-2 py-4 border-b">
                      <img
                        src={comapny.companyImage}
                        alt="company logo"
                        className="w-[60px] h-[60px]"
                      />
                    </td>
                    <td className="px-2 py-4 border-b">{comapny.name}</td>
                    <td className="px-2 py-4 border-b">{comapny.address}</td>
                    <td className="px-2 py-4 border-b">{comapny.category}</td>
                    <td className="px-2 py-4 border-b">
                      {comapny.businesstype}
                    </td>
                    <td className="px-2 py-4 border-b">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          comapny.isClaimed ? "bg-green-500" : "bg-red-500"
                        }`}
                      ></div>
                    </td>{" "}
                    <td className="px-2 py-4 border-b flex justify-center space-x-4">
                      <Link
                        to={`/admin-edit-company/${comapny._id}`}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(comapny._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
      {/* )} */}
    </AdminSideNav>
  );
};

export default AdminViewCompany;
