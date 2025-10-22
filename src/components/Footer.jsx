import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 w-full mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 
                      flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-4 gap-8 min-w-0">
        
        {/* Brand */}
        <div>
          <h3 className="text-white text-2xl font-bold mb-4">WebNexa</h3>
          <p className="text-sm leading-relaxed">
            Employe Management Website that generates Employee ID Cards.
          </p>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Product</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Features</a></li>
            <li><a href="#" className="hover:text-white">Pricing</a></li>
            <li><a href="#" className="hover:text-white">Integrations</a></li>
            <li><a href="#" className="hover:text-white">Case Studies</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Blog</a></li>
            <li><a href="#" className="hover:text-white">Help Center</a></li>
            <li><a href="#" className="hover:text-white">Docs</a></li>
            <li><a href="#" className="hover:text-white">Community</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Careers</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 py-4 text-center text-xs sm:text-sm text-gray-400 px-4">
        © {new Date().getFullYear()} WebNexa. All rights reserved.
      </div>
    </footer>
  );
}
