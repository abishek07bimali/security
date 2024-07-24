import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import AdminSideNav from "../../component/AdminSideNav";
import ContentEditor from "../../component/ContentEditor";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState(1);

  const [companyBasicDetails, setcompanyBasicDetails] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    companyDescription: "",
    extendedDate: "",
    companyImage: null,
    contentData: "",
  });

  const [companyProductDetails, setCompanyProductDetails] = useState({
    products: [{ name: "", description: "", image: null }],
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(companyBasicDetails, companyProductDetails);
    // Send companyBasicDetails to backend API or perform other actions
  };

  const handleProductChange = (index, event) => {
    const { name, value } = event.target;
    const products = [...companyProductDetails.products];
    products[index][name] = value;
    setCompanyProductDetails({ ...companyProductDetails, products });
  };

  const handleAddProduct = () => {
    setCompanyProductDetails({
      ...companyProductDetails,
      products: [
        ...companyProductDetails.products,
        { name: "", description: "", image: null },
      ],
    });
  };

  const handleImageChange = (index, event) => {
    const imageFile = event.target.files[0];
    const products = [...companyProductDetails.products];
    products[index].image = URL.createObjectURL(imageFile); // Store the image URL
    setCompanyProductDetails({ ...companyProductDetails, products });
  };

  const handleDeleteProduct = (index) => {
    const products = [...companyProductDetails.products];
    products.splice(index, 1);
    setCompanyProductDetails({ ...companyProductDetails, products });
  };

  const [contentData, setContentData] = useState("");
  const [contentData1, setContentData1] = useState("");
  const [contentData2, setContentData2] = useState("");

  const handleModelChange = (data) => {
    setContentData(data);
  };
  const handleModelChange1 = (data) => {
    setContentData1(data);
  };
  const handleModelChange2 = (data) => {
    setContentData2(data);
  };

  return (
    <>
      <AdminSideNav>
        <div className="w-full overflow-x-hidden border-t p-4">
          <div className="mb-4 flex border border-gray-500">
            <button
              className={`py-2 px-4 ${
                activeTab === 1
                  ? "bg-blue-500 text-white border border-blue-700 "
                  : "text-gray-700 "
              }`}
              onClick={() => setActiveTab(1)}
            >
              Basic Information
            </button>
            <button
              className={`py-2 px-4 ${
                activeTab === 2
                  ? "bg-blue-500 text-white border border-blue-500"
                  : "text-gray-700 "
              }`}
              onClick={() => setActiveTab(2)}
            >
              Product Information
            </button>
            <button
              className={`py-2 px-4 ${
                activeTab === 3
                  ? "bg-blue-500 text-white border border-blue-500"
                  : "text-gray-700 "
              }`}
              onClick={() => setActiveTab(3)}
            >
              Product Information
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className={
              activeTab === 1
                ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                : "hidden"
            }
          >
            <div className="mb-1">
              <label className="block mb-1">
                <p className="font-bold">Company Name</p>
                <input
                  type="text"
                  value={companyBasicDetails.name}
                  onChange={(event) =>
                    setcompanyBasicDetails({
                      ...companyBasicDetails,
                      name: event.target.value,
                    })
                  }
                  className="border border-gray-400 rounded-md px-3 py-2 mt-1 w-full"
                />
              </label>
            </div>
            <div className="mb-1">
              <label className="block mb-1">
                <p className="font-bold">Address</p>
                <input
                  type="text"
                  value={companyBasicDetails.address}
                  onChange={(event) =>
                    setcompanyBasicDetails({
                      ...companyBasicDetails,
                      address: event.target.value,
                    })
                  }
                  className="border border-gray-400 rounded-md px-3 py-2 mt-1 w-full"
                />
              </label>
            </div>
            <div className="mb-1">
              <label className="block mb-1">
                <p className="font-bold">Email</p>
                <input
                  type="email"
                  value={companyBasicDetails.email}
                  onChange={(event) =>
                    setcompanyBasicDetails({
                      ...companyBasicDetails,
                      email: event.target.value,
                    })
                  }
                  className="border border-gray-400 rounded-md px-3 py-2 mt-1 w-full"
                />
              </label>
            </div>
            <div className="mb-1">
              <label className="block mb-1">
                <p className="font-bold">Phone</p>
                <input
                  type="tel"
                  value={companyBasicDetails.phone}
                  onChange={(event) =>
                    setcompanyBasicDetails({
                      ...companyBasicDetails,
                      phone: event.target.value,
                    })
                  }
                  className="border border-gray-400 rounded-md px-3 py-2 mt-1 w-full"
                />
              </label>
            </div>
            <div className="mb-1 ">
              <label className="block mb-1">
                <p className="font-bold">Company short Description</p>
                <textarea
                  value={companyBasicDetails.companyDescription}
                  onChange={(event) =>
                    setcompanyBasicDetails({
                      ...companyBasicDetails,
                      companyDescription: event.target.value,
                    })
                  }
                  className="border border-gray-400 rounded-md px-3 py-2 mt-1 w-full"
                />
              </label>
            </div>
            <div className="mb-1">
              <label className="block mb-1">
                <p className="font-bold">Website</p>
                <input
                  type="tel"
                  value={companyBasicDetails.phone}
                  onChange={(event) =>
                    setcompanyBasicDetails({
                      ...companyBasicDetails,
                      phone: event.target.value,
                    })
                  }
                  className="border border-gray-400 rounded-md px-3 py-2 mt-1 w-full"
                />
              </label>
            </div>
            {/* <div className="mb-1 md:col-span-2">
              <label className="block mb-1">
                <p className="font-bold">Company Description</p>
                <textarea
                  value={companyBasicDetails.companyDescription}
                  onChange={(event) =>
                    setcompanyBasicDetails({
                      ...companyBasicDetails,
                      companyDescription: event.target.value,
                    })
                  }
                  className="border border-gray-400 rounded-md px-3 py-2 mt-1 w-full"
                />
              </label>
            </div> */}
            <div className="mb-1 md:col-span-2">
              <label className="block mb-1">
                <p className="font-bold">Company Description</p>
                <ContentEditor
                  model={contentData}
                  handleModelChange={handleModelChange}
                  allowPaste={true}
                />
              </label>
            </div>
            <div className="mb-1">
              <label className="block mb-1">
                <p className="font-bold">Estd. Date</p>
                <input
                  type="date"
                  value={companyBasicDetails.extendedDate}
                  onChange={(event) =>
                    setcompanyBasicDetails({
                      ...companyBasicDetails,
                      extendedDate: event.target.value,
                    })
                  }
                  className="border border-gray-400 rounded-md px-3 py-2 mt-1 w-full"
                />
              </label>
            </div>
            <div className="mb-1">
              <label className="block mb-1">
                <p className="font-bold">Company Image</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    setcompanyBasicDetails({
                      ...companyBasicDetails,
                      companyImage: event.target.files[0],
                    })
                  }
                  className="border border-gray-400 rounded-md px-3 py-2 mt-1 w-full"
                />
              </label>
              {companyBasicDetails.companyImage && (
                <img
                  src={URL.createObjectURL(companyBasicDetails.companyImage)}
                  alt="Company"
                  className="mt-2 max-w-[250px] h-[250px]"
                />
              )}
            </div>
            <button
              className="bg-[#3d68ff] text-white px-4 py-2 rounded-md mt-2 md:col-span-2"
              type="button"
              onClick={() => setActiveTab(2)}
            >
              Next
            </button>
          </form>
          <form
            onSubmit={handleSubmit}
            className={
              activeTab === 2
                ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                : "hidden"
            }
          >
            {companyProductDetails.products.map((product, index) => (
              <div
                key={index}
                className="mb-4 md:col-span-2 shadow-md rounded-md p-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="mb-1">
                    <label className="block mb-1">
                      <p className="font-bold">Product Name</p>
                      <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={(event) => handleProductChange(index, event)}
                        className="border border-gray-400 rounded-md px-3 py-2 mt-1 w-full"
                      />
                    </label>
                  </div>
                  <div className="mb-1">
                    <label className="block mb-1">
                      <p className="font-bold">Product Image</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => handleImageChange(index, event)}
                        className="border border-gray-400 rounded-md px-3 py-2 mt-1 w-full"
                      />
                    </label>
                    {product.image && (
                      <img
                        src={product.image}
                        alt="Product"
                        className="mt-2 max-w-[250px] h-[250px]"
                      />
                    )}
                  </div>
                </div>
                <div className="mb-1 md:col-span-2">
                  <label className="block mb-1">
                    <p className="font-bold">Product Description</p>
                    <ContentEditor
                      model={contentData1}
                      handleModelChange={handleModelChange1}
                      allowPaste={true}
                    />
                  </label>
                </div>
                {index === companyProductDetails.products.length - 1 && (
                  <button
                    type="button"
                    onClick={handleAddProduct}
                    className="bg-[#3d68ff] text-white px-3 py-2 rounded-md ml-2"
                  >
                    +
                  </button>
                )}
                {companyProductDetails.products.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleDeleteProduct(index)}
                    className="bg-red-400 text-white px-3 py-2 rounded-md ml-2"
                  >
                    <AiOutlineDelete />
                  </button>
                )}
              </div>
            ))}
            <button
              className="bg-[#3d68ff] text-white px-4 py-2 rounded-md mt-2 md:col-span-2"
              type="submit"
            >
              Add Company Details
            </button>
          </form>
          <form
            onSubmit={handleSubmit}
            className={
              activeTab === 3
                ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                : "hidden"
            }
          >
            {companyProductDetails.products.map((product, index) => (
              <div
                key={index}
                className="mb-4 md:col-span-2 shadow-md rounded-md p-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="mb-1">
                    <label className="block mb-1">
                      <p className="font-bold">Product Name</p>
                      <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={(event) => handleProductChange(index, event)}
                        className="border border-gray-400 rounded-md px-3 py-2 mt-1 w-full"
                      />
                    </label>
                  </div>
                  <div className="mb-1">
                    <label className="block mb-1">
                      <p className="font-bold">Product Image</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => handleImageChange(index, event)}
                        className="border border-gray-400 rounded-md px-3 py-2 mt-1 w-full"
                      />
                    </label>
                    {product.image && (
                      <img
                        src={product.image}
                        alt="Product"
                        className="mt-2 max-w-[250px] h-[250px]"
                      />
                    )}
                  </div>
                </div>
                <div className="mb-1 md:col-span-2">
                  <label className="block mb-1">
                    <p className="font-bold">Product Description</p>
                    <ContentEditor
                      model={contentData2}
                      handleModelChange={handleModelChange2}
                      allowPaste={true}
                    />
                  </label>
                </div>
                {index === companyProductDetails.products.length - 1 && (
                  <button
                    type="button"
                    onClick={handleAddProduct}
                    className="bg-[#3d68ff] text-white px-3 py-2 rounded-md ml-2"
                  >
                    +
                  </button>
                )}
                {companyProductDetails.products.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleDeleteProduct(index)}
                    className="bg-red-400 text-white px-3 py-2 rounded-md ml-2"
                  >
                    <AiOutlineDelete />
                  </button>
                )}
              </div>
            ))}
            <button
              className="bg-[#3d68ff] text-white px-4 py-2 rounded-md mt-2 md:col-span-2"
              type="submit"
            >
              Add Company Details
            </button>
          </form>
        </div>
      </AdminSideNav>
    </>
  );
};

export default AdminDashboard;
