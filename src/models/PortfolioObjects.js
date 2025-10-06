// Core OOUX Objects for Multimedia Design Portfolio

// 1. Project Object
export class Project {
  constructor(id, title, category, description, images, tools, timeline, process, results) {
    this.id = id;
    this.title = title;
    this.category = category; // 'brand-identity', 'web-design', 'multimedia'
    this.description = description;
    this.images = images; // Array of image objects
    this.tools = tools; // Array of tools used
    this.timeline = timeline;
    this.process = process; // Array of process steps
    this.results = results; // Impact metrics
    this.featured = false;
  }

  // Methods
  render() {
    return `
      <article class="project-card" data-category="${this.category}">
        <div class="project-image">
          <img src="${this.images[0].url}" alt="${this.images[0].alt}" />
        </div>
        <div class="project-content">
          <h3>${this.title}</h3>
          <p class="project-category">${this.category}</p>
          <p>${this.description}</p>
          <div class="project-tools">
            ${this.tools.map(tool => `<span class="tool-tag">${tool}</span>`).join('')}
          </div>
        </div>
      </article>
    `;
  }

  static fromData(data) {
    return new Project(
      data.id, data.title, data.category, data.description,
      data.images, data.tools, data.timeline, data.process, data.results
    );
  }
}

// 2. CaseStudy Object
export class CaseStudy {
  constructor(id, title, client, overview, challenge, solution, process, results, images) {
    this.id = id;
    this.title = title;
    this.client = client;
    this.overview = overview;
    this.challenge = challenge;
    this.solution = solution;
    this.process = process; // Array of ProcessStep objects
    this.results = results;
    this.images = images;
  }

  renderDetailView() {
    return `
      <article class="case-study-detail">
        <header class="case-study-header">
          <h1>${this.title}</h1>
          <p class="client">${this.client}</p>
        </header>
        <section class="overview">
          <h2>Overview</h2>
          <p>${this.overview}</p>
        </section>
        <section class="challenge">
          <h2>Challenge</h2>
          <p>${this.challenge}</p>
        </section>
        <section class="solution">
          <h2>Solution</h2>
          <p>${this.solution}</p>
        </section>
        <section class="process">
          <h2>Process</h2>
          ${this.process.map(step => step.render()).join('')}
        </section>
        <section class="results">
          <h2>Results</h2>
          <ul>
            ${this.results.map(result => `<li>${result}</li>`).join('')}
          </ul>
        </section>
      </article>
    `;
  }
}

// 3. ProcessStep Object
export class ProcessStep {
  constructor(stepNumber, title, description, methods, deliverables, images) {
    this.stepNumber = stepNumber;
    this.title = title;
    this.description = description;
    this.methods = methods; // Array of methods used
    this.deliverables = deliverables; // Array of deliverables
    this.images = images; // Array of supporting images
  }

  render() {
    return `
      <div class="process-step">
        <div class="step-number">${this.stepNumber}</div>
        <h3>${this.title}</h3>
        <p>${this.description}</p>
        <div class="methods">
          ${this.methods.map(method => `<span class="method-tag">${method}</span>`).join('')}
        </div>
        <div class="step-images">
          ${this.images.map(img => `<img src="${img.url}" alt="${img.alt}" />`).join('')}
        </div>
      </div>
    `;
  }
}

// 4. Skill Object
export class Skill {
  constructor(name, category, proficiency, projects, description) {
    this.name = name;
    this.category = category; // 'design', 'development', 'research'
    this.proficiency = proficiency; // 1-5 scale
    this.projects = projects; // Array of project IDs where skill was used
    this.description = description;
  }

  render() {
    return `
      <div class="skill-item" data-category="${this.category}">
        <h4>${this.name}</h4>
        <div class="proficiency-bar">
          <div class="proficiency-fill" style="width: ${this.proficiency * 20}%"></div>
        </div>
        <p>${this.description}</p>
      </div>
    `;
  }
}

// 5. CV Object
export class CV {
  constructor(personalInfo, experience, education, skills, projects, awards) {
    this.personalInfo = personalInfo;
    this.experience = experience; // Array of Experience objects
    this.education = education; // Array of Education objects
    this.skills = skills; // Array of Skill objects
    this.projects = projects; // Array of project references
    this.awards = awards; // Array of awards/certifications
  }

  generatePDF() {
    // Method to generate downloadable PDF
    console.log('Generating CV PDF...');
  }

  renderSection(sectionName) {
    switch(sectionName) {
      case 'experience':
        return this.experience.map(exp => exp.render()).join('');
      case 'education':
        return this.education.map(edu => edu.render()).join('');
      case 'skills':
        return this.skills.map(skill => skill.render()).join('');
      default:
        return '';
    }
  }
}

// 6. Portfolio Object (Main container)
export class Portfolio {
  constructor() {
    this.projects = [];
    this.caseStudies = [];
    this.skills = [];
    this.cv = null;
    this.currentFilter = 'all';
  }

  addProject(project) {
    this.projects.push(project);
  }

  addCaseStudy(caseStudy) {
    this.caseStudies.push(caseStudy);
  }

  filterProjects(category) {
    this.currentFilter = category;
    return category === 'all' 
      ? this.projects 
      : this.projects.filter(project => project.category === category);
  }

  getFeaturedProjects() {
    return this.projects.filter(project => project.featured);
  }

  renderProjectGrid() {
    const filteredProjects = this.filterProjects(this.currentFilter);
    return `
      <div class="projects-grid">
        ${filteredProjects.map(project => project.render()).join('')}
      </div>
    `;
  }
}