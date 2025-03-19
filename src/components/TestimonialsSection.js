import { useState, useEffect, useRef } from "react";

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef(null); // Reference for the testimonials container

  useEffect(() => {
    fetch("/testimonialsData.json")
      .then((response) => response.json())
      .then((data) => {
        setTestimonials(data.testimonials);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching testimonials:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (testimonials.length > 0) {
      let index = 0;
      const slides = document.querySelectorAll(".testimonial-item");
      const totalSlides = slides.length;

      function showSlide(i) {
        slides.forEach((slide, idx) => {
          slide.style.display = idx === i ? "block" : "none";
        });
      }

      // Auto-slide functionality
      function startCarousel() {
        showSlide(index);
        index = (index + 1) % totalSlides;
      }

      // Set interval for auto-sliding
      const interval = setInterval(startCarousel, 3000); // Slide every 3 seconds

      return () => clearInterval(interval); // Cleanup function to stop the interval
    }
  }, [testimonials]); // Runs after testimonials are loaded

  if (loading) {
    return <div>Loading testimonials...</div>;
  }

  return (
    <div className="testimonial wow fadeInUp" id="review">
      <div className="container">
        <div className="testimonial-icon">
          <i className="fa fa-quote-left"></i>
        </div>

        <div ref={carouselRef} className="testimonials-carousel">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-item">
              <div className="testimonial-img">
                <img src={testimonial.image} alt={testimonial.name} />
              </div>
              <div className="testimonial-text">
                <p>{testimonial.feedback}</p>
                <h3>{testimonial.name}</h3>
                <h4>{testimonial.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
