import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-5 grid md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-3">MarketPlace</h3>
          <p className="text-gray-400">
            Your trusted freelance marketplace. Connect with top professionals
            and get your projects done efficiently.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/allJobs" className="hover:text-white">All Jobs</a></li>
            <li><a href="/addJob" className="hover:text-white">Add a Job</a></li>
            <li><a href="/myAcceptedTasks" className="hover:text-white">My Tasks</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p className="text-gray-400">Email: support@marketplace.com</p>
          <p className="text-gray-400">Phone: +880 1234 567890</p>
          <p className="text-gray-400">Address: Dhaka, Bangladesh</p>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-3">
            <a href="#" className="hover:text-white">🌐</a>
            <a href="#" className="hover:text-white">🐦</a>
            <a href="#" className="hover:text-white">📘</a>
            <a href="#" className="hover:text-white">📸</a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-5 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} MarketPlace. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
