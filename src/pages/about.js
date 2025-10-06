// About page setup and functionality
export class AboutPage {
  constructor() {
    this.init();
  }

  init() {
    this.setupAboutSection();
    this.bindEvents();
  }

  setupAboutSection() {
    const aboutSection = document.getElementById('about-me');
    if (aboutSection) {
      this.animateOnScroll(aboutSection);
    }
  }

  animateOnScroll(element) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1
    });

    observer.observe(element);
  }

  bindEvents() {
    // Add any about-specific event listeners
  }

  // Method to update about content dynamically
  updateAboutContent(newContent) {
    const aboutText = document.querySelector('.about-text');
    if (aboutText) {
      aboutText.textContent = newContent;
    }
  }
}