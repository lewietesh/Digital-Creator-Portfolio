import { useState, useEffect } from "react";
import ProjectModal from "./ProjectModal"; // Make sure this is created
// import "./ProjectModal.css"; // Optional styling

const ProjectsSection = () => {
  const [projectsData, setProjectsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("*");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filterProjects = (filter) => {
    setSelectedFilter(filter);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetch("/projectsData.json")
      .then((response) => response.json())
      .then((data) => {
        setProjectsData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching projects data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="projects-loading">Loading projects...</div>;
  }

  return (
    <div className="portfolio" id="portfolio">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <p>{projectsData.sectionSubtitle}</p>
          <h2>{projectsData.sectionTitle}</h2>
        </div>

        {/* Portfolio Filters */}
        <div className="row">
          <div className="col-12">
            <ul id="portfolio-filter">
              {projectsData.categories.map((category, index) => (
                <li
                  key={index}
                  className={selectedFilter === category.filter ? "filter-active" : ""}
                  onClick={() => filterProjects(category.filter)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Portfolio Items */}
        <div className="row portfolio-container">
          {projectsData.projects
            .filter(
              (project) => selectedFilter === "*" || project.category === selectedFilter
            )
            .map((project, index) => (
              <div
                key={index}
                className={`col-lg-4 col-md-6 col-sm-12 portfolio-item ${project.category}`}
                onClick={() => handleProjectClick(project)}
                style={{ cursor: "pointer" }}
              >
                <div className="portfolio-wrap">
                  <div className="portfolio-img">
                    <img src={project.image} alt={project.title} />
                  </div>
                  <div className="portfolio-text">
                    <h3>{project.title}</h3>
                    <span className="btn">+</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Modal for Project Details */}
      <ProjectModal
        isOpen={isModalOpen}
        project={selectedProject}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ProjectsSection;
