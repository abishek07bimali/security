import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0B111D] text-white py-10">
      <div className="container mx-auto flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-48  text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start mb-4">
              <h2 className="text-[20px] font-semibold">Explore</h2>
              <img src="/images/icon.png" alt="" className="ml-2" />
            </div>
            <ul>
              <li className="mb-2">
                {" "}
                <Link to="/add-company-form"> List Your Comapny </Link>
              </li>
              <li className="mb-2">
                <Link to="/blogs">Blogs</Link>
              </li>
              <li className="mb-2">
                <Link to="/">Companies</Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="flex items-center justify-center md:justify-start mb-4">
              <h2 className="text-[20px] font-semibold">
                More from Companylead
              </h2>
              <img src="/images/icon.png" alt="" className="ml-2" />
            </div>
            <ul>
              <li className="mb-2">
                <Link to="/contact-us">Contact</Link>
              </li>
              {/* <li className="mb-2">
                <Link>Top List</Link>
              </li> */}
              <li className="mb-2">
                <Link to="/help_and_faq">Help</Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="flex items-center justify-center md:justify-start mb-4">
              <h2 className="text-[20px] font-semibold">Stay Connected</h2>
              <img src="/images/icon.png" alt="" className="ml-2" />
            </div>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="https://www.youtube.com"
                className="text-white hover:text-gray-400"
                target="_blank"
              >
                {/* <FontAwesomeIcon icon={faYoutube} size="2x" /> */}
                <img src="/images/icons/youtube.png" alt="" />
              </a>
              <a
                href="https://www.twitter.com"
                className="text-white hover:text-gray-400"
                target="_blank"
              >
                {/* <FontAwesomeIcon icon={faTwitter} size="2x" /> */}
                <img src="/images/icons/twiter.png" alt="" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                className="text-white hover:text-gray-400"
              >
                {/* <FontAwesomeIcon icon={faFacebook} size="2x" /> */}
                <img src="/images/icons/facebook.png" alt="" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                className="text-white hover:text-gray-400"
              >
                {/* <FontAwesomeIcon icon={faInstagram} size="2x" /> */}
                <img src="/images/icons/instagram.png" alt="" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
