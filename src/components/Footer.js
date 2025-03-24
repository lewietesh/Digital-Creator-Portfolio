import { useState, useEffect } from "react";

const Footer = () => {
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    fetch("/footerData.json")
      .then((response) => response.json())
      .then((data) => setFooterData(data))
      .catch((error) => console.error("Error fetching footer data:", error));
  }, []);

  if (!footerData) {
    return <p>Loading footer...</p>;
  }

  return (
    <footer className="footer wow fadeIn" data-wow-delay="0.3s">
      <div className="container-fluid">
        <div className="container">
          <div className="footer-info">
            <h3>{footerData.name}</h3>
            <h4>{footerData.location}</h4>
            <div className="footer-menu">
              <p>{footerData.phone}</p>
              <p>{footerData.email}</p>
            </div>
            <div className="footer-social">
              {footerData.socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={social.icon}></i>
                  
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="container copyright">
          <p>
            &copy; <a href={footerData.website || "javascript:void(0);"}>{footerData.brand}</a>, All Rights Reserved | Designed with{" "}
            <i className="fas fa-heart text-danger"></i> by {footerData.name}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
