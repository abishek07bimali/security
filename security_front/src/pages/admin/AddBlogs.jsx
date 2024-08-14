import React, { useState, useEffect } from "react";
import ContentEditor from "../../component/ContentEditor";
import { createBlogApi, getWorkDomainApi } from "../../apis/api";
import { toast } from "react-toastify";
import AdminSideNav from "../../component/AdminSideNav";

const AddBlogs = ({ onBlogAdded }) => {
  const [contentData, setContentData] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [getWorkDomain, setgetWorkDomain] = useState([]);
  const [successSave, setSuccessSave] = useState(false);

  const [blogDetails, setBlogDetails] = useState({
    name: "",
    description: "",
    image: null,
    tags: "",
    shortDescription: "",
  });

  const handleModelChange = (data) => {
    setContentData(data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogDetails({ ...blogDetails, [name]: value });
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setBlogDetails({ ...blogDetails, image: imageFile });
    setImageUrl(URL.createObjectURL(imageFile));
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append("title", blogDetails.name);
    formData.append("description", contentData);
    formData.append("tags", blogDetails.tags);
    formData.append("shortDescription", blogDetails.shortDescription);
    formData.append("image", blogDetails.image);

    createBlogApi(formData)
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          setSuccessSave(true)
          setBlogDetails({
            name: "",
            description: "",
            image: null,
            tags: "",
            shortDescription: "",
          });
          setContentData("");
          setImageUrl(null);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  };

  useEffect(() => {
    getWorkDomainApi()
      .then((response) => {
        setgetWorkDomain(response?.data);
      })
      .catch((error) => {
        console.error("Error fetching work domains:", error);
      });
  }, []);

  return (
    <AdminSideNav>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-10">
      <div className="mb-4 md:col-span-2 rounded-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-1">
            <label className="block mb-1">
              <p className="font-bold">Title</p>
              <input
                type="text"
                name="name"
                value={blogDetails.name}
                onChange={handleInputChange}
                className="border border-gray-400 rounded-md px-3 py-2 mt-3 w-full"
              />
            </label>
          </div>
          <div className="mb-1">
            <label className="block mb-1">
              <p className="font-bold">Tags</p>
              <select
                name="tags"
                value={blogDetails.tags}
                onChange={handleInputChange}
                className="border border-gray-400 rounded-md px-3 py-2 mt-3 w-full"
              >
                <option value="" defaultChecked>
                  Select Category
                </option>
                {getWorkDomain.map((domain) => (
                  <option key={domain._id} value={domain.workDomain}>
                    {domain.workDomain}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="mb-1">
            <label className="block mb-1">
              <p className="font-bold">Short Description</p>
              <textarea
                name="shortDescription"
                rows={3}
                value={blogDetails.shortDescription}
                onChange={handleInputChange}
                className="border border-gray-400 rounded-md px-3 py-2 mt-3 w-full"
              />
            </label>
          </div>
          <div className="mb-1">
            <label className="block mb-1">
              <p className="font-bold">Product Image</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="border border-gray-400 rounded-md px-3 py-2 mt-3 w-full"
              />
            </label>
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Product"
                className="mt-2 max-w-[250px] h-[250px]"
              />
            )}
          </div>
        </div>
        <div className="mb-1 md:col-span-2">
          <label className="block mb-1">
            <p className="font-bold mb-3">Description</p>
            <ContentEditor
              model={contentData}
              handleModelChange={handleModelChange}
              allowPaste={true}
            />
          </label>
        </div>
      </div>
      <button
        onClick={handleSave}
        className="bg-[#22c55e] text-white px-4 py-2 rounded-md mt-2 md:col-span-2"
      >
        Add Blogs
      </button>
    </div>
    // </AdminSideNav>
  );
};

export default AddBlogs;
