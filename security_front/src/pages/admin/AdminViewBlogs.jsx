import React, { useState, useEffect } from "react";
import { deleteBlogsApi, getBlogsApi } from "../../apis/api";
import AdminSideNav from "../../component/AdminSideNav";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importing Font Awesome icons
import { Link } from "react-router-dom"; // Importing Link for navigation
import { Button } from "flowbite-react";
import AddBlogs from "./AddBlogs";
import { toast } from "react-hot-toast";

const AdminViewBlogs = () => {
  const [savedContent, setSavedContent] = useState([]);
  // const [addBlogs, setAddBlogs] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    getBlogsApi()
      .then((response) => {
        setSavedContent(response?.data);
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
            <h1 className="text-2xl font-bold">Admin View Blogs</h1>
            <Link
              to="/admin-add-blogs" // Adjust the link as needed
              className="bg-[#EF4136] text-white py-2 px-4 rounded"
            >
              <i className="fas fa-plus mr-3"></i>
              Add Blog
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr>
                  <th className="px-2 py-4 border-b">ID</th>
                  <th className="px-2 py-4 border-b">Banner Image</th>
                  <th className="px-2 py-4 border-b">Title</th>
                  <th className="px-2 py-4 border-b">Tags</th>
                  <th className="px-2 py-4 border-b">Time</th>
                  <th className="px-2 py-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {savedContent.map((blog, index) => (
                  <tr key={blog._id} className="hover:bg-gray-100">
                    <td className="px-2 py-4 border-b">{index + 1}</td>
                    <td className="px-2 py-4 border-b">
                      <img
                        src={blog.image}
                        alt="blogs banner Image"
                        className="w-[60px] h-[60px]"
                      />
                    </td>

                    <td className="px-2 py-4 border-b">{blog.title}</td>
                    <td className="px-2 py-4 border-b">{blog.tags}</td>
                    <td className="px-2 py-4 border-b">
                      {formatDate(blog.createdAt)}
                    </td>
                    <td className="px-2 py-4 border-b flex justify-center space-x-4">
                      <Link
                        //   onClick={() => handleEdit(blog._id)}
                        to={`/admin-edit-blogs/${blog._id}`}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id)}
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

export default AdminViewBlogs;
