import React, { useState, useEffect } from "react";
import {
  deleteBlogsApi,
  getClaimCompanyApi,
  rejectClaimCompany,
  verifyClaimCOmpany,
} from "../../apis/api";
import AdminSideNav from "../../component/AdminSideNav";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importing Font Awesome icons
import { toast } from "react-hot-toast";

const AdminAllClaims = () => {
  const [savedContent, setSavedContent] = useState([]);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentClaim, setCurrentClaim] = useState(null);
  const [imagePreviewUrl1, setImagePreviewUrl1] = useState(null);
  const [imagePreviewUrl2, setImagePreviewUrl2] = useState(null);
  const [loading, setIsloading] = useState(false);
  const [loadinVerifying, setIsloadingVerifying] = useState(false);

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = () => {
    getClaimCompanyApi()
      .then((response) => {
        setSavedContent(response?.data.data);
      })
      .catch((error) => {
        console.error("Error fetching claims:", error);
      });
  };

  const handleDelete = (id) => {
    deleteBlogsApi(id)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Blog deleted successfully");
          fetchClaims();
        } else {
          toast.error("Failed to delete the blog");
        }
      })
      .catch((error) => {
        console.error("Error deleting blog:", error);
        if (error.response) {
          toast.error(`Deletion failed: ${error.response.data.message}`);
        } else {
          toast.error("Deletion failed: Network error or server is down");
        }
      });
  };

  const handleViewClick = (claim) => {
    setCurrentClaim(claim);
    setImagePreviewUrl1(claim.document1);
    setImagePreviewUrl2(claim.document2);
    setIsViewModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsViewModalOpen(false);
    setCurrentClaim(null);
    setImagePreviewUrl1(null);
    setImagePreviewUrl2(null);
  };

  const handleVerifyClaim = async (id) => {
    setIsloadingVerifying(true);
    try {
      const formData = { status: true };
      const res = await verifyClaimCOmpany(id, formData);
      if (res.data.success) {
        toast.success(res.data.message);
        fetchClaims();
        handleCloseModal();
        setIsloadingVerifying(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error verifying claim:", error);
      toast.error("Failed to verify claim: Network error or server is down");
    }
  };
  const handleRejectClaim = async (id) => {
    setIsloading(true);

    try {
      const formData = { status: true };
      const res = await rejectClaimCompany(id, formData);
      if (res.data.success) {
        toast.success(res.data.message);
        fetchClaims();
        handleCloseModal();
        setIsloading(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error verifying claim:", error);
      toast.error("Failed to verify claim: Network error or server is down");
    }
  };
  return (
    <AdminSideNav>
      <>
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Admin View Claims</h1>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr>
                  <th className="px-2 py-4 border-b">ID</th>
                  <th className="px-2 py-4 border-b">Username</th>
                  <th className="px-2 py-4 border-b">Email</th>
                  <th className="px-2 py-4 border-b">Company Name</th>
                  <th className="px-2 py-4 border-b">Company Address</th>
                  <th className="px-2 py-4 border-b">Position</th>
                  <th className="px-2 py-4 border-b">Status</th>
                  {/* <th className="px-2 py-4 border-b">Action</th> */}
                </tr>
              </thead>
              <tbody>
                {savedContent.map((claim, index) => (
                  <tr key={claim._id} className="hover:bg-gray-100">
                    <td className="px-2 py-4 border-b">{index + 1}</td>
                    <td className="px-2 py-4 border-b">
                      {claim.userId.username}
                    </td>
                    <td className="px-2 py-4 border-b">{claim.userId.email}</td>
                    <td className="px-2 py-4 border-b">
                      {claim.companyId.name}
                    </td>
                    <td className="px-2 py-4 border-b">
                      {claim.companyId.address}
                    </td>
                    <td className="px-2 py-4 border-b">{claim.position}</td>
                    <td className="px-2 py-4 border-b justify-center flex">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          claim.isRejected ? "bg-red-500" : "bg-yellow-500"
                        }`}
                      ></div>
                    </td>{" "}
                    <td className="px-2 py-4 border-b flex justify-center space-x-4">
                      <button
                        onClick={() => handleViewClick(claim)}
                        className="text-green-500"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(claim._id)}
                        className="text-red-500"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {isViewModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white w-[900px] p-6 rounded-md shadow-md">
              <h2 className="text-[20px] font-bold mb-4">Claim Company</h2>
              <form>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={currentClaim.userId.username}
                        readOnly
                        className="w-full border border-gray-300 p-2 rounded-md bg-gray-100"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={currentClaim.userId.phone}
                        readOnly
                        className="w-full border border-gray-300 p-2 rounded-md bg-gray-100"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Document Required (1){" "}
                        <span className="text-gray-400 font-bold ">
                          ( Company registration paper )
                        </span>
                      </label>
                      {imagePreviewUrl1 && (
                        <div className="mb-4">
                          <img
                            src={imagePreviewUrl1}
                            alt="Uploaded Preview 1"
                            className="w-full object-cover rounded-md max-w-[300px] h-[300px]"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={currentClaim.userId.email}
                        readOnly
                        className="w-full border border-gray-300 p-2 rounded-md bg-gray-100"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Position in Company
                      </label>
                      <input
                        type="text"
                        name="position"
                        value={currentClaim.position}
                        readOnly
                        className="w-full border border-gray-300 p-2 rounded-md bg-gray-100"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Document Required (2){" "}
                        <span className="text-gray-400 font-bold ">
                          ( Company Owner Citizenship )
                        </span>
                      </label>
                      {imagePreviewUrl2 && (
                        <div className="mb-4">
                          <img
                            src={imagePreviewUrl2}
                            alt="Uploaded Preview 2"
                            className="w-full object-cover rounded-md max-w-[300px] h-[300px]"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
                  >
                    Close
                  </button>
                  {currentClaim.isRejected ? (
                    ""
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleRejectClaim(currentClaim._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                      disabled={loading}
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
                              <span class="sr-only">Loading...</span>
                            </div>
                          </div>
                        </>
                      ) : (
                        "Reject"
                      )}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleVerifyClaim(currentClaim._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                    disabled={loadinVerifying}
                  >
                    {loadinVerifying ? (
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
                            <span class="sr-only">Loading...</span>
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
    </AdminSideNav>
  );
};

export default AdminAllClaims;
