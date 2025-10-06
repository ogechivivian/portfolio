// Main entry point for the application
import { HomePage } from './pages/home.js';
import { AboutPage } from './pages/about.js';

import { Menu } from './ui-components/Menu.js';
import { CertificateSlider } from './ui-components/CertificateSlider.js';

// Debug logging
console.log('Main.js loaded successfully');

class PortfolioApp {
  constructor() {
    this.pages = {};
    this.menu = null;
    this.init();
  }

  init() {
    console.log('App initialization started');
    console.log('Document ready state:', document.readyState);
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      console.log('Waiting for DOM...');
      document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM loaded, initializing app...');
        this.initializeApp();
      });
    } else {
      console.log('DOM already ready, initializing app...');
      // Add a small delay to ensure all elements are rendered
      setTimeout(() => this.initializeApp(), 100);
    }
  }

  initializeApp() {
    this.initializePages();
    this.initializeMenu();
    this.initializeCertificateSlider();
    this.bindGlobalEvents();
    console.log('Portfolio app initialized successfully!');
  }

  initializePages() {
    // Initialize all page controllers
    this.pages.home = new HomePage();
    this.pages.about = new AboutPage();
  }




  initializeMenu() {
    // Initialize mobile menu
    this.menu = new Menu('.menu-toggle', 'navLinks');
  }

  initializeCertificateSlider() {
    // Initialize certificate slider
    this.certificateSlider = new CertificateSlider();
  }


  bindGlobalEvents() {
    // Global scroll events
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Global resize events
    window.addEventListener('resize', this.handleResize.bind(this));

    // Global keyboard events
    document.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  handleScroll() {
    // Handle scroll-based animations and effects
    const scrollY = window.scrollY;
    
    // Add scroll-based header effects
    const header = document.querySelector('header');
    if (header) {
      if (scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }

  handleResize() {
    // Handle responsive adjustments
    const width = window.innerWidth;
    if (width < 768) {
      document.body.classList.add('mobile');
    } else {
      document.body.classList.remove('mobile');
    }
  }

  handleKeydown(e) {
    // Handle global keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'k':
          e.preventDefault();
          // Open command palette or search
          console.log('Search shortcut triggered');
          break;
      }
    }
  }

  // Public methods for external access
  getPage(pageName) {
    return this.pages[pageName];
  }
}

// Initialize the application
const app = new PortfolioApp();

// Export for external access
window.PortfolioApp = app;
