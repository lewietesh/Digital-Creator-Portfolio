import Navbar from "../components/Navbar";
import AboutSection from "../components/AboutSection";

const About = () => {
  return (
    <>
      <Navbar /> {/* Ensures Navbar stays on all pages */}
      <AboutSection />
    </>
  );
};

export default About;
