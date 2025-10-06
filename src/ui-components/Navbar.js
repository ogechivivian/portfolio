// Navbar component
import { navItems } from '../data/navItems.js';

export class Navbar {
  constructor(containerId = 'navLinks') {
    this.container = document.getElementById(containerId);
    this.navItems = this.getNavItemsForCurrentPage();
    this.init();
  }

  getNavItemsForCurrentPage() {
    const currentPage = window.location.pathname;
    
    // If we're on the projects page, modify links to point back to home page sections
    if (currentPage.includes('projects.html')) {
      return navItems.map(item => {
        // For hash links (sections), point them to index.html with the hash
        if (item.href.startsWith('#')) {
          return {
            ...item,
            href: `./index.html${item.href}`
          };
        }
        // Keep other links as they are
        return item;
      });
    }
    
    // For home page, use the default navigation
    return navItems;
  }

  init() {
    this.render();
    this.bindEvents();
  }

  render() {
    if (!this.container) return;
    
    const currentPage = window.location.pathname;
    
    this.container.innerHTML = this.navItems
      .map(item => {
        // Mark Projects as active when on projects.html
        const isActive = currentPage.includes('projects.html') && item.id === 'projects';
        const activeClass = isActive ? ' class="active"' : '';
        return `<a href="${item.href}"${activeClass}>${item.label}</a>`;
      })
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
        // For external links (like ./index.html, ./projects.html), let the browser handle navigation normally
        // This includes relative paths and absolute URLs
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