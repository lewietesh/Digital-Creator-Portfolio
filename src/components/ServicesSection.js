import { useState, useEffect } from "react";

const ServicesSection = () => {
  const [servicesData, setServicesData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/servicesData.json")
      .then((response) => response.json())
      .then((data) => {
        setServicesData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching services data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="services-loading">Loading services...</div>;
  }

  return (
    <div className="service" id="service">
      <div className="container">
        <div className="section-header text-center wow zoomIn" data-wow-delay="0.1s">
          <p>{servicesData.sectionSubtitle}</p>
          <h2>{servicesData.sectionTitle}</h2>
        </div>
        <div className="row">
          {servicesData.services.map((service, index) => (
            <div key={index} className="col-lg-6 wow fadeInUp" data-wow-delay={`${index * 0.2}s`}>
              <div className="service-item">
                <div className="service-icon">
                  <i className={service.icon}></i>
                </div>
                <div className="service-text">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
