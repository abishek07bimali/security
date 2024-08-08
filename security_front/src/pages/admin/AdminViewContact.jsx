import React, { useState, useEffect } from "react";
import { deleteBlogsApi, getAllContact, getBlogsApi } from "../../apis/api";
import AdminSideNav from "../../component/AdminSideNav";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importing Font Awesome icons
import { Link } from "react-router-dom"; // Importing Link for navigation
import { toast } from "react-toastify";

const AdminViewContact = () => {
  const [savedContent, setSavedContent] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    getAllContact()
      .then((response) => {
        setSavedContent(response?.data.data);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  };

  // const handleAddBlogs = () => {
  //   setAddBlogs(!addBlogs);
  // };

  const handleDelete = (id) => {
    deleteBlogsApi(id)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Blog deleted successfully");
          fetchBlogs();
        } else {
          toast.error("Failed to delete the blog");
        }
      })
      .catch((error) => {
        console.error("Error deleting blog:", error);
        if (error.response) {
          toast.error(`Deletion failed: ${error.response.data.message}`);
        } else {
          toast.error("Deletion failed: Network error or server is down");
        }
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
    <AdminSideNav>
      <>
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Admin View Contact</h1>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr>
                  <th className="px-2 py-4 border-b">ID</th>
                  <th className="px-2 py-4 border-b">Fullname</th>
                  <th className="px-2 py-4 border-b">Email</th>
                  <th className="px-2 py-4 border-b">Address</th>
                  <th className="px-2 py-4 border-b">Phone</th>
                  <th className="px-2 py-4 border-b">Message</th>
                  <th className="px-2 py-4 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {savedContent.map((contact, index) => (
                  <tr key={contact._id} className="hover:bg-gray-100">
                    <td className="px-2 py-4 border-b">{index + 1}</td>

                    <td className="px-2 py-4 border-b">{contact.fullname}</td>
                    <td className="px-2 py-4 border-b">{contact.email}</td>
                    <td className="px-2 py-4 border-b">{contact.address}</td>
                    <td className="px-2 py-4 border-b">{contact.phone}</td>
                    <td className="px-2 py-4 border-b">{contact.message}</td>
                    <td className="px-2 py-4 border-b flex justify-center space-x-4">
                      <button
                        onClick={() => handleDelete(contact._id)}
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
    </AdminSideNav>
  );
};

export default AdminViewContact;
