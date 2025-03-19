import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [navSticky, setNavSticky] = useState(false);
  const [navLinks, setNavLinks] = useState([]);
  const [logo, setLogo] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setNavSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch("/navbarData.json")
      .then((response) => response.json())
      .then((data) => {
        setNavLinks(data.links || []);
        setLogo(data.logo || "");
      })
      .catch((error) => console.error("Error fetching navbar data:", error));
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg ${navSticky ? "nav-sticky bg-white shadow-sm" : "bg-light"} navbar-light`}>
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          {logo && <img src={logo} className="icon-logo" alt="Logo" />}
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
          <div className="navbar-nav ml-auto">
            {navLinks.length > 0 ? (
              navLinks.map((link, index) => (
                <Link key={index} to={link.href} className={`nav-item nav-link ${link.active ? "active" : ""}`}>
                  {link.label}
                </Link>
              ))
            ) : (
              <p>Loading links...</p>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
