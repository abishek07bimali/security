import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AdminSideNav = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("dashboard");
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const navItems = [
    {
      name: "Dashboard",
      icon: "fas fa-tachometer-alt",
      id: "dashboard",
      link: "/dashboard",
    },
    {
      name: "Companies",
      icon: "fas fa-sticky-note",
      id: "companies",
      link: "/admin-view-companies",
    },
    {
      name: "Blogs",
      icon: "fas fa-table",
      id: "blogs",
      link: "/admin-view-blogs",
    },
    {
      name: "Claims",
      icon: "fas fa-cogs",
      id: "support",
      link: "/admin-all-claims",
    },
    {
      name: "Contacts",
      icon: "fas fa-align-left",
      id: "contacts",
      link: "/admin-view-contact",
    },
    {
      name: "User Logs",
      icon: "fas fa-file",
      id: "userlogs",
      link: "/admin-view-user-logs",
    },
    {
      name: "My Account",
      icon: "fas fa-user",
      id: "account",
      link: "/admin-profile",
    },
    {
      name: "Sign Out",
      icon: "fas fa-sign-out-alt",
      id: "signout",
      onClick: handleLogout,
    },
  ];

  // Function to toggle sidebar state
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to toggle mobile navigation state
  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  // Function to set active navigation item
  const handleNavItemClick = (item) => {
    setActiveNavItem(item);
  };

  // Update activeNavItem based on current location
  useEffect(() => {
    const path = location.pathname;
    const activeItem = navItems.find((item) => item.link === path);

    if (activeItem) {
      setActiveNavItem(activeItem.id);
    } else {
      setActiveNavItem((prevItem) => "");
    }
  }, [location.pathname]);

  return (
    <div className="bg-gray-100 font-family-karla flex">
      {/* Sidebar */}
      <aside
        className={`relative bg-[#aaa7a7] h-screen w-64 ${
          isSidebarOpen ? "block" : "hidden sm:block"
        } shadow-xl`}
      >
        <div className="p-6">
          <Link
            to="/"
            className="text-white text-3xl font-semibold uppercase hover:text-gray-300"
          >
            Admin
          </Link>
          <Link
            to="/admin-company-add"
            className="w-full bg-white cta-btn font-semibold py-2 mt-5 rounded-br-lg rounded-bl-lg rounded-tr-lg shadow-lg hover:shadow-xl hover:bg-gray-300 flex items-center justify-center"
          >
            <i className="fas fa-plus mr-3"></i> New Company
          </Link>
        </div>
        <nav className="text-white text-base font-semibold pt-3">
          {navItems.map((item) => {
            if (item.id === "signout") {
              // For actions like logout, use a button instead of a link
              return (
                <button
                  key={item.id}
                  onClick={handleLogout}
                  className="flex items-center py-4 pl-6 nav-item text-white opacity-75 hover:opacity-100 w-full text-left"
                >
                  <i className={`${item.icon} mr-3`}></i>
                  {item.name}
                </button>
              );
            } else {
              // For normal navigation links
              return (
                <Link
                  key={item.id}
                  to={item.link}
                  onClick={() => handleNavItemClick(item.id)}
                  className={`flex items-center py-4 pl-6 nav-item ${
                    activeNavItem === item.id
                      ? "active-nav-link text-white"
                      : "text-white opacity-75 hover:opacity-100"
                  }`}
                >
                  <i className={`${item.icon} mr-3`}></i>
                  {item.name}
                </Link>
              );
            }
          })}
        </nav>
      </aside>
      {/* Main content */}
      <div className="w-full flex flex-col h-screen overflow-y-hidden">
        {/* Mobile Header & Nav */}
        <header className="w-full bg-[#aaa7a7] py-5 px-6 sm:hidden">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="text-white text-3xl font-semibold uppercase hover:text-gray-300"
            >
              Admin
            </Link>
            <button
              onClick={toggleMobileNav}
              className="text-white text-3xl focus:outline-none"
            >
              <i
                className={
                  isMobileNavOpen
                    ? "fas fa-times cursor-pointer"
                    : "fas fa-bars cursor-pointer"
                }
              ></i>
            </button>
          </div>

          <nav className="text-white text-base font-semibold pt-3">
            {navItems.map((item) => {
              if (item.id === "signout") {
                return (
                  <button
                    key={item.id}
                    onClick={handleLogout}
                    className="flex items-center py-4 pl-6 nav-item text-white opacity-75 hover:opacity-100 w-full text-left"
                  >
                    <i className={`${item.icon} mr-3`}></i>
                    {item.name}
                  </button>
                );
              } else {
                return (
                  <Link
                    key={item.id}
                    to={item.link}
                    onClick={() => handleNavItemClick(item.id)}
                    className={`flex items-center py-4 pl-6 nav-item ${
                      activeNavItem === item.id
                        ? "active-nav-link text-white"
                        : "text-white opacity-75 hover:opacity-100"
                    }`}
                  >
                    <i className={`${item.icon} mr-3`}></i>
                    {item.name}
                  </Link>
                );
              }
            })}
          </nav>
        </header>
        <div className="w-full overflow-x-hidden border-t flex flex-col">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default AdminSideNav;
