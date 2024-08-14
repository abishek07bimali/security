import { React, useState, useEffect } from "react";
import ContentViewer from "../../component/ContentViewer";
import {
  claimCompanyApi,
  getAllNewCompanyApi,
  getCategoryCompanyApi,
  getSingleCompanyApi,
} from "../../apis/api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CompanyDetails = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [activeTab, setActiveTab] = useState("round1");
  const { id } = useParams();
  const [companyContent, setCompanyContent] = useState(null);
  const [companyCategories, setCompanyCategories] = useState({
    Technology: [],
    Finance: [],
    Healthcare: [],
    Retail: [],
    Education: [],
  });
  const [claimCompany, setClaimCompany] = useState(false);
  const [uploadedImage1, setUploadedImage1] = useState(null);
  const [uploadedImage2, setUploadedImage2] = useState(null);
  const [imagePreviewUrl1, setImagePreviewUrl1] = useState(null);
  const [imagePreviewUrl2, setImagePreviewUrl2] = useState(null);
  const [loading, setIsloading] = useState(false);


  const [newCompany, setNewCompany] = useState([]);

  const [formData, setFormData] = useState({
    fullName: user?.username || "",
    email: user?.email || "",
    phoneNumber: user?.phone || "",
    position: "",
    userId: user?._id || "",
    document1: imagePreviewUrl1,
    document2: imagePreviewUrl2,
  });

  useEffect(() => {
    getSingleCompanyApi(id)
      .then((response) => {
        setCompanyContent(response?.data.companies[0]);
      })
      .catch((error) => {
        console.error("Error fetching content:", error);
      });
  }, [id]);

  useEffect(() => {
    const categories = [
      "Technology",
      "Finance",
      "Healthcare",
      "Retail",
      "Education",
    ];
    categories.forEach((category) => {
      getCategoryCompanyApi(category)
        .then((response) => {
          setCompanyCategories((prevState) => ({
            ...prevState,
            [category]: response?.data.companies,
          }));
        })
        .catch((error) => {
          console.error(`Error fetching ${category} companies:`, error);
        });
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllNewCompanyApi();
        setNewCompany(res?.data?.companies || []);
      } catch (error) {
        console.error("Error fetching new companies:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsloading(true);
  
    // Create an instance of FormData
    const submissionData = new FormData();
  
    // Append user input fields
    // submissionData.append("user_id", formData.userId);
    submissionData.append("company_id", id);
    submissionData.append("position", formData.position);
  
    // Append image files if they exist
    if (uploadedImage1) {
      submissionData.append("document1", uploadedImage1);
    }
    if (uploadedImage2) {
      submissionData.append("document2", uploadedImage2);
    }
  
    // API call to submit the form data
    claimCompanyApi(submissionData)
      .then(res => {
        if (res.data.success) {
          toast.success(res.data.message);
          handleCloseModal(); // Resets and closes the modal form
          setIsloading(false)
        } else {
          toast.error(res.data.error);
        }
      })
      .catch(error => {
        console.error("Error submitting claim:", error);
        toast.error("Failed to submit the claim.");
      });
  };
  
  const handleCloseModal = () => {
    setClaimCompany(false);
    setUploadedImage1(null);
    setImagePreviewUrl1(null);
    setUploadedImage2(null);
    setImagePreviewUrl2(null);
  };

  const handleClaimModel = () => {
    setClaimCompany(true);
  };

  const handleImageChange1 = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage1(file);
      setImagePreviewUrl1(URL.createObjectURL(file));
    }
  };

  const handleImageChange2 = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage2(file);
      setImagePreviewUrl2(URL.createObjectURL(file));
    }
  };

  if (!companyContent) {
    return <div>Loading...</div>;
  }

  const totalFunding = companyContent.fundings.reduce(
    (acc, funding) => acc + funding.amount,
    0
  );
  const openNewTab = () => {
    if (companyContent) {
      window.open(companyContent.website, "_blank", "noopener,noreferrer");
    }
  };

  const renderCategoryCompanies = (category, number) => {
    return (
      <div className="bg-white rounded-md">
        <h2 className="capitalize font-bold font-[poppins] text-[18px] mt-4 p-3">
          {category}
        </h2>
        {companyCategories[category].slice(0, number).map((company) => (
          <a href={`/company-details/${company._id}`} key={company._id}>
            <div className="flex items-center justify-between mt-2">
              <div className="lg:w-1/5 md:w-2/5 rounded-sm">
                <img
                  src={company.companyImage}
                  alt={company.name}
                  className="w-full rounded-sm pb-2 pl-2"
                />
              </div>
              <div className="w-4/5 md:w-3/4 pl-1">
                <p className="text-black font-[Inter] text-[14px]">
                  {company.companyDescription}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="w-full font-[Inter] flex flex-wrap bg-[#ECECEC] justify-center">
        <div className="lg:w-3/6 md:w-full lg:pl-[10px] md:pl-[10px] py-16 xs:px-[20px] xss:px-[10px] justify-items-center ">
          <div className="bg-white rounded-md p-4 shadow-md">
            <div className="flex">
              <div className="lg:w-[200px] md:w-2/5 rounded-sm p-4">
                <img
                  src={companyContent.companyImage}
                  alt={companyContent.name}
                  className="w-4/5 rounded-sm shadow-md h-[170px] border border-black-1"
                />
              </div>
              <div className="pt-4 lg:w-5/6 md:w-3/5 items-stretch flex-col justify-between">
                <h2 className="capitalize font-bold font-[Poppins] text-[37px] hover:text-[#22c55e]">
                  {companyContent.name}
                </h2>
                <p className="capitalize font-normal font-[Poppins] text-[13px] text-[#56636A]  mr-2">
                  <ContentViewer
                    contents={companyContent.contentData}
                    fontSize={13}
                  />
                </p>
                <p className="text-[#56636A] mt-2 p-2 capitalize font-[Inter] text-[12px]">
                  <i className="fa-solid fa-tag mr-1"></i>
                  {companyContent.category}
                </p>
                <div className="flex justify-between  items-center">
                  <p className="text-[#151515]  mt-2 capitalize font-[Inter] text-[14px] m-1">
                    <a
                      href={companyContent.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-facebook m-2 text-[25px]"></i>
                    </a>
                    <a href="/" target="_blank" rel="noopener noreferrer">
                      <i className="fa-brands fa-instagram m-2 text-[25px]"></i>
                    </a>
                    <a href="/" target="_blank" rel="noopener noreferrer">
                      <i className="fa-brands fa-linkedin m-2 text-[25px]"></i>
                    </a>
                    <a href="/" target="_blank" rel="noopener noreferrer">
                      <i className="fa-brands fa-twitter m-2 text-[25px]"></i>
                    </a>
                  </p>

                  {user ? (
                    <>
                      {companyContent.isClaimed ? (
                        ""
                      ) : (
                        <button
                          onClick={handleClaimModel}
                          className="  text-green-500 rounded-lg font-bold text-[17px] py-2 px-2 capitalize border border-green-500"
                        >
                          claim Company
                        </button>
                      )}
                    </>
                  ) : null}
                </div>
              </div>
            </div>
            <hr className="mt-4" />
            <div>
              <h2 className="capitalize font-bold font-[poppins] text-[24px] mt-4 p-3">
                Products Or Services
              </h2>
              <div className="flex flex-wrap">
                {companyContent.products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white w-full md:w-[300px] sm:w-full rounded-md border border-black-2 hover:scale-105 hover:shadow-lg transition-transform m-2"
                  >
                    <div className="flex flex-col items-start m-3">
                      <div className="w-2/6 md:w-2/5  overflow-hidden m-2 shadow-md">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <div className="pt-1 flex">
                          <h2 className="capitalize font-bold  text-[17px]">
                            {product.name}
                          </h2>
                        </div>
                        <div className="justify-center items-center text-justify text-[#56636A]">
                          <ContentViewer
                            contents={product.description}
                            fontSize={14}
                            fontFamily={"Inter"}
                          />
                          <hr className="mt-10" />
                          <button
                            onClick={openNewTab}
                            className="text-[#22c55e] border border-[#22c55e] pl-3 pr-3 mt-3 p-1 rounded-md"
                          >
                            Learn More
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <hr className="mt-4" />
            <div>
              <h2 className="capitalize font-bold font-[poppins] text-[24px] mt-4 p-3">
                Basic Information
              </h2>
              <ContentViewer
                contents={companyContent.basicDescription}
                fontSize={15}
                color={"#56636A"}
                paddingleft={10}
              />
              <div className="grid grid-cols-6 p-1 text-[15px]">
                <div className="col-span-2">
                  <p className="m-1 font-[poppins]">
                    <strong className="text-[#1D2F3]">Legal Name</strong>
                  </p>
                </div>
                <div className="col-span-3">
                  <p className="m-1 font-[poppins] text-[#56636A]">
                    : {companyContent.name}
                  </p>
                </div>
              </div>
            </div>
            <hr className="mt-4" />
            <div>
              <h2 className="capitalize font-bold font-[poppins] text-[24px] mt-4 p-3">
                Timeline
              </h2>
              {companyContent.timelines.map((timeline) => (
                <div
                  key={timeline._id}
                  className="p-1 text-[15px] w-full flex justify-center items-center relative"
                  style={{ height: "250px" }}
                >
                  <div
                    className="absolute"
                    style={{
                      top: "0",
                      left: "30%",
                      transform: "translateX(-50%)",
                    }}
                  >
                    <div className="flex justify-center items-center h-[56px] w-[56px] bg-[#56636A] rounded-full">
                      <h3 className="text-white font-bold font-[poppins]">
                        {new Date(timeline.date).getFullYear()}
                      </h3>
                    </div>
                  </div>
                  <div
                    className="absolute"
                    style={{
                      top: "56px",
                      left: "30%",
                      transform: "translateX(-50%)",
                    }}
                  >
                    <div
                      className="w-[1px] bg-[#56636A]"
                      style={{ height: "150px" }}
                    ></div>
                  </div>
                  <div
                    className="absolute"
                    style={{ top: "125px", left: "calc(30% - 25px)" }}
                  >
                    <div
                      className="h-[3px] bg-[#56636A]"
                      style={{ width: "150px" }}
                    ></div>
                  </div>
                  <div
                    className="absolute"
                    style={{
                      top: "calc(50% - 25px)",
                      left: "calc(30% - 75px)",
                    }}
                  >
                    <div className="flex justify-center items-center h-[50px] w-[50px] border-[3px] border-[#56636A] rounded-full">
                      <img
                        src={timeline.image}
                        className="h-[30px] w-[30px]"
                        alt={timeline.name}
                      />
                    </div>
                  </div>
                  <div
                    className="absolute "
                    style={{
                      top: "calc(50% - 15px)",
                      left: "calc(30% + 25px)",
                    }}
                  >
                    <div className="h-[90px] w-[420px]   bg-white border-l-[3px] border-[#56636A] pl-3">
                      <h6 className="font-[poppins] font-semibold text-[#56636A] text-[14px]">
                        {`${new Date(timeline.date).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                          }
                        )} |`}
                        {timeline.name}
                      </h6>
                      <p className="font-[poppins] font-normal text-[#56636A] text-[12px] text-justify">
                        <ContentViewer contents={timeline.description} />
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <hr className="mt-4" />
            <div>
              <h2 className="capitalize font-bold font-[poppins] text-[24px] mt-4 p-3">
                Revenue Stream
              </h2>
              <div className="flex flex-wrap m-4">
                <button className="pr-4 pl-4 p-1 border-2 border-[#22c55e] rounded-[50px] m-2">
                  <a
                    href="#"
                    target="_blank"
                    className="text-[#22c55e] capitalize"
                  >
                    {companyContent.revenueStream}
                  </a>
                </button>
              </div>
            </div>
            <hr className="mt-4" />
            <div>
              <h2 className="capitalize font-bold font-[poppins] text-[24px] mt-4 p-3">
                Target Market
              </h2>
              <div className="flex flex-wrap m-1">
                <h4 className="pr-2 pl-2 p-0.5 border-2 border-[#56636A] rounded-lg m-2 text-white bg-[#56636A]">
                  {companyContent.businesstype}
                </h4>
              </div>
              <ContentViewer
                contents={companyContent.marketDescription}
                color={"#56636A"}
                fontSize={15}
                paddingleft={10}
              />
            </div>
            <hr className="mt-4" />
            <div>
              <h2 className="capitalize font-bold font-[poppins] text-[24px] mt-4 p-3">
                Funding
              </h2>
              <div
                className="p-1 text-[15px] w-full flex justify-center items-center relative"
                style={{ height: "180px" }}
              >
                <div
                  className="absolute"
                  style={{
                    top: "0",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <div className="flex justify-center items-center h-[160px] w-[160px] bg-white border-2 border-[#56636A]  rounded-full">
                    <div className="text-center">
                      <h3 className="text-[#56636A] font-bold font-[poppins] text-[17px]">
                        Total Funding
                      </h3>
                      <h3 className="text-[#56636A] font-bold font-[poppins] text-[25px]">
                        ${totalFunding.toLocaleString()}M
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr className="mt-4" />
            <div>
              <h2 className="capitalize font-bold font-[poppins] text-[19px] mt-4 p-3">
                Detail Round Breakdown
              </h2>
              <div className="flex flex-col w-full">
                <div className="flex w-full justify-start p-2 capitalize">
                  {companyContent.fundings.map((funding, index) => (
                    <div
                      key={funding._id}
                      className={`p-3 flex items-center cursor-pointer ${
                        activeTab === `round${index + 1}`
                          ? "text-[#22c55e] font-bold border-b-2 border-[#22c55e] text-[20px]"
                          : "text-gray-500 text-[18px]"
                      }`}
                      onClick={() => setActiveTab(`round${index + 1}`)}
                    >
                      {`Round ${index + 1}`}
                    </div>
                  ))}
                </div>
                <div className="flex w-full mt-4">
                  <div
                    className="p-1 text-[15px] flex justify-center items-center relative w-1/4"
                    style={{ height: "180px" }}
                  >
                    <div
                      className="absolute"
                      style={{
                        top: "0",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    >
                      <div className="flex justify-center items-center h-[80px] w-[80px] bg-white border-2 border-[#56636A] rounded-full">
                        <div className="text-center">
                          <h3 className="text-[#56636A] font-bold font-[poppins] text-[20px]">
                            $
                            {
                              companyContent.fundings.find(
                                (funding) =>
                                  activeTab ===
                                  `round${
                                    companyContent.fundings.indexOf(funding) + 1
                                  }`
                              ).amount
                            }
                            M
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-3/5">
                    <TabContent
                      activeTab={activeTab}
                      fundings={companyContent.fundings}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:w-full lg:w-[400px] md:w-full md:px-[80px] lg:px-[5px] xs:px-[20px] xss:px-[10px] my-7 py-5 -2xl mr-1">
          {renderCategoryCompanies("Technology", 0)}
          {renderCategoryCompanies("Finance", 2)}
          {renderCategoryCompanies("Healthcare")}
          {renderCategoryCompanies("Retail")}
          {renderCategoryCompanies("Education")}
        </div>
      </div>
      <div className="w-full font-[Inter] flex flex-wrap bg-[#ECECEC] justify-center p-5">
  <div className="w-full lg:w-9/12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
    <h2 className="col-span-full capitalize font-bold font-[poppins] text-[24px] p-3">
      New Companies
    </h2>
    {newCompany.length === 0 ? (
      <p className="col-span-full text-center">No new companies added yet.</p>
    ) : (
      newCompany.slice(0, 4).map((company) => (
        <a
          href={`/company-details/${company._id}`}
          key={company._id}
          className="bg-white rounded-md shadow-lg"
        >
          <div className="flex flex-col items-center justify-between p-4">
            <div className="w-full rounded-sm mb-2">
              <img
                src={company.companyImage}
                alt={company.name}
                className="w-full rounded-sm"
              />
            </div>
            <div className="w-full">
              <p className="text-black font-[Poppins] text-[13px] text-justify ">
                {company.companyDescription}
              </p>
            </div>
          </div>
        </a>
      ))
    )}
  </div>
</div>

      {claimCompany && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white w-[900px] p-6 rounded-md shadow-md">
            <h2 className="text-[20px] font-bold mb-4">Claim Company</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 p-2 rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 p-2 rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 p-2 rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Position in Company
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 p-2 rounded-md"
                      required
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Document Required (1){" "}
                      <span className="text-gray-400 font-bold ">
                        ( Company registration paper )
                      </span>
                    </label>
                    <input
                      type="file"
                      name="document1"
                      className="w-full border border-gray-300 p-2 rounded-md"
                      required
                      onChange={handleImageChange1}
                    />
                  </div>
                  {imagePreviewUrl1 && (
                    <div className="mb-4">
                      <img
                        src={imagePreviewUrl1}
                        alt="Uploaded Preview 1"
                        className="w-full  object-cover rounded-md max-w-[150px] h-[150px] "
                      />
                    </div>
                  )}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Document Required (2){" "}
                      <span className="text-gray-400 font-bold ">
                        ( Company Owner Citizenship )
                      </span>
                    </label>
                    <input
                      type="file"
                      name="document2"
                      className="w-full border border-gray-300 p-2 rounded-md "
                      required
                      onChange={handleImageChange2}
                    />
                  </div>
                  {imagePreviewUrl2 && (
                    <div className="mb-4">
                      <img
                        src={imagePreviewUrl2}
                        alt="Uploaded Preview 2"
                        className="w-full max-w-[150px] h-[150px] object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                   {loading ? (
                      <>
                        <div class="text-center">
                          <div role="status">
                            <svg
                              aria-hidden="true"
                              class="inline w-8 h-8 text-gray-200 animate-spin  fill-white"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                            <span class="sr-only">Submit</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      "Verify"
                    )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

const TabContent = ({ activeTab, fundings }) => {
  const currentFunding = fundings.find(
    (funding, index) => activeTab === `round${index + 1}`
  );

  if (!currentFunding) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-6 p-1 text-[15px]">
        <div className="col-span-2">
          <p className="m-1 font-[poppins]">
            <strong className="text-[#1D2F3]">Series Name</strong>
          </p>
        </div>
        <div className="col-span-3">
          <p className="m-1 font-[poppins] text-[#56636A] capitalize">
            : {currentFunding.name}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-6 p-1 text-[15px]">
        <div className="col-span-2">
          <p className="m-1 font-[poppins]">
            <strong className="text-[#1D2F3]">Date</strong>
          </p>
        </div>
        <div className="col-span-3">
          <p className="m-1 font-[poppins] text-[#56636A]">
            {(() => {
              const date = new Date(currentFunding.date);
              const day = date.getDate();
              const month = date.toLocaleString("en-US", { month: "short" });
              const year = date.getFullYear();
              const getOrdinalSuffix = (day) => {
                if (day > 3 && day < 21) return "th"; // Handle special case
                switch (day % 10) {
                  case 1:
                    return "st";
                  case 2:
                    return "nd";
                  case 3:
                    return "rd";
                  default:
                    return "th";
                }
              };
              return `: ${day}${getOrdinalSuffix(day)} ${month} ${year}`;
            })()}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-6 p-1 text-[15px]">
        <div className="col-span-2">
          <p className="m-1 font-[poppins]">
            <strong className="text-[#1D2F3]">Description</strong>
          </p>
        </div>
        <div className="col-span-3">
          <p className="m-1 font-[poppins] text-[#56636A]">
            : <ContentViewer contents={currentFunding.description} />
          </p>
        </div>
      </div>
    </>
  );
};

export default CompanyDetails;
