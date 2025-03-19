import { useState, useEffect } from "react";

const Hero = () => {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://67d8febc00348dd3e2a8f8d1.mockapi.io/digitworks/hero")
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          // Pick a random object from the dataset
          const randomIndex = Math.floor(Math.random() * data.length);
          setHeroData(data[randomIndex]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching hero data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="hero-loading">Loading hero section...</div>;
  }

  return (
    <section id="home" className="hero position-relative d-flex align-items-center justify-content-center text-center">
      {/* Background Media */}
      {heroData.backgroundMedia && (
        heroData.backgroundMedia.endsWith(".mp4") ? (
          <video autoPlay loop muted className="hero-bg-video">
            <source src={heroData.backgroundMedia} type="video/mp4" />
          </video>
        ) : (
          <div className="hero-bg" style={{ backgroundImage: `url(${heroData.backgroundMedia})` }}></div>
        )
      )}

      {/* Hero Content */}
      <div className="hero-text position-absolute">
        <h1 className="hero-title">{heroData.heroHeader}</h1>
        <p className="hero-description">{heroData.heroDescription}</p>

        {/* Call-to-Action Buttons */}
        <div className="hero-buttons mt-4">
          {heroData.ctaPrimaryText && (
            <a href={heroData.ctaPrimaryLink} className="btn btn-primary m-2">
              {heroData.ctaPrimaryText}
            </a>
          )}
          {heroData.ctaSecondaryText && (
            <a href={heroData.ctaSecondaryLink} className="btn btn-outline-light m-2">
              {heroData.ctaSecondaryText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
