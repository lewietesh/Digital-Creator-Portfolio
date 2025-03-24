import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [navLinks, setNavLinks] = useState([]);
  const [logo, setLogo] = useState("");

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/navbarData.json`)
      .then((res) => res.json())
      .then((data) => {
        setNavLinks(data.links || []);
        setLogo(data.logo || "");
      });
  }, []);

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between relative">
          {/* Mobile Menu Toggle */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={() => setNavOpen(!navOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset"
              aria-controls="mobile-menu"
              aria-expanded={navOpen}
            >
              {navOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
              <span className="sr-only">Toggle menu</span>
            </button>
          </div>

          {/* Logo + Links (Desktop) */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              {logo && <img className="h-8 w-auto" src={logo} alt="Logo" />}
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navLinks.map((link, idx) =>
                  link.href.startsWith("/") ? (
                    <Link
                      key={idx}
                      to={link.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        link.active
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={idx}
                      href={link.href}
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      {link.label}
                    </a>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Right Side (Icons, Avatar, Actions etc.) */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="sr-only">Notifications</span>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </button>

            {/* Profile Avatar */}
            <div className="ml-3 relative">
              <img
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                alt="Profile"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {navOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navLinks.map((link, idx) =>
              link.href.startsWith("/") ? (
                <Link
                  key={idx}
                  to={link.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    link.active
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  onClick={() => setNavOpen(false)}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={idx}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  {link.label}
                </a>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
