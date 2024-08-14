import { React, useState,useEffect } from "react";
import ContentViewer from "../../component/ContentViewer";
import { getContentsApi } from "../../apis/api";

const CompanyDetails = () => {
  const [activeTab, setActiveTab] = useState("round1");

  const [savedContent, setSavedContent] = useState([]);

  useEffect(() => {
    // Fetch saved content when component mounts
    getContentsApi()
      .then((response) => {
        console.log("Saved Content:", response.data); // Log the data to see its structure
        setSavedContent(response?.data);
      })
      .catch((error) => {
        console.error("Error fetching content:", error);
      });
  }, []);

  return (
    <div className="w-full font-[Inter] flex flex-wrap bg-[#ECECEC] justify-center">
      <div className="lg:w-3/6 md:w-full lg:pl-[10px] md:pl-[10px] py-16 xs:px-[20px] xss:px-[10px] justify-items-center ">
        <div className="bg-white rounded-md p-4 shadow-md ">
          <div className="flex ">
            <div className="lg:w-[200px] md:w-2/5 rounded-sm p-4">
              <img
                src="/images/company.png"
                alt=""
                className="w-4/5 rounded-sm shadow-md h-[170px] border border-black-1"
              />
            </div>
            <div className="pt-4 lg:w-5/6 md:w-3/5 items-stretch flex-col justify-between">
              <h2 className="capitalize font-bold font-[Poppins] text-[37px] hover:text-[#22c55e]">
                Facebook
              </h2>
              <p className="capitalize font-normal font-[poppins] text-[13px] text-[#56636A]  mr-2">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta
                perferendis cupiditate neque. Eaque voluptatum, quidem dicta,
                expedita voluptates quibusdam quos animi tempora possimus
                excepturi aspernatur quaerat eius id illo itaque.
                          {/* <ContentViewer contents={savedContent} /> */}

              </p>

              <p className="text-[#56636A] mt-2 p-2 capitalize font-[Inter] text-[12px]">
                <i className="fa-solid fa-tag mr-1"></i>technology
              </p>
              <p className="text-[#151515]  mt-2 capitalize font-[Inter] text-[14px] m-1">
                <a href="/" target="_blank" rel="noopener noreferrer">
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
              {/* <a
              href=""
              className="text-red-500 text-[Inter] text-[16px] capitalize mt-4 font-semibold"
            >
              Visit Website
            </a> */}
            </div>
          </div>
          <hr className="mt-4" />
          <div>
            <h2 className="capitalize font-bold font-[poppins] text-[24px] mt-4 p-3">
              Products Or Services
            </h2>
            <div className="flex flex-wrap">
              <div className="bg-white w-full md:w-[300px] sm:w-full rounded-md border border-black-2 hover:scale-105 hover:shadow-lg transition-transform m-2">
                <div className="flex flex-col items-start m-3">
                  <div className="w-2/6 md:w-2/5  overflow-hidden m-2 shadow-md">
                    <img
                      src="/images/company.png"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 ">
                    <div className="pt-1 flex ">
                      <h2 className="capitalize font-bold  text-[17px]  ">
                        Company Name
                      </h2>
                    </div>
                    <div className="justify-center items-center text-justify">
                      {" "}
                      <p className=" text-[#8C8C8C] font-[Inter] text-[14px] m-1">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Praesentium, vero esse eos nisi minus deserunt
                        pariatur molestias expedita quo possimus illum cum
                        soluta sunt aspernatur debitis rerum commodi? Debitis,
                        ipsam?
                      </p>
                      <hr className="mt-10" />
                      <button className="text-[#22c55e] border border-[#22c55e] pl-3 pr-3 mt-3 p-1 rounded-md">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white w-full md:w-[300px] sm:w-full rounded-md border border-black-2 hover:scale-105 hover:shadow-lg transition-transform m-2">
                <div className="flex flex-col items-start m-3">
                  <div className="w-2/6 md:w-2/5  overflow-hidden m-2 shadow-md">
                    <img
                      src="/images/company.png"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 ">
                    <div className="pt-1 flex ">
                      <h2 className="capitalize font-bold  text-[17px]  ">
                        Company Name
                      </h2>
                    </div>
                    <div className="justify-center items-center text-justify">
                      {" "}
                      <p className=" text-[#8C8C8C] font-[Inter] text-[14px] m-1">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Praesentium, vero esse eos nisi minus deserunt
                        pariatur molestias expedita quo possimus illum cum
                        soluta sunt aspernatur debitis rerum commodi? Debitis,
                        ipsam?
                      </p>
                      <hr className="mt-10" />
                      <button className="text-[#22c55e] border border-[#22c55e] pl-3 pr-3 mt-3 p-1 rounded-md">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="bg-white w-full md:w-[300px] sm:w-full rounded-md border border-black-2 hover:scale-105  hover:shadow-lg transition-transform m-[100px]">
                <div className="flex flex-col items-start m-3">
                  <div className="   top-[-50px] shadow-md absolute">
                    <img
                      src="/images/company.png"
                      alt=""
                      className="block "
                    />
                  </div>
                  <div className="p-3 ">
                    <div className="pt-1 flex ">
                      <h2 className="capitalize font-bold text-[17px] ">
                        Company Name
                      </h2>
                    </div>
                    <div className="justify-center items-center text-justify">
                      {" "}
                      <p className=" text-[#8C8C8C] font-[Inter] text-[14px] m-1">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Praesentium, vero esse eos nisi minus deserunt
                        pariatur molestias expedita quo possimus illum cum
                        soluta sunt aspernatur debitis rerum commodi? Debitis,
                        ipsam?
                      </p>
                      <button className="text-red-600 border border-red-600 pl-3 pr-3 mt-3 p-1 rounded-md">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <hr className="mt-4" />

          {/* ============================================ */}
          <div>
            <h2 className="capitalize font-bold font-[poppins] text-[24px] mt-4 p-3">
              Basic Information{" "}
            </h2>
            <p className="font-[poppins] text-[15px]  p-3 text-[#56636A] ">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus
              ullam itaque hic aut reiciendis accusantium commodi eaque.
            </p>
            <div className="grid grid-cols-6 p-1 text-[15px]">
              <div className="col-span-2">
                <p className="m-1 font-[poppins]">
                  <strong className="text-[#1D2F3]">Legal Name</strong>
                </p>
              </div>
              <div className="col-span-3">
                <p className="m-1 font-[poppins] text-[#56636A]">
                  :Legal Company Name
                </p>
              </div>
            </div>
          </div>
          {/* ============================================== */}

          <hr className="mt-4" />

          {/* ========================timeline============================================================== */}
          {/* ++   */}
          <div>
            <h2 className="capitalize font-bold font-[poppins] text-[24px] mt-4 p-3">
              Timeline{" "}
            </h2>
            <div
              className="p-1 text-[15px] w-full flex justify-center items-center relative"
              style={{ height: "250px" }}
            >
              {/* Top red circular div */}
              <div
                className="absolute"
                style={{ top: "0", left: "30%", transform: "translateX(-50%)" }}
              >
                <div className="flex justify-center items-center h-[56px] w-[56px] bg-[#56636A] rounded-full">
                  <h3 className="text-white font-bold font-[poppins]">2023</h3>
                </div>
              </div>
              {/* Vertical line */}
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
              {/* Horizontal line */}
              <div
                className="absolute"
                style={{ top: "125px", left: "calc(30% - 25px)" }}
              >
                <div
                  className="h-[3px] bg-[#56636A]"
                  style={{ width: "150px" }}
                ></div>
              </div>
              {/* Left  circular div */}
              <div
                className="absolute"
                style={{ top: "calc(50% - 25px)", left: "calc(30% - 75px)" }}
              >
                <div className="flex justify-center items-center h-[50px] w-[50px] border-[3px] border-[#56636A] rounded-full">
                  {/* b */}
                  <img
                    src="/images/company.png"
                    className="h-[30px] w-[30px]"
                    alt=""
                  />
                </div>
              </div>
              {/* Right white rectangular div */}
              <div
                className="absolute "
                style={{ top: "calc(50% - 15px)", left: "calc(30% + 25px)" }}
              >
                <div className="h-[90px] w-[320px] overflow-hidden  bg-white border-l-[3px] border-[#56636A] pl-3  ">
                  <h6 className="font-[poppins] font-semibold text-[#56636A] text-[14px] ">
                    Dec | Founding Team Hired
                  </h6>
                  <p className="font-[poppins] font-normal text-[#56636A] text-[12px] text-justify   ">
                    In December 2022, GAUREV & CHAKRAPANI came together, to
                    build a tech platform, to solve for the real estate Industry
                    needs. They bring in complementing skills; Gaurev with real
                    estate domain & Chakrapani with diverse product and tech
                    experiences.

                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ==========timeline end===================== */}
          {/* ===================Revenue Stream start ====================== */}
          <hr className="mt-4" />

          <div>
            <h2 className="capitalize font-bold font-[poppins] text-[24px] mt-4 p-3">
              Revenue Stream{" "}
            </h2>
            <div className="flex flex-wrap m-4">
              <button className="pr-4 pl-4 p-1 border-2 border-[#22c55e] rounded-[50px] m-2">
                <a href="#" target="_blank" className="text-[#22c55e]">
                  Advertising
                </a>
              </button>
              <button className="pr-4 pl-4 p-1 border-2 border-[#22c55e] rounded-[50px] m-2 ">
                <a href="#" target="_blank" className="text-[#22c55e]">
                  Advertising
                </a>
              </button>
            </div>
          </div>
          {/*==============  Reveneu Stream End ============= */}

          <hr className="mt-4" />

          <div>
            <h2 className="capitalize font-bold font-[poppins] text-[24px] mt-4 p-3">
              Target Market
            </h2>
            <div className="flex flex-wrap m-1">
              <h4 className="pr-2 pl-2 p-0.5 border-2 border-[#56636A] rounded-lg m-2 text-white bg-[#56636A]">
                B2B
              </h4>
            </div>
            <p className="text-[#56636A] m-4">
              Real Estate Industry- Agents, Builders & other ancillaries.
            </p>
            <div className="grid grid-cols-6 p-1 text-[15px]">
              <div className="col-span-2">
                <p className="m-1 font-[poppins]">
                  <strong className="text-[#1D2F3]">Client Segment</strong>
                </p>
              </div>
              <div className="col-span-3">
                <p className="m-1 font-[poppins] text-[#56636A]">
                  :Real Estate,  Marketplace  
                </p>
              </div>
            </div>
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
                style={{ top: "0", left: "50%", transform: "translateX(-50%)" }}
              >
                <div className="flex justify-center items-center h-[160px] w-[160px] bg-white border-2 border-[#56636A]  rounded-full">
                  <div className="text-center">
                    <h3 className="text-[#56636A] font-bold font-[poppins] text-[17px]">
                      Total Funding
                    </h3>
                    <h3 className="text-[#56636A] font-bold font-[poppins] text-[25px]">
                      $25M{" "}
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
              <div className="flex w-full justify-start p-2">
                <div
                  className={`p-3 flex items-center cursor-pointer ${
                    activeTab === "round1"
                      ? "text-[#22c55e] font-bold border-b-2 border-[#22c55e] text-[20px]"
                      : "text-gray-500 text-[18px]"
                  }`}
                  onClick={() => setActiveTab("round1")}
                >
                  Round 1
                </div>
                <div
                  className={`p-3 flex items-center cursor-pointer ml-4 ${
                    activeTab === "round2"
                      ? "text-[#22c55e] font-bold border-b-2 border-[#22c55e] text-[20px]"
                      : "text-gray-500 text-[18px]"
                  }`}
                  onClick={() => setActiveTab("round2")}
                >
                  Round 2
                </div>
                <div
                  className={`p-3 flex items-center cursor-pointer ml-4 ${
                    activeTab === "round3"
                      ? "text-[#22c55e] font-bold border-b-2 border-[#22c55e] text-[20px]"
                      : "text-gray-500 text-[18px]"
                  }`}
                  onClick={() => setActiveTab("round3")}
                >
                  Round 3
                </div>
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
                          {activeTab === "round1"
                            ? "$5M"
                            : activeTab === "round3"
                            ? "$5M"
                            : "$15M"}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-3/5">
                  <TabContent activeTab={activeTab} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:w-full lg:w-[400px] md:w-full md:px-[80px] lg:px-[5px] xs:px-[20px] xss:px-[10px] my-7 py-5 -2xl mr-1">
        <div className="bg-white rounded-md">
          <h2 className="capitalize font-bold font-[poppins] text-[18px] mt-4 p-3">
            Features
          </h2>
          <hr className="pt-3" />
          <a href="/">
            <div className="flex items-center justify-between">
              <div className="lg:w-1/5 md:w-2/5 rounded-sm ">
                <img
                  src="/images/company.png"
                  alt=""
                  className="w-full rounded-sm pb-2 pl-2"
                />
              </div>
              <div className="w-4/5 md:w-3/4 pl-1">
                <p className="text-black font-[Inter] text-[14px]">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Praesentium.
                </p>{" "}
              </div>
            </div>
          </a>
        </div>
        <div className="bg-white rounded-md">
          <h2 className="capitalize font-bold font-[poppins] text-[18px] mt-4 p-3">
            technology
          </h2>
          <a href="/">
            <hr className="pt-3" />
            <div className="flex items-center justify-between ">
              <div className="lg:w-1/5 md:w-2/5 rounded-sm ">
                <img
                  src="/images/company.png"
                  alt=""
                  className="w-full rounded-sm pb-2 pl-2"
                />
              </div>
              <div className="w-4/5 md:w-3/4 pl-1">
                <p className="text-black font-[Inter] text-[14px]">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Praesentium.
                </p>{" "}
              </div>
            </div>
          </a>
          <a href="/">
            <div className="flex items-center justify-between mt-2">
              <div className="lg:w-1/5 md:w-2/5 rounded-sm ">
                <img
                  src="/images/company.png"
                  alt=""
                  className="w-full rounded-sm pb-2 pl-2"
                />
              </div>
              <div className="w-4/5 md:w-3/4 pl-1">
                <p className="text-black font-[Inter] text-[14px]">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Praesentium.
                </p>{" "}
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;

const TabContent = ({ activeTab }) => {
  if (activeTab === "round1") {
    return (
      <>
        <div className="grid grid-cols-6 p-1 text-[15px]">
          <div className="col-span-2">
            <p className="m-1 font-[poppins]">
              <strong className="text-[#1D2F3]">Series Name</strong>
            </p>
          </div>
          <div className="col-span-3">
            <p className="m-1 font-[poppins] text-[#56636A]">: PRE-SEED</p>
          </div>
        </div>
        <div className="grid grid-cols-6 p-1 text-[15px]">
          <div className="col-span-2">
            <p className="m-1 font-[poppins]">
              <strong className="text-[#1D2F3]">Date</strong>
            </p>
          </div>
          <div className="col-span-3">
            <p className="m-1 font-[poppins] text-[#56636A]">: 1st Jan 2023</p>
          </div>
        </div>
      </>
    );
  } else if (activeTab === "round2") {
    return (
      <>
        <div className="grid grid-cols-6 p-1 text-[15px]">
          <div className="col-span-2">
            <p className="m-1 font-[poppins]">
              <strong className="text-[#1D2F3]">Series Name</strong>
            </p>
          </div>
          <div className="col-span-3">
            <p className="m-1 font-[poppins] text-[#56636A]">: POST-SEED</p>
          </div>
        </div>
        <div className="grid grid-cols-6 p-1 text-[15px]">
          <div className="col-span-2">
            <p className="m-1 font-[poppins]">
              <strong className="text-[#1D2F3]">Date</strong>
            </p>
          </div>
          <div className="col-span-3">
            <p className="m-1 font-[poppins] text-[#56636A]">: 1st Jan 2023</p>
          </div>
        </div>
      </>
    );
  } else if (activeTab === "round3") {
    return (
      <>
        <div className="grid grid-cols-6 p-1 text-[15px]">
          <div className="col-span-2">
            <p className="m-1 font-[poppins]">
              <strong className="text-[#1D2F3]">Series Name</strong>
            </p>
          </div>
          <div className="col-span-3">
            <p className="m-1 font-[poppins] text-[#56636A]">
              : POST-POST-SEED
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
            <p className="m-1 font-[poppins] text-[#56636A]">: 1st Jan 2023</p>
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
};
