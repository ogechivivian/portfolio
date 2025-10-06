// Home page setup and initialization
import { Navbar } from '../ui-components/Navbar.js';

export class HomePage {
  constructor() {
    this.navbar = null;
    this.init();
  }

  init() {
    this.setupNavbar();
    this.setupHomeSection();
    this.bindEvents();
  }

  setupNavbar() {
    this.navbar = new Navbar();
  }

  setupHomeSection() {
    // Setup home section animations or interactions
    const homeSection = document.querySelector('.home-section');
    if (homeSection) {
      // Add any home-specific functionality
      this.animateHomeText();
    }
  }

  animateHomeText() {
    const homeText = document.querySelector('.home-text h2');
    if (homeText) {
      // Add typewriter effect or other animations
      homeText.style.opacity = '0';
      setTimeout(() => {
        homeText.style.transition = 'opacity 1s ease-in';
        homeText.style.opacity = '1';
      }, 500);
    }
  }

  bindEvents() {
    // Setup scroll-based navbar highlighting
    window.addEventListener('scroll', () => {
      if (this.navbar) {
        this.navbar.highlightCurrentSection();
      }
    });

    // Setup download CV button
    const downloadBtn = document.querySelector('.home-text button');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', this.handleDownloadCV);
    }
  }

  handleDownloadCV() {
    // Implement CV download functionality
    console.log('Download CV clicked');
    // You can replace this with actual file download logic
    const link = document.createElement('a');
    link.href = './assets/files/CV.pdf'; // Update path to your CV
    link.download = 'Okey_Ogechi_Vivian_CV.pdf';
    link.click();
  }
}