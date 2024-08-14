import React, { useState } from "react";
import AdminSideNav from "../../component/AdminSideNav";
import ContentEditor from "../../component/ContentEditor";

const Support = () => {
  const [contentData, setContentData] = useState("");

  const handleModelChange = (data) => {
    setContentData(data);
  };

  return (
    <>
      <AdminSideNav>
        <div className="mb-1 md:col-span-2 ml-4 mr-4 mt-10 ">
          <label className="block mb-1">
            <p className="font-bold mb-5">Product Description</p>
            <ContentEditor
              model={contentData}
              handleModelChange={handleModelChange}
              allowPaste={true}
              height={550}
            />
          </label>
          <button
        //   onClick={handleSave}
          className="bg-[#22c55e]  text-white px-4 py-2 rounded-md mt-2 w-full"
        >
          Add Blogs
        </button>
        </div>
      </AdminSideNav>
    </>
  );
};

export default Support;
