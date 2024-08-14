import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import ContentEditor from "../../component/ContentEditor";
import AdminSideNav from "../../component/AdminSideNav";
import { toast } from "react-toastify";
import { createCompanyApi } from "../../apis/api";

const AdminCompanyAddingForm = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [companyBasicDetails, setCompanyBasicDetails] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    category: "",
    companyDescription: "",
    extendedDate: "",
    companyImage: null,
    contentData: "",
    website: "",
    registration: "",
    facebook: "",
  });

  const [companyProductDetails, setCompanyProductDetails] = useState({
    products: [{ name: "", description: "", image: null }],
  });

  const [companyTimelineDetails, setCompanyTimelineDetails] = useState({
    timelines: [{ name: "", date: "", description: "", image: null }],
  });

  const [companyFundingDetails, setCompanyFundingDetails] = useState({
    fundings: [{ name: "", date: "", amount: "", description: "" }],
  });

  const [companyDetails, setCompanyDetails] = useState({
    basicDescription: "",
  });

  const [targetMarketDetail, setTargetMarketDetail] = useState({
    marketDescription: "",
    businesstype: "",
    revenueStream: "",
  });

  const validateForm = () => {
    if (!companyBasicDetails.name) {
      toast.error("Company Name is required");
      return false;
    }
    if (!companyBasicDetails.email) {
      toast.error("Email is required");
      return false;
    }
    if (!companyBasicDetails.phone) {
      toast.error("Phone number is required");
      return false;
    }
    if (!companyBasicDetails.category) {
      toast.error("Category is required");
      return false;
    }
    if (!companyBasicDetails.website) {
      toast.error("Website is required");
      return false;
    }
    if (!companyBasicDetails.website.startsWith("http")) {
      toast.error("Please enter a valid website URL.");
      return false;
    }
    // Add more validation checks as needed
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("companyBasicDetails", JSON.stringify(companyBasicDetails));
    formData.append(
      "companyProductDetails",
      JSON.stringify(companyProductDetails)
    );
    formData.append(
      "companyTimelineDetails",
      JSON.stringify(companyTimelineDetails)
    );
    formData.append(
      "companyFundingDetails",
      JSON.stringify(companyFundingDetails)
    );
    formData.append("companyDetails", JSON.stringify(companyDetails));
    formData.append("targetMarketDetail", JSON.stringify(targetMarketDetail));

    if (companyBasicDetails.companyImage) {
      formData.append("companyImage", companyBasicDetails.companyImage);
    }

    companyProductDetails.products.forEach((product, index) => {
      if (product.image) {
        formData.append("productImages", product.image);
      }
    });

    companyTimelineDetails.timelines.forEach((timeline, index) => {
      if (timeline.image) {
        formData.append("timelineImages", timeline.image);
      }
    });

    try {
      const response = await createCompanyApi(formData);
      if (response.status === 201) {
        toast.success("Company created successfully");
        setCompanyBasicDetails({
          name: "",
          address: "",
          email: "",
          phone: "",
          category: "",
          companyDescription: "",
          extendedDate: "",
          companyImage: null,
          contentData: "",
          website: "",
          registration: "",
          facebook: "",
        });
        setCompanyProductDetails({
          products: [{ name: "", description: "", image: null }],
        });
        setCompanyTimelineDetails({
          timelines: [{ name: "", date: "", description: "", image: null }],
        });
        setCompanyFundingDetails({
          fundings: [{ name: "", date: "", amount: "", description: "" }],
        });
        setCompanyDetails({
          basicDescription: "",
        });
        setTargetMarketDetail({
          marketDescription: "",
          businesstype: "",
          revenueStream: "",
        });

        // Reset the tab to the first one
        setActiveTab(1);
      } else {
        toast.error("Error creating company");
      }
    } catch (error) {
      toast.error("An error occurred while creating the company");
    }
  };

  const handleInputChange = (setState, field) => (event) => {
    setState((prevState) => ({
      ...prevState,
      [field]: event.target.value,
    }));
  };

  const handleContentChange = (setState, field) => (data) => {
    setState((prevState) => ({
      ...prevState,
      [field]: data,
    }));
  };

  const handleImageChange = (setState, field, index) => (event) => {
    const imageFile = event.target.files[0];
    setState((prevState) => {
      const items = [...prevState[field]];
      items[index].image = imageFile;
      return { ...prevState, [field]: items };
    });
  };

  const handleArrayChange = (setState, field, index, subfield) => (event) => {
    setState((prevState) => {
      const items = [...prevState[field]];
      items[index][subfield] = event.target.value;
      return { ...prevState, [field]: items };
    });
  };

  const handleAddItem = (setState, field, newItem) => () => {
    setState((prevState) => ({
      ...prevState,
      [field]: [...prevState[field], newItem],
    }));
  };

  const handleDeleteItem = (setState, field, index) => () => {
    setState((prevState) => {
      const items = [...prevState[field]];
      items.splice(index, 1);
      return { ...prevState, [field]: items };
    });
  };

  const nextTab = () => {
    setActiveTab((prev) => (prev < 6 ? prev + 1 : prev));
  };

  return (
    <AdminSideNav>
      <div className="flex items-start justify-center min-h-screen bg-white">
        <div className="w-5/5 border-t p-4 bg-white rounded-lg">
          <div className="mb-4 flex flex-wrap mt-16">
            {[
              "Description",
              "Product Information",
              "Basic Information",
              "Timeline",
              "Target Market",
              "Funding and Breakdowns",
            ].map((tabName, index) => (
              <button
                key={index}
                className={`py-2 px-[52px] border border-gray-500 ${
                  activeTab === index + 1
                    ? "bg-[#22c55e] text-white border border-[#22c55e]"
                    : "text-gray-700"
                }`}
                onClick={() => setActiveTab(index + 1)}
              >
                {tabName}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <div
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
                    onChange={handleInputChange(setCompanyBasicDetails, "name")}
                    className="border border-gray-400 rounded-md px-3 py-2 mt-3 w-full"
                  />
                </label>
              </div>
              <div className="mb-1">
                <label className="block mb-1">
                  <p className="font-bold">Address</p>
                  <input
                    type="text"
                    value={companyBasicDetails.address}
                    onChange={handleInputChange(
                      setCompanyBasicDetails,
                      "address"
                    )}
                    className="border border-gray-400 rounded-md px-3 py-2 mt-3 w-full"
                  />
                </label>
              </div>
              <div className="mb-1">
                <label className="block mb-1">
                  <p className="font-bold">Email</p>
                  <input
                    type="text"
                    value={companyBasicDetails.email}
                    onChange={handleInputChange(
                      setCompanyBasicDetails,
                      "email"
                    )}
                    className="border border-gray-400 rounded-md px-3 py-2 mt-3 w-full"
                  />
                </label>
              </div>
              <div className="mb-1">
                <label className="block mb-1">
                  <p className="font-bold">Phone</p>
                  <input
                    type="tel"
                    value={companyBasicDetails.phone}
                    onChange={handleInputChange(
                      setCompanyBasicDetails,
                      "phone"
                    )}
                    className="border border-gray-400 rounded-md px-3 py-2 mt-3 w-full"
                  />
                </label>
              </div>
              <div className="mb-1">
                <label className="block mb-1">
                  <p className="font-bold">Company short Description</p>
                  <textarea
                    value={companyBasicDetails.companyDescription}
                    onChange={handleInputChange(
                      setCompanyBasicDetails,
                      "companyDescription"
                    )}
                    className="border border-gray-400 rounded-md px-3 py-2 mt-3 w-full"
                  />
                </label>
              </div>
              <div className="mb-1">
                <label className="block mb-1">
                  <p className="font-bold">Category</p>
                  <select
                    value={companyBasicDetails.category}
                    onChange={handleInputChange(
                      setCompanyBasicDetails,
                      "category"
                    )}
                    className="border border-gray-400 rounded-md px-3 py-2 mt-3 w-full"
                  >
                    <option value="" defaultChecked>
                      Select Category
                    </option>
                    <option value="Technology">Technology</option>
                    <option value="Finance">Finance</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Retail">Retail</option>
                    <option value="Education">Education</option>
                  </select>
                </label>
              </div>
              <div className="mb-1 md:col-span-2">
                <label className="block mb-1">
                  <p className="font-bold mb-3">Company Description</p>
                  <ContentEditor
                    model={companyBasicDetails.contentData}
                    handleModelChange={handleContentChange(
                      setCompanyBasicDetails,
                      "contentData"
                    )}
                  />
                </label>
              </div>
              <div className="mb-1">
                <label className="block mb-1">
                  <p className="font-bold">Registration Date</p>
                  <input
                    type="date"
                    value={companyBasicDetails.registration}
                    onChange={handleInputChange(
                      setCompanyBasicDetails,
                      "registration"
                    )}
                    className="border border-gray-400 rounded-md px-3 py-2 mt-3 w-full"
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
                      setCompanyBasicDetails({
                        ...companyBasicDetails,
                        companyImage: event.target.files[0],
                      })
                    }
                    className="border border-gray-400 rounded-md px-3 py-2 mt-3 w-full"
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
              <div className="mb-1">
                <label className="block mb-1">
                  <p className="font-bold">Website</p>
                  <input
                    type="text"
                    value={companyBasicDetails.website}
                    onChange={handleInputChange(
                      setCompanyBasicDetails,
                      "website"
                    )}
                    className="border border-gray-400 rounded-md px-3 py-2 mt-3 w-full"
                  />
                </label>
              </div>
              <div className="mb-1">
                <label className="block mb-1">
                  <p className="font-bold">Facebook</p>
                  <input
                    type="url"
                    value={companyBasicDetails.facebook}
                    onChange={handleInputChange(
                      setCompanyBasicDetails,
                      "facebook"
                    )}
                    className="border border-gray-400 rounded-md px-3 py-2 mt-3 w-full"
                  />
                </label>
              </div>
              <div className="mb-1 md:col-span-2">
                <button
                  type="button"
                  onClick={nextTab}
                  className="bg-[#22c55e] text-white px-4 py-2 rounded-md mt-2 w-full"
                >
                  Next
                </button>
              </div>
            </div>

            <div
              className={
                activeTab === 2
                  ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                  : "hidden"
              }
            >
              {companyProductDetails.products.map((product, index) => (
                <div key={index} className="mb-4 md:col-span-2 rounded-md p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-1">
                      <label className="block mb-1">
                        <p className="font-bold">Product Name</p>
                        <input
                          type="text"
                          name="name"
                          value={product.name}
                          onChange={handleArrayChange(
                            setCompanyProductDetails,
                            "products",
                            index,
                            "name"
                          )}
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
                          onChange={handleImageChange(
                            setCompanyProductDetails,
                            "products",
                            index
                          )}
                          className="border border-gray-400 rounded-md px-3 py-2 mt-3 w-full"
                        />
                      </label>
                      {product.image && (
                        <img
                          src={URL.createObjectURL(product.image)}
                          alt="Product"
                          className="mt-2 max-w-[250px] h-[250px]"
                        />
                      )}
                    </div>
                  </div>
                  <div className="mb-1 md:col-span-2">
                    <label className="block mb-3">
                      <p className="font-bold mb-1">Product Description</p>
                      <ContentEditor
                        model={product.description}
                        handleModelChange={(data) =>
                          handleArrayChange(
                            setCompanyProductDetails,
                            "products",
                            index,
                            "description"
                          )({
                            target: { value: data },
                          })
                        }
                      />
                    </label>
                  </div>
                  {index === companyProductDetails.products.length - 1 && (
                    <button
                      type="button"
                      onClick={handleAddItem(
                        setCompanyProductDetails,
                        "products",
                        {
                          name: "",
                          description: "",
                          image: null,
                        }
                      )}
                      className="bg-[#22c55e] text-white px-3 py-[5px] rounded-md ml-2"
                    >
                      +
                    </button>
                  )}
                  {companyProductDetails.products.length > 1 && (
                    <button
                      type="button"
                      onClick={handleDeleteItem(
                        setCompanyProductDetails,
                        "products",
                        index
                      )}
                      className="bg-[#22c55e] text-white px-3 py-[8px] rounded-md ml-2"
                    >
                      <AiOutlineDelete />
                    </button>
                  )}
                </div>
              ))}
              <div className="mb-1 md:col-span-2">
                <button
                  type="button"
                  onClick={nextTab}
                  className="bg-[#22c55e] text-white px-4 py-2 rounded-md mt-2 w-full"
                >
                  Next
                </button>
              </div>
            </div>

            <div
              className={
                activeTab === 3
                  ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                  : "hidden"
              }
            >
              <div className="mb-1 md:col-span-2">
                <label className="block mb-1">
                  <p className="font-bold mb-3">Basic Company Description</p>
                  <ContentEditor
                    model={companyDetails.basicDescription}
                    handleModelChange={handleContentChange(
                      setCompanyDetails,
                      "basicDescription"
                    )}
                  />
                </label>
              </div>
              <div className="mb-1 md:col-span-2">
                <button
                  type="button"
                  onClick={nextTab}
                  className="bg-[#22c55e] text-white px-4 py-2 rounded-md mt-2 w-full"
                >
                  Next
                </button>
              </div>
            </div>

            <div
              className={
                activeTab === 4
                  ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                  : "hidden"
              }
            >
              {companyTimelineDetails.timelines.map((timeline, index) => (
                <div key={index} className="mb-4 md:col-span-2 rounded-md p-4">
                  <div className="mb-1 md:col-span-2">
                    <label className="block mb-1">
                      <p className="font-bold">Title</p>
                      <input
                        type="text"
                        name="name"
                        value={timeline.name}
                        onChange={handleArrayChange(
                          setCompanyTimelineDetails,
                          "timelines",
                          index,
                          "name"
                        )}
                        className="border border-gray-400 rounded-md px-3 py-2 mt-3 w-full"
                      />
                    </label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-1">
                      <label className="block mb-1">
                        <p className="font-bold">Date</p>
                        <input
                          type="date"
                          name="date"
                          value={timeline.date}
                          onChange={handleArrayChange(
                            setCompanyTimelineDetails,
                            "timelines",
                            index,
                            "date"
                          )}
                          className="border border-gray-400 rounded-md px-3 py-2 mt-3 w-full"
                        />
                      </label>
                    </div>
                    <div className="mb-1">
                      <label className="block mb-1">
                        <p className="font-bold">Image</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange(
                            setCompanyTimelineDetails,
                            "timelines",
                            index
                          )}
                          className="border border-gray-400 rounded-md px-3 py-2 mt-3 w-full"
                        />
                      </label>
                      {timeline.image && (
                        <img
                          src={URL.createObjectURL(timeline.image)}
                          alt="Timeline"
                          className="mt-2 max-w-[250px] h-[250px]"
                        />
                      )}
                    </div>
                  </div>
                  <div className="mb-1 md:col-span-2">
                    <label className="block mb-3">
                      <p className="font-bold mb-1">Description</p>
                      <ContentEditor
                        model={timeline.description}
                        handleModelChange={(data) =>
                          handleArrayChange(
                            setCompanyTimelineDetails,
                            "timelines",
                            index,
                            "description"
                          )({
                            target: { value: data },
                          })
                        }
                      />
                    </label>
                  </div>
                  {index === companyTimelineDetails.timelines.length - 1 && (
                    <button
                      type="button"
                      onClick={handleAddItem(
                        setCompanyTimelineDetails,
                        "timelines",
                        {
                          name: "",
                          date: "",
                          description: "",
                          image: null,
                        }
                      )}
                      className="bg-[#22c55e] text-white px-3 py-[5px] rounded-md ml-2"
                    >
                      +
                    </button>
                  )}
                  {companyTimelineDetails.timelines.length > 1 && (
                    <button
                      type="button"
                      onClick={handleDeleteItem(
                        setCompanyTimelineDetails,
                        "timelines",
                        index
                      )}
                      className="bg-[#22c55e] text-white px-3 py-[8px] rounded-md ml-2"
                    >
                      <AiOutlineDelete />
                    </button>
                  )}
                </div>
              ))}
              <div className="mb-1 md:col-span-2">
                <button
                  type="button"
                  onClick={nextTab}
                  className="bg-[#22c55e] text-white px-4 py-2 rounded-md mt-2 w-full"
                >
                  Next
                </button>
              </div>
            </div>

            <div
              className={
                activeTab === 5
                  ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                  : "hidden"
              }
            >
              <div className="mb-1">
                <label className="block mb-1">
                  <p className="font-bold">Business Type</p>
                  <select
                    value={targetMarketDetail.businesstype}
                    onChange={handleInputChange(
                      setTargetMarketDetail,
                      "businesstype"
                    )}
                    className="border border-gray-400 rounded-md px-3 py-2 mt-3 w-full"
                  >
                    <option value="" defaultChecked>
                      Select Business Type
                    </option>
                    <option value="B2B">B2B</option>
                    <option value="B2C">B2C</option>
                  </select>
                </label>
              </div>
              <div className="mb-1">
                <label className="block mb-1">
                  <p className="font-bold">Revenue Stream</p>
                  <input
                    type="text"
                    value={targetMarketDetail.revenueStream}
                    onChange={handleInputChange(
                      setTargetMarketDetail,
                      "revenueStream"
                    )}
                    className="border border-gray-400 rounded-md px-3 py-2 mt-3 w-full"
                  />
                </label>
              </div>
              <div className="mb-1 md:col-span-2">
                <label className="block mb-1">
                  <p className="font-bold mb-3">Market Description</p>
                  <ContentEditor
                    model={targetMarketDetail.marketDescription}
                    handleModelChange={handleContentChange(
                      setTargetMarketDetail,
                      "marketDescription"
                    )}
                  />
                </label>
              </div>
              <div className="mb-1 md:col-span-2">
                <button
                  type="button"
                  onClick={nextTab}
                  className="bg-[#22c55e] text-white px-4 py-2 rounded-md mt-2 w-full"
                >
                  Next
                </button>
              </div>
            </div>

            <div
              className={
                activeTab === 6
                  ? "grid grid-cols-1 md:grid-cols-2 gap-4"
                  : "hidden"
              }
            >
              {companyFundingDetails.fundings.map((funding, index) => (
                <div key={index} className="mb-4 md:col-span-2 rounded-md p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="mb-1">
                      <label className="block mb-1">
                        <p className="font-bold">Series Name</p>
                        <input
                          type="text"
                          value={funding.name}
                          onChange={handleArrayChange(
                            setCompanyFundingDetails,
                            "fundings",
                            index,
                            "name"
                          )}
                          className="border border-gray-400 rounded-md px-3 py-2 mt-3 w-full"
                        />
                      </label>
                    </div>
                    <div className="mb-1">
                      <label className="block mb-1">
                        <p className="font-bold">Date</p>
                        <input
                          type="date"
                          value={funding.date}
                          onChange={handleArrayChange(
                            setCompanyFundingDetails,
                            "fundings",
                            index,
                            "date"
                          )}
                          className="border border-gray-400 rounded-md px-3 py-2 mt-3 w-full"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="mb-1">
                    <label className="block mb-1">
                      <p className="font-bold">
                        Amount{" "}
                        <span className="text-[#56636A] text-[12px] ">
                          ( In Dollar in Millions )
                        </span>
                      </p>
                      <input
                        type="number"
                        value={funding.amount}
                        onChange={handleArrayChange(
                          setCompanyFundingDetails,
                          "fundings",
                          index,
                          "amount"
                        )}
                        className="border border-gray-400 rounded-md px-3 py-2 mt-3 w-full"
                      />
                    </label>
                  </div>
                  <div className="mb-1 md:col-span-2">
                    <label className="block mb-3">
                      <p className="font-bold mb-1">Funding Description</p>
                      <ContentEditor
                        model={funding.description}
                        handleModelChange={(data) =>
                          handleArrayChange(
                            setCompanyFundingDetails,
                            "fundings",
                            index,
                            "description"
                          )({
                            target: { value: data },
                          })
                        }
                      />
                    </label>
                  </div>
                  {index === companyFundingDetails.fundings.length - 1 && (
                    <button
                      type="button"
                      onClick={handleAddItem(
                        setCompanyFundingDetails,
                        "fundings",
                        {
                          name: "",
                          date: "",
                          amount: "",
                          description: "",
                        }
                      )}
                      className="bg-[#22c55e] text-white px-3 py-[5px] rounded-md ml-2"
                    >
                      +
                    </button>
                  )}
                  {companyFundingDetails.fundings.length > 1 && (
                    <button
                      type="button"
                      onClick={handleDeleteItem(
                        setCompanyFundingDetails,
                        "fundings",
                        index
                      )}
                      className="bg-[#22c55e] text-white px-3 py-[8px] rounded-md ml-2"
                    >
                      <AiOutlineDelete />
                    </button>
                  )}
                </div>
              ))}
              <div className="mb-1 md:col-span-2">
                <button
                  className="bg-[#22c55e] text-white px-4 py-2 rounded-md mt-2 w-full"
                  type="submit"
                >
                  Submit All Details
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AdminSideNav>
  );
};

export default AdminCompanyAddingForm;
