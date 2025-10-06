// ProjectCard component
import { Project } from '../models/Project.js';

export class ProjectCard {
  constructor(projectData) {
    this.project = Project.fromData(projectData);
  }

  render() {
    return this.project.toHTML();
  }

  // Static method to render multiple project cards
  static renderMultiple(projectsData, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const projectCards = projectsData
      .map(data => new ProjectCard(data).render())
      .join('');

    container.innerHTML = `
      <div class="projects-grid">
        ${projectCards}
      </div>
    `;
  }

  // Method to bind events to project cards
  static bindEvents() {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('project-link')) {
        // Add any custom analytics or tracking here
        console.log('Project link clicked:', e.target.href);
      }
    });
  }
}