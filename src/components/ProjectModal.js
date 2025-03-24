import React from "react";
// import "./ProjectModal.css"; // You can style this modal however you like

const ProjectModal = ({ isOpen, project, onClose }) => {
  if (!isOpen || !project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>

        <img src={project.image} alt={project.title} className="modal-image" />
        <h2>{project.title}</h2>
        <p>{project.description}</p>
        {project.link && (
          <a href={project.link} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            View Project
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectModal;
