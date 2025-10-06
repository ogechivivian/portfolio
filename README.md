# Portfolio Project - Okey Ogechi, Vivian

A modern, responsive portfolio website showcasing DevOps, Cloud Computing, and Site Reliability Engineering expertise.

🌐 **Live Site:** https://ogechivivian.github.io/portfolio/

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen)

## 🏗️ Project Structure

This project follows a modular, scalable architecture based on modern web development best practices:

```
portfolio-project/
├── index.html              # Main landing page
├── about.html              # About page
├── projects.html           # Projects showcase page
├── README.md              # Project documentation
├── assets/                # Static files
│   ├── images/           # Image assets
│   ├── fonts/            # Custom fonts (if any)
│   └── styles/           # SCSS/CSS files
│       ├── main.scss     # Main stylesheet
│       ├── main.css      # Compiled CSS
│       ├── main.css.map  # Source map
│       └── components/   # Component-specific styles
│           ├── _header.scss
│           └── _buttons.scss
└── src/                   # JavaScript source files
    ├── data/             # Data configuration files
    │   ├── projects.js   # Project data
    │   ├── skills.js     # Skills data
    │   └── navItems.js   # Navigation configuration
    ├── models/           # Data models (OOP classes)
    │   ├── Project.js    # Project model
    │   └── Skill.js      # Skill model  
    ├── ui-components/    # Reusable UI components
    │   ├── Navbar.js     # Navigation component
    │   ├── ProjectCard.js # Project card component
    │   ├── Modal.js      # Modal component
    │   ├── Menu.js       # Mobile menu component
    │   └── Slider.js     # Image/content slider
    ├── pages/            # Page-specific logic
    │   ├── home.js       # Home page controller
    │   ├── about.js      # About page controller
    │   └── projects.js   # Projects page controller
    ├── interactivity/    # Interactive features
    │   ├── productControls.js # Project filtering/sorting
    │   └── themeToggle.js     # Dark/light theme toggle
    └── main.js           # Application entry point
```

## 🚀 Features

- **Responsive Design**: Mobile-first approach with modern CSS Grid and Flexbox
- **Modular Architecture**: Component-based JavaScript with ES6 modules
- **Interactive Elements**: 
  - Smooth scrolling navigation
  - Project filtering and sorting
  - Image slider for certifications
  - Dark/light theme toggle
  - Mobile-friendly hamburger menu
- **Performance Optimized**: Lazy loading, optimized images, and efficient CSS
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation support
- **SEO Friendly**: Proper meta tags, structured data, and semantic markup

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3/SCSS, Vanilla JavaScript (ES6+)
- **Architecture**: Component-based design with MVC patterns
- **Styling**: SCSS with modular component approach
- **Icons & Images**: Optimized assets with proper alt text
- **Browser Support**: Modern browsers with progressive enhancement

## 📱 Pages

1. **Home (index.html)**: Main landing page with hero section, about preview, and contact
2. **About (about.html)**: Detailed information about experience and expertise  
3. **Projects (projects.html)**: Portfolio showcase with filtering and detailed project views

## 🎨 Styling Architecture

The project uses SCSS with a component-based approach:
- Main styles in `assets/styles/main.scss`
- Component-specific styles in `assets/styles/components/`
- Responsive design with mobile-first approach
- CSS custom properties for theming

## 🧩 Component System

### Data Layer
- **Models**: Object-oriented classes for Projects and Skills
- **Data**: Configuration files for projects, skills, and navigation

### UI Components
- **Navbar**: Smart navigation with active states and smooth scrolling
- **ProjectCard**: Reusable project display components
- **Modal**: Overlay system for detailed project views
- **Menu**: Mobile-responsive hamburger menu
- **Slider**: Touch-enabled content carousel

### Page Controllers
- **HomePage**: Manages home page interactions and animations
- **AboutPage**: Handles about page-specific functionality
- **ProjectsPage**: Controls project filtering, sorting, and modal displays

### Interactive Features
- **ProductControls**: Project filtering and sorting system
- **ThemeToggle**: Dark/light mode switching with persistence

## 🚀 Getting Started

1. **Clone or download** the project files
2. **Open** `index.html` in a modern web browser
3. **For development**: Use a local server (Live Server extension in VS Code recommended)

## 📝 Customization

### Adding New Projects
Edit `src/data/projects.js` to add new project entries:

```javascript
{
  id: 3,
  title: "Your Project Name",
  description: "Project description",
  technologies: ["Tech1", "Tech2"],
  image: "./assets/images/project3.jpg",
  githubUrl: "https://github.com/username/project",
  liveUrl: "https://project-demo.com"
}
```

### Modifying Skills
Update `src/data/skills.js` to modify the skills display:

```javascript
{
  category: "New Category",
  items: ["Skill 1", "Skill 2", "Skill 3"]
}
```

### Styling Changes
- Main styles: `assets/styles/main.scss`
- Component styles: `assets/styles/components/`
- Compile SCSS to CSS when making changes

## 🔧 Development

For active development:
1. Use a local development server
2. Install SCSS compiler if modifying styles
3. Test across different devices and browsers
4. Validate HTML and check accessibility

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Contact**: [okeyogechivivian@gmail.com](mailto:okeyogechivivian@gmail.com)  
**LinkedIn**: [Ogechi Vivian](https://www.linkedin.com/in/ogechi-vivian-5109b2114/)  
**GitHub**: [ogechivivian](https://github.com/ogechivivian)

A lightweight, accessible portfolio scaffold built with HTML, SCSS, and vanilla JavaScript (ES modules), structured around OOUX objects (Project, CaseStudy, Skill, CV).

## How to run
Open `index.html` in a browser. No build step is required.

## SCSS
This repo includes `scss/main.scss`. Compile it to `css/main.css` using your preferred Sass compiler:

```bash
sass scss/main.scss css/main.css --no-source-map --style=compressed
```

## Where to add content
- `data/projects.json` — add your projects, skills, and CV.
- `js/modules/models/*` — extend OOP models if needed.
- `js/modules/components/views/*` — edit views and layout.

## Assignment alignment
- OOP (classes, encapsulation): see `models/*`.
- ES modules: see `js/modules/*` and `main.js`.
- OOUX: objects map to UI and code.
- Accessibility: skip link, landmarks, focus mgmt, ARIA, keyboard nav.

Good luck!
