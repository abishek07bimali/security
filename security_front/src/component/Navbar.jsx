import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = localStorage.getItem("user");
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const links = [
    { name: "HOME", link: "/" },
    {
      name: "BLOGS",
      link: "/blogs",
    },
    // {
    //   name: "COMPANY",
    //   sublinks: [
    //     { name: "Stories", link: "/statup-company-story" },
    //     { name: "Rank", link: "/rank" },
    //     // { name: "Blogs", link: "/blogs" },
    //   ],
    // },

    { name: "CONTACT", link: "/contact-us" },
  ];

  const [open, setOpen] = useState(false);
  const [email, setIsEmail] = useState("");
  const [password, setIsPassword] = useState("");

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("email", email);
    form.append("password", password);
  };

  // navbar

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <nav className="shadow-md w-full sticky top-0 left-0 font-[Poppins] font-medium text-medium md:bg-white z-[11] ">
        <div className="lg:flex items-center justify-between bg-white lg:py-3.5 lg:px-10 px-7">
          <Link to="/" className="flex items-center ">
            <img
              className={`w-[80px] h-[80px] absolute top-0 ${
                isMobile ? "bg-white" : ""
              }`}
              src="/images/logo/logo.png"
              alt="BusinessTour Logo"
            />
          </Link>
          <div
            onClick={() => setOpen(!open)}
            className="text-[40px] absolute right-8 top-6 cursor-pointer lg:hidden"
          >
            <ion-icon
              name={open ? "close" : "menu"}
              style={{ color: "#dc2626" }}
            ></ion-icon>
          </div>
          <ul
            className={`lg:flex bg-white lg:items-center lg:pb-0 pb-12 pr-3 absolute font-[Poppins] lg:static lg:z-auto z-[-1] left-0 w-full lg:w-auto lg:pl-0 pl-9 transition-all duration-500 ease-in ${
              open ? "top-10 " : "top-[-550px]"
            }`}
          >
            {links.map((link) => (
              <li
                key={link.name}
                className={`lg:ml-6 lg:my-0 my-7 text-[18px] ${
                  link.sublinks ? "relative group" : ""
                }`}
              >
                <Link
                  to={link.link}
                  className={`text-black hover:text-gray-700 duration-500 ${
                    link.sublinks ? "cursor-pointer" : ""
                  }`}
                >
                  <div className="flex items-center pr-5">
                    {link.name}
                    {link.sublinks && (
                      <i
                        className={`fa-solid fa-chevron-down hover:text-gray-600  ml-2 font-[Poppins] `}
                        style={{ color: "black", fontSize: "12px" }}
                      ></i>
                    )}
                  </div>
                </Link>
                {link.sublinks && (
                  <ul className="absolute top-4 left-0 hidden mt-2 font-[Poppins] space-y-4 w-[120px] px-3 py-3 z-20 bg-gray-500 text-black group-hover:block">
                    {link.sublinks.map((sublink) => (
                      <li
                        className="hover:text-white cursor-pointer font-[Poppins] "
                        key={sublink.name}
                      >
                        <Link to={sublink.link}>{sublink.name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="py-2 px-8 md:block rounded-[10px] text-white bg-green-500 w-fit ml-3">
              {!user ? (
                <Link to="/login" className="duration-500 text-[18px]">
                  LOGIN
                </Link>
              ) : (
                <Link to="/user-profile" className="duration-500 text-[18px]">
                  Profile
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
