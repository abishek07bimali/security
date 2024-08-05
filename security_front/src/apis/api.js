import axios from "axios";

const Api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const ApiWithFormData = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Token
const config = {
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const createTestApi = (data) =>
  Api.post("/api/blogs/create_blogs", data, config);

export const getContentsApi = (data) => Api.get("/api/user/get_post", data);

// blogs apis
export const createBlogApi = (data) =>
  ApiWithFormData.post("/api/blogs/create_blogs", data, config);

export const getBlogsApi = () => Api.get("/api/blogs/get_all_blogs");

export const getSingleBlogApi = (id) => Api.get(`/api/blogs/get_blog_id/${id}`);

export const getRecentBlogsApi = (id) =>
  Api.get("/api/blogs/get_recent_blogs", id);
export const getRecentAllBlogsApi = () =>
  Api.get("/api/blogs/get_recent_all_blogs");

export const updatetBlogsApi = (id, data) =>
  ApiWithFormData.put(`/api/blogs/admin_update_blog/${id}`, data, config);

export const deleteBlogsApi = (id, data) =>
  ApiWithFormData.put(`/api/blogs/admin_delete_blog/${id}`, data, config);

// work domain apis
export const getWorkDomainApi = () =>
  Api.get("/api/domain/get_all_work_domain");

// Company apis
export const createCompanyApi = (data) =>
  ApiWithFormData.post("/api/company/create_company", data, config);

// get All Company apis
export const getAllCompanyApi = () => Api.get("/api/company/get_all_company");

export const getSingleCompanyApi = (id) =>
  Api.get(`/api/company/view_details_of_company/${id}`);

export const getCategoryCompanyApi = (category) =>
  Api.get(`/api/company/get_category_company?category=${category}`);

export const getAllNewCompanyApi = (category) =>
  Api.get("/api/company/get_new_company");

export const deleteCompanyApi = (id, data) =>
  ApiWithFormData.put(`/api/company/admin_delete_company/${id}`, data, config);

export const updateCompanyApi = (id, data) =>
  ApiWithFormData.put(`/api/company/admin_update_company/${id}`, data, config);

// sign up users
export const createUserAccount = (data) => Api.post("/api/user/signup", data);
export const createLoginAccount = (data) => Api.post("/api/user/login", data);
export const verifyEmailForget = (data) =>
  Api.post("/api/user/forgotpassword", data);
export const verifyOTPForget = (data) => Api.post("/api/user/verify-otp", data);
export const ResetPassword = (data) =>
  Api.post("/api/user/reset-password", data);
export const verifyUserAccount = (data) => Api.post("/api/user/verify_creation", data);

// export const CheckAdmin= ()=>{
//   Api.post
// }

// contact create user
export const createContact = (data) =>
  Api.post("/api/contact/create_contact", data);
export const getAllContact = (data) =>
  Api.get("/api/contact/get_contact", data);

export const claimCompanyApi = (data) =>
  ApiWithFormData.post("/api/claim/company-claims", data, config);
export const getClaimCompanyApi = () => Api.get("/api/claim/claims", config);
export const verifyClaimCOmpany = (id, data) =>
  Api.put(`/api/claim/verify-claim/${id}`, data, config);
export const rejectClaimCompany = (id, data) =>
  Api.put(`/api/claim/reject-claim/${id}`, data, config);
