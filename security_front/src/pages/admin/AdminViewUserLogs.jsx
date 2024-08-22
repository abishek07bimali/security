import React, { useState, useEffect } from "react";
import { deleteBlogsApi, getAllContact, getAlluserLogs, getBlogsApi } from "../../apis/api";
import AdminSideNav from "../../component/AdminSideNav";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importing Font Awesome icons
import { Link } from "react-router-dom"; // Importing Link for navigation
import { toast } from "react-hot-toast";

const AdminViewUserLogs = () => {
  const [savedContent, setSavedContent] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    getAlluserLogs()
      .then((response) => {
        setSavedContent(response?.data.activityLogs);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
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
                  <th className="px-2 py-4 border-b">User Id</th>
                  <th className="px-2 py-4 border-b">Username</th>
                  <th className="px-2 py-4 border-b">Email</th>
                  <th className="px-2 py-4 border-b">Action</th>
                  <th className="px-2 py-4 border-b">IpAddress</th>
                  <th className="px-2 py-4 border-b">TimeStamp</th>
                </tr>
              </thead>
              <tbody>
                {savedContent.map((contact, index) => (
                  <tr key={contact._id} className="hover:bg-gray-100">
                    <td className="px-2 py-4 border-b">{index + 1}</td>

                    <td className="px-2 py-4 border-b">{contact.user._id}</td>
                    <td className="px-2 py-4 border-b">{contact.user.username}</td>
                    <td className="px-2 py-4 border-b">{contact.user.email}</td>
                    <td className="px-2 py-4 border-b">{contact.action}</td>
                    <td className="px-2 py-4 border-b">{contact.ipAddress}</td>
                    <td className="px-2 py-4 border-b">
                      {new Date(contact.timestamp).toLocaleString()}
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

export default AdminViewUserLogs;
