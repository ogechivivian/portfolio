// Projects page setup and functionality
import { projects } from '../data/projects.js';
import { ProjectCard } from '../ui-components/ProjectCard.js';
import { Modal } from '../ui-components/Modal.js';

export class ProjectsPage {
  constructor() {
    this.projects = projects;
    this.modal = null;
    this.init();
  }

  init() {
    this.setupProjectsSection();
    this.modal = new Modal();
    this.bindEvents();
  }

  setupProjectsSection() {
    // Render project cards
    ProjectCard.renderMultiple(this.projects, 'projects-container');
    ProjectCard.bindEvents();
  }

  bindEvents() {
    // Handle project card clicks for modal
    document.addEventListener('click', (e) => {
      if (e.target.closest('.project-card')) {
        const projectCard = e.target.closest('.project-card');
        const projectId = parseInt(projectCard.dataset.id);
        this.showProjectModal(projectId);
      }
    });
  }

  showProjectModal(projectId) {
    const project = this.projects.find(p => p.id === projectId);
    if (project && this.modal) {
      const modalContent = this.createModalContent(project);
      this.modal.open(modalContent);
    }
  }

  createModalContent(project) {
    return `
      <div class="project-modal">
        <h2>${project.title}</h2>
        <img src="${project.image}" alt="${project.title}" class="modal-image">
        <p>${project.description}</p>
        <div class="project-technologies">
          <h4>Technologies Used:</h4>
          ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
        <div class="project-links">
          ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="btn-primary">View on GitHub</a>` : ''}
          ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" class="btn-secondary">Live Demo</a>` : ''}
        </div>
      </div>
    `;
  }

  // Method to add new project
  addProject(projectData) {
    this.projects.push(projectData);
    this.setupProjectsSection(); // Re-render
  }

  // Method to filter projects by technology
  filterProjects(technology) {
    const filteredProjects = this.projects.filter(project => 
      project.technologies.includes(technology)
    );
    ProjectCard.renderMultiple(filteredProjects, 'projects-container');
  }
}