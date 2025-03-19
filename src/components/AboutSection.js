import { useState, useEffect } from "react";

const AboutSection = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/aboutData.json")
      .then((response) => response.json())
      .then((data) => {
        setAboutData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching about data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="about-loading">Loading about section...</div>;
  }

  return (
    <div className="about wow fadeInUp" id="about">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="about-img">
              <img src={aboutData.profileImage} alt="Profile" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-content">
              <div className="section-header text-left">
                <p>Learn About Me</p>
                <h2>{aboutData.professionalTitle}</h2>
              </div>
              <div className="about-text">
                <p>{aboutData.shortBio}</p>
              </div>
              <div className="skills">
                {aboutData.skills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <div className="skill-name">
                      <p>{skill.name}</p>
                      <p>{skill.percentage}%</p>
                    </div>
                    <div className="progress">
                      <div className="progress-bar" style={{ width: `${skill.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="certifications">
                <h3>Certifications</h3>
                <ul>
                  {aboutData.certifications.map((cert, index) => (
                    <li key={index}>{cert}</li>
                  ))}
                </ul>
              </div>
              <a className="btn" href="/">Back to Home</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
