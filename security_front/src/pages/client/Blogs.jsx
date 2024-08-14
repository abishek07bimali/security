import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faRotate,
  faPaperPlane,
  faCircleXmark,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { getBlogsApi, getWorkDomainApi } from "../../apis/api";

const AddBlogs = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [savedContent, setSavedContent] = useState([]);
  const [getWorkDomain, setgetWorkDomain] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [company, setCompany] = useState(false);

  const filterOptions = ["ourStory", "Tech", "Finance", "Health", "Education"];
  const filterOptionsAuthors = [
    "ourStory ourStory",
    "Tech ourStory",
    "Finance ourStory",
    "Health ourStory",
    "Education ourStory",
  ];

  const handleFilterClick = (filter) => {
    setSelectedFilters((prevSelected) =>
      prevSelected.includes(filter)
        ? prevSelected.filter((item) => item !== filter)
        : [...prevSelected, filter]
    );
  };

  const handleClearFilters = () => {
    setSelectedFilters([]);
  };

  const handleFilterAuthorsClick = (filter) => {
    setSelectedFilters((prevSelected) =>
      prevSelected.includes(filter)
        ? prevSelected.filter((item) => item !== filter)
        : [...prevSelected, filter]
    );
  };

  const handleShowSidebar = () => {
    setIsSidebarVisible(true);
  };

  const handleHideSidebar = () => {
    setIsSidebarVisible(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    getBlogsApi()
      .then((response) => {
        setSavedContent(response?.data);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  useEffect(() => {
    getWorkDomainApi()
      .then((response) => {
        setgetWorkDomain(response?.data);
      })
      .catch((error) => {
        console.error("Error fetching work domains:", error);
      });
  }, []);

  useEffect(() => {
    if (user && user.claimedCompany.length > 0) {
      setCompany(true);
    }
  }, [user && user.claimedCompany.length]);
  
  // Filter the blogs based on selected filters and search term
  const filteredBlogs = savedContent.filter((blog) => {
    const tags = Array.isArray(blog.tags) ? blog.tags : [blog.tags];
    const matchesFilters =
      selectedFilters.length === 0 ||
      selectedFilters.some((filter) => tags.includes(filter));
    const matchesSearchTerm =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilters && matchesSearchTerm;
  });

  return (
    <>
      <div className="bg-[#a5b4fc] min-h-[60vh] md:min-h-[60vh] font-[Cambria] flex justify-center items-center">
        <div className="flex flex-col justify-center items-center text-center sm:px-2 xs:p-3">
          <div className="mb-4">
            <h3 className="font-[Poppins] text-white font-medium">
              BusinessTour
            </h3>
            <h3 className="font-[Poppins] text-white font-medium">
              Nepalese Company Database with Accurate Information
            </h3>
          </div>

          <div className="mb-4 w-full flex items-center">
            <FontAwesomeIcon
              icon={faSearch}
              className="bg-white py-3 px-3 text-gray-500"
            />
            <input
              type="text"
              placeholder="search blogs....."
              className="pl-1 w-full py-2 focus:outline-none focus:border-blue-500"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          {user && company ? (
            <Link className="w-full md:w-1/2 sm:w-1/2 py-2 bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:bg-green-600">
              Explore the site<i className="fa-solid fa-globe pl-2"></i>
            </Link>
          ) : (
            <Link
              to={"/add-company-form"}
              className="w-full md:w-1/2 sm:w-1/2 py-2 bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:bg-green-600"
            >
              List Your Company <i className="fa-solid fa-globe pl-2"></i>
            </Link>
          )}
        </div>
      </div>

      <div className="w-full font-[Inter] flex flex-wrap">
        <button
          className="lg:hidden m-4 text-gray-500 p-2 px-4 sm:px-10"
          onClick={handleShowSidebar}
        >
          Show Filters
          <FontAwesomeIcon
            icon={faPaperPlane}
            className="bg-white  px-3 text-gray-500"
          />
        </button>

        <div
          className={`fixed top-24 left-0 h-full overflow-scroll md:overflow-auto w-4/5 md:w-2/5 bg-white z-50 md:z-0 lg:static lg:w-1/5 lg:flex flex-col transition-transform duration-300 ${
            isSidebarVisible
              ? "slide-in shadow-2xl"
              : "slide-out hidden lg:block "
          }`}
        >
          <div className="flex justify-end mt-2 w-full">
            <button
              className="lg:hidden text-black p-2 rounded-md"
              onClick={handleHideSidebar}
            >
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="bg-white py-3 px-3 text-gray-500"
              />
            </button>
          </div>
          <div className="flex flex-wrap p-3 items-start w-4/4 mt-2 md:mt-10 self-end sm:w-3/4">
            <p className="p-3 mr-2 font-bold text-[17px] font-[poppins]">
              Filters
            </p>
            <button
              className="p-3 ml-2 font-normal text-[14px] text-[#21243D] font-[poppins]"
              onClick={handleClearFilters}
            >
              <FontAwesomeIcon
                icon={faRotate}
                className="text-[#21243D] pr-1 h-[12px] w-[12px] font-[poppins]"
              />
              Clear Filters
            </button>
          </div>
          <hr className="mt-4" />
          <div className="flex flex-col items-start w-3/4 mt-6 self-end">
            <p className="p-3 font-medium text-[17px] font-[poppins] uppercase">
              Brands
            </p>
            <div className="mt-4 w-full flex flex-wrap justify-start">
              {filterOptions.map((filter) => (
                <button
                  key={filter}
                  className={`text-center pt-1 pb-1 p-3 border-2 rounded-[50px] m-1 ${
                    selectedFilters.includes(filter)
                      ? "border-[#22c55e] bg-[#22c55e] text-white"
                      : "border-[#7c8392] text-[#21243D]"
                  }`}
                  onClick={() => handleFilterClick(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start w-3/4 mt-6 self-end">
            <p className="p-3 font-medium text-[17px] font-[poppins] uppercase">
              Authors
            </p>
            <div className="mt-4 w-full flex flex-wrap justify-start">
              {filterOptionsAuthors.map((filter) => (
                <button
                  key={filter}
                  className={`text-center pt-1 pb-1 p-3 border-2 rounded-[50px] m-1 ${
                    selectedFilters.includes(filter)
                      ? "border-[#22c55e] bg-[#22c55e] text-white"
                      : "border-[#7c8392] text-[#21243D]"
                  }`}
                  onClick={() => handleFilterAuthorsClick(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start w-3/4 mt-6 self-end">
            <p className="p-3 font-medium text-[17px] font-[poppins] uppercase">
              Domains
            </p>
            <div className="mt-4 w-full flex flex-wrap justify-start">
              {getWorkDomain.map((filter) => (
                <button
                  key={filter._id} // Using _id as the key
                  className={`text-center pt-1 pb-1 p-3 border-2 rounded-[50px] m-1 ${
                    selectedFilters.includes(filter.workDomain)
                      ? "border-[#22c55e] bg-[#22c55e] text-white"
                      : "border-[#7c8392] text-[#21243D]"
                  }`}
                  onClick={() => handleFilterAuthorsClick(filter.workDomain)}
                >
                  {filter.workDomain} {/* Rendering workDomain */}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* main body area */}
        <div className="lg:w-3/4 md:w-full lg:px-[50px] md:px-[50px] py-16 xs:px-[20px] xss:px-[10px] justify-items-center">
          <div className="justify-left">
            <div className="flex flex-wrap items-center pb-3">
              <FontAwesomeIcon
                icon={faNewspaper}
                className="pt-1 mr-2 bg-[#22c55e] text-white p-1 text-[15px] font-bold rounded-full items-center"
              />
              <button className="font-bold text-[17px]">Featured</button>
            </div>
            <div className="flex flex-wrap justify-center">
              {filteredBlogs.map((blog) => (
                <Link
                  key={blog.id}
                  to={`/blog-details/${blog._id}`}
                  className="block bg-[#E2E8ED] w-full md:w-[265px] sm:w-full m-3 rounded-lg shadow-2xl hover:scale-105 transition-transform"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-full md:w-full rounded-lg">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-[136px] rounded-tl-lg rounded-tr-lg"
                      />
                    </div>
                  </div>
                  <div className="bg-white rounded-br-lg capitalize text-[Inter] rounded-bl-lg justify-between items-center p-4">
                    <p className="text-black font-[Inter] font-bold text-[12px] mb-3">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-black font-[Inter] font-medium text-[16px] ">
                      {blog.title}
                    </p>
                    <h4 className="font-[Inter] text-[14px] mb-3 mt-4">
                      <span className="bg-[#FFF5F4] text-[#22c55e] pl-1 pr-1 p-1 rounded-sm uppercase">
                        {Array.isArray(blog.tags)
                          ? blog.tags.join(", ")
                          : blog.tags}
                      </span>
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBlogs;
