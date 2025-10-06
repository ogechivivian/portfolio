// Navbar component
import { navItems } from '../data/navItems.js';

export class Navbar {
  constructor(containerId = 'navLinks') {
    this.container = document.getElementById(containerId);
    this.navItems = navItems;
    this.init();
  }

  init() {
    this.render();
    this.bindEvents();
  }

  render() {
    if (!this.container) return;
    
    this.container.innerHTML = this.navItems
      .map(item => `<a href="${item.href}">${item.label}</a>`)
      .join('');
  }

  bindEvents() {
    // Add smooth scrolling for internal links only
    this.container.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        const href = e.target.getAttribute('href');
        
        // Only prevent default for internal hash links (sections on current page)
        if (href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
        // For external links (like projects.html), let the browser handle navigation normally
      }
    });
  }

  // Method to highlight current section (only for hash-based navigation)
  highlightCurrentSection() {
    const scrollPosition = window.scrollY + 100;

    this.navItems.forEach(item => {
      // Only process items that have hash hrefs (internal sections)
      if (item.href.startsWith('#')) {
        const sectionId = item.href.substring(1);
        const section = document.getElementById(sectionId);
        
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const navLink = this.container.querySelector(`a[href="#${sectionId}"]`);

          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLink?.classList.add('active');
          } else {
            navLink?.classList.remove('active');
          }
        }
      }
    });
  }
}