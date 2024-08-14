import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { getAllCompanyApi, getRecentAllBlogsApi } from "../../apis/api";

const HomePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [getAllCompany, setGetAllCompany] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [blogRelatedData, setBlogRelatedData] = useState([]);
  const [company, setCompany] = useState(false);


  useEffect(() => {
    getAllCompanyApi()
      .then((response) => {
        setGetAllCompany(response?.data.companies);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filtegreenCompanies = getAllCompany.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getRecentAllBlogsApi();
        setBlogRelatedData(response?.data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlog();
  }, []);


  useEffect(() => {
    if (user&& user.claimedCompany.length > 0) {
      setCompany(true);
    }
  }, [user && user.claimedCompany.length]);

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
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-1 w-full py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          {user && company ? (
            <Link
           
            className="w-full md:w-1/2 sm:w-1/2 py-2 bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
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
        <div className="lg:w-3/4 md:w-full lg:px-[50px] md:px-[50px] py-16 xs:px-[20px] xss:px-[10px] justify-items-center">
          <div className="justify-left">
            <div className="flex flex-wrap items-center pb-3">
              <FontAwesomeIcon
                icon={faSearch}
                className="pt-1 mr-2 bg-green-500 text-white p-1 text-[20px] font-bold rounded-full items-center"
              />
              <button className="font-bold text-[17px]">Featured</button>
            </div>
            <div className="flex flex-wrap justify-center">
              {filtegreenCompanies.map((company) => (
                <Link
                  key={company._id}
                  to={`/company-details/${company._id}`}
                  className="block bg-[#E2E8ED] w-full md:w-[320px] sm:w-full m-3 rounded-xl shadow-xl hover:scale-105 transition-transform"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-2/6 md:w-2/5 rounded-sm p-3">
                      <img
                        src={company.companyImage}
                        alt={company.name}
                        className="w-full rounded-sm"
                      />
                    </div>
                    <div className="w-4/6 md:w-3/4 pr-3">
                      <div className="flex items-stretch justify-between">
                        <h2 className="capitalize font-[poppins] text-[17px]">
                          {company.name}
                        </h2>
                        <h2 className="capitalize font-semibold text-[#3C4852] text-[12px]">
                          {company.businesstype}
                        </h2>
                      </div>
                      <div>
                        <p className="overflow-hidden overflow-ellipsis max-h-[3em] text-[#8C8C8C] font-[Inter] text-[14px] pt-1">
                          {company.companyDescription}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white h-[57px] rounded-br-sm capitalize text-[Inter] rounded-bl-sm flex justify-between items-center p-4">
                    <p className="text-[#8C8C8C] font-[Inter] text-[14px]">
                      <i className="fa-solid fa-tag mr-1"></i>{" "}
                      {company.category}
                    </p>
                    <p className="text-[#8C8C8C] font-[Inter] text-[14px]">
                      <i className="fa-solid fa-location-dot mr-1"></i>{" "}
                      {company.address}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="sm:w-full lg:w-1/5 md:w-full md:px-[80px] lg:px-[5px] xs:px-[20px] xss:px-[10px] my-11 py-5 rounded-2xl bg-[#F7F7F7] mr-1">
          <div className="flex flex-wrap items-center p-3">
            <FontAwesomeIcon
              icon={faNewspaper}
              className="pt-1 mr-2 bg-green-500 text-white p-1 text-[20px] font-bold rounded-full items-center"
            />
            <button className="font-bold text-[17px]">Latest News</button>
          </div>
          <div className="flex flex-wrap justify-center">
            {blogRelatedData.slice(0, 2).map((article, index) => (
              <div className="bg-white w-full md:w-[250px] sm:w-full m-3 rounded-xl shadow-xl">
                <div className="flex flex-col items-center">
                  <div className="w-3/6 md:w-3/5 tounded-xl overflow-hidden mt-1">
                    <img
                      src={article.image}
                      alt=""
                      className="w-full h-[100px] object-cover"
                    />
                  </div>
                  <div className="w-4/6 md:w-3/4 p-4">
                    <div className="pt-4 flex items-center justify-center">
                      <h2 className="overflow-hidden overflow-ellipsis max-h-[3em] capitalize font-bold text-[#3C4852] text-[15px] text-center">
                        {article.shortDescription}
                      </h2>
                    </div>
                    <div className="justify-center items-center text-center">
                      <p className="overflow-hidden overflow-ellipsis max-h-[5em] text-[#8C8C8C] font-[Inter] text-[14px] m-1">
                        {article.title}
                      </p>
                      <Link
                        to={`/blog-details/${article._id}`}
                        key={index}
                        className="text-green-500"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
