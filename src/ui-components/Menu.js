// Enhanced Menu class for the new structure
export class Menu {
  constructor(toggleSelector, navSelector) {
    this.menuToggle = document.querySelector(toggleSelector);
    this.navLinks = document.getElementById(navSelector);
    this.isOpen = false;
    this.handleResize = this.handleResize.bind(this);

    this.init();
  }

  init() {
    if (!this.menuToggle || !this.navLinks) return;
    
    this.menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggle();
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (this.isOpen && !this.navLinks.contains(e.target)) {
        this.close();
      }
    });

    // Close menu on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.close();
      }
    });

    // Close menu when clicking on nav links
    this.navLinks.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        this.close();
      }
    });

    window.addEventListener('resize', this.handleResize);
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.navLinks.classList.add("active");
    this.menuToggle.classList.add("active");
    this.menuToggle.innerHTML = "✕";
    this.menuToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
    this.isOpen = true;
  }

  close() {
    this.navLinks.classList.remove("active");
    this.menuToggle.classList.remove("active");
    this.menuToggle.innerHTML = "☰";
    this.menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
    this.isOpen = false;
  }

  // Method to programmatically close menu
  forceClose() {
    this.close();
  }

  handleResize() {
    if (window.innerWidth > 900 && this.isOpen) {
      this.close();
    }
  }
}
