// Project model class
export class Project {
  constructor(id, title, description, technologies = [], image = '', githubUrl = '', liveUrl = '') {
    this.id = id;
    this.title = title;
    this.description = description;
    this.technologies = technologies;
    this.image = image;
    this.githubUrl = githubUrl;
    this.liveUrl = liveUrl;
  }

  // Method to render project as HTML
  toHTML() {
    return `
      <div class="project-card" data-id="${this.id}">
        <div class="project-image">
          <img src="${this.image}" alt="${this.title}" />
        </div>
        <div class="project-content">
          <h3>${this.title}</h3>
          <p>${this.description}</p>
          <div class="project-technologies">
            ${this.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          </div>
          <div class="project-links">
            ${this.githubUrl ? `<a href="${this.githubUrl}" target="_blank" class="project-link">GitHub</a>` : ''}
            ${this.liveUrl ? `<a href="${this.liveUrl}" target="_blank" class="project-link">Live Demo</a>` : ''}
          </div>
        </div>
      </div>
    `;
  }

  // Static method to create project from data
  static fromData(data) {
    return new Project(
      data.id,
      data.title,
      data.description,
      data.technologies,
      data.image,
      data.githubUrl,
      data.liveUrl
    );
  }
}