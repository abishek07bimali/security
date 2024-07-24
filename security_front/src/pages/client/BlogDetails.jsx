import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {
  getBlogsApi,
  getRecentBlogsApi,
  getSingleBlogApi,
} from "../../apis/api";
import ContentViewer from "../../component/ContentViewer";

const BlogDetails = () => {
  const [blogData, setBlogData] = useState([]);
  const [blogRelatedData, setBlogRelatedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await getSingleBlogApi(id);
        setBlogData(response.data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [id]);

  const [savedContent, setSavedContent] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getRecentBlogsApi(id);
        setBlogRelatedData(response?.data);
        console.log(id);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blogData) {
    return <div>Error loading blog data.</div>;
  }

  return (
    <div className="w-full font-[poppins] flex flex-wrap bg-white justify-center xs:pl-1\2">
      <div className="lg:w-4/6 md:w-full lg:pl-[10px] md:pl-[10px] py-16 xs:px-[20px] xss:px-[10px] justify-items-center">
        <div className="bg-white rounded-md p-4 justify-center">
          <div className="pt-4 md:w-4/4 items-stretch flex-col text-center">
            <h2 className="capitalize font-bold font-[Poppins] md:text-[45px] hover:text-[#F23F2D] xss:text-[25px]">
              {blogData.title}
            </h2>
            <p className="font-light font-[poppins] text-[17px] pt-4">
              {blogData.shortDescription}
            </p>
            <div className="w-full mt-14">
              <img
                src={blogData.image}
                className="w-full h-[300px] xss:h-[500px]"
                alt=""
              />
              <div className="flex flex-wrap m-1">
                <h6 className="font-light font-[poppins] text-[12px] pr-2">
                  {new Date(blogData.createdAt).toLocaleDateString("en-US", {
                    weekday: "long", // Display the full weekday name
                    month: "long", // Display the full month name
                    day: "numeric", // Display the day of the month
                    year: "numeric", // Display the year
                  })}
                </h6>
                <h6 className="font-light font-[poppins] text-[12px] pr-2 text-[#F23F2D]">
                  , {blogData.readingTime} min Read
                </h6>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col lg:flex-row bg-white rounded-md pt-2 pb-2 justify-center">
          <div className="md:w-full lg:w-4/6">
            <hr className="mt-1" />
            <div className="p-2 font-[Poppins]">
              <ContentViewer contents={blogData.description} />
            </div>
          </div>

          <div className="md:w-full lg:w-2/6">
            <div className="flex flex-wrap justify-center">
              {/* Map over the savedContent array to render all cards */}
              {blogRelatedData.map((article, index) => (
                <Link to={`/blog-details/${article._id}`} key={index}>
                  <div
                    className={`bg-white w-full md:w-[300px] sm:w-full pb-3 flex flex-col items-center ${
                      index === 0 ? "m-3 border-2 " : "m-3 "
                    }`}
                  >
                    {index === 0 ? (
                      <>
                        <div className="w-full overflow-hidden">
                          <img
                            src={article.image}
                            alt=""
                            className="w-full h-[120px]"
                          />
                        </div>
                        <div className="w-full flex flex-wrap pt-2 m-3">
                          <div className="flex w-1/6">
                            <h1 className="mr-1 ml-3">1</h1>
                          </div>
                          <div className="w-5/6 mb-4">
                          <h2 className="overflow-hidden overflow-ellipsis max-h-[1.5em] font-bold text-[#7E22CE] text-[12px] text-start font-[poppins] uppercase">
                            {article.title}

                            </h2>
                            <p className="max-h-[3em] text-black font-[Inter] font-bold text-[15px] pt-2 mr-1">
                              {article.title}
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex border-b-[3px] border-black justify-between mt-2">
                        <div className="w-3/6 flex flex-wrap m-3">
                          <div className="flex w-1/6">
                            <h1 className="mr-1">{index + 1}</h1>
                          </div>
                          <div className="w-5/6 mb-4">
                            <h2 className="overflow-hidden overflow-ellipsis max-h-[1.5em] font-bold text-[#7E22CE] text-[12px] text-start font-[poppins] uppercase">
                            {article.title}

                            </h2>
                            <p className="text-black font-[Inter] font-medium text-[14px] pt-1">
                              {article.title}
                            </p>
                          </div>
                        </div>
                        <div className="w-2/6 h-[70px] mr-3 items-center overflow-hidden rounded-md">
                          <img
                            src={article.image}
                            alt=""
                            className="w-full h-[100px] object-cover"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
