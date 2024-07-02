import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 h-16 p-4 fixed bottom-0 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-base">&copy; 2024 Your Website</span>
          <a href="#" className="text-base hover:text-gray-400">
            About Us
          </a>
          <a href="#" className="text-base hover:text-gray-400">
            Contact Us
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-base hover:text-gray-400">
            Privacy Policy
          </a>
          <a href="#" className="text-base hover:text-gray-400">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
