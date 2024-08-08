import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AdminRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    const checkAdmin = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token missing");

        const response = await fetch(
          "http://localhost:5050/api/user/check-admin",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Not authorized");

        const data = await response.json();
        if (!data.isAdmin) {
          return null 
        }
        
      } catch (error) {
        console.error(error.message);
        navigate("/");
      }
    };

    if (!user || !user.isAdmin) {
      navigate("/");
    } else {
      checkAdmin();
    }
  }, [navigate]);

  return <Outlet />;
};

export default AdminRoutes;
