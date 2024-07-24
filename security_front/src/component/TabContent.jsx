import React from "react";
import ContentViewer from "./ContentViewer";

const renderTabContent = (activeTab, companyContent) => {
  switch (activeTab) {
    case "companyInformation":
      return (
        <div key="companyInformation">
          <div className="mb-4 capitalize">
            <strong>Company Name:</strong> {companyContent?.name}
          </div>
          <div className="mb-4 capitalize">
            <strong>Email:</strong> {companyContent?.email}
          </div>
          <div className="mb-4 capitalize">
            <strong>Phone:</strong> {companyContent?.phone}
          </div>
          <div className="mb-4 capitalize">
            <strong>Registration Date:</strong>{" "}
            {new Date(companyContent?.registration).getFullYear()}
          </div>
          <div className="mb-4 capitalize">
            <strong>Address:</strong> {companyContent?.address}
          </div>
          <div className="mb-4 font-Poppins">
            <strong>Company Overview:</strong>{" "}
            <ContentViewer
              contents={companyContent?.contentData}
              fontSize={13}
            />
          </div>
        </div>
      );
    case "productsServices":
      return (
        <div key="productsServices" className="flex flex-wrap">
          {companyContent?.products?.map((product) => (
            <div
              key={product._id}
              className="bg-white w-full md:w-[300px] sm:w-full rounded-md border border-black-2 hover:scale-105 hover:shadow-lg transition-transform m-2"
            >
              <div className="flex flex-col items-start m-3">
                <div className="w-2/6 md:w-2/5 overflow-hidden m-2 shadow-md">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <div className="pt-1 flex">
                    <h2 className="capitalize font-bold text-[17px]">
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
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    case "basicInformation":
      return (
        <div key="basicInformation">
          <div className="justify-center items-center text-justify text-[#56636A]">
            <ContentViewer
              contents={companyContent?.basicDescription}
              fontSize={14}
              fontFamily={"Inter"}
            />
            <hr className="mt-10" />
          </div>
        </div>
      );
    case "timeline":
      return (
        <div key="timeline" className="flex flex-wrap">
          {companyContent?.timelines?.map((timeline) => (
            <div
              key={timeline._id}
              className="bg-white w-full md:w-[300px] sm:w-full rounded-md border border-black-2 hover:scale-105 hover:shadow-lg transition-transform m-2"
            >
              <div className="flex flex-col items-start m-3">
                <div className="w-2/6 md:w-2/5 overflow-hidden m-2 shadow-md">
                  <img
                    src={timeline.image}
                    alt={timeline.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <div className="pt-1 flex">
                    <h2 className="capitalize font-bold text-[17px]">
                      {timeline.name}
                    </h2>
                  </div>
                  <h2 className="capitalize font-bold text-[17px]">
                    {timeline.date}
                  </h2>
                  <div className="justify-center items-center text-justify text-[#56636A]">
                    <ContentViewer
                      contents={timeline.description}
                      fontSize={14}
                      fontFamily={"Inter"}
                    />
                    <hr className="mt-10" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    case "market":
      return (
        <div key="market">
          <div className="mb-4 capitalize">
            <strong>Business Type:</strong> {companyContent?.businesstype}
          </div>
          <div className="mb-4 font-Poppins">
            <strong>Market Overview:</strong>{" "}
            <ContentViewer
              contents={companyContent?.marketDescription}
              fontSize={13}
            />
          </div>
        </div>
      );
    case "funding":
      return (
        <div key="funding" className="flex flex-wrap">
          {companyContent?.fundings?.map((funding) => (
            <div
              key={funding._id}
              className="bg-white w-full md:w-[300px] sm:w-full rounded-md border border-black-2 hover:scale-105 hover:shadow-lg transition-transform m-2"
            >
              <div className="flex flex-col items-start m-3">
                <div className="p-3">
                  <div className="pt-1 flex">
                    <h2 className="capitalize font-bold text-[17px]">
                      {funding.name}
                    </h2>
                  </div>
                  <h2 className="capitalize font-bold text-[17px]">
                    {funding.date}
                  </h2>
                  <div className="justify-center items-center text-justify text-[#56636A]">
                    <ContentViewer
                      contents={funding.description}
                      fontSize={14}
                      fontFamily={"Inter"}
                    />
                    <hr className="mt-10" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
};

export default renderTabContent;
