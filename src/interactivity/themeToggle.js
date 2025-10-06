// Theme toggle functionality
export class ThemeToggle {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.createToggleButton();
    this.bindEvents();
  }

  createToggleButton() {
    const toggleButton = document.createElement('button');
    toggleButton.id = 'theme-toggle';
    toggleButton.className = 'theme-toggle-btn';
    toggleButton.setAttribute('aria-label', 'Toggle theme');
    toggleButton.innerHTML = this.getToggleIcon();
    
    // Add to header or create a fixed position button
    const header = document.querySelector('header');
    if (header) {
      header.appendChild(toggleButton);
    } else {
      toggleButton.style.position = 'fixed';
      toggleButton.style.top = '20px';
      toggleButton.style.right = '20px';
      toggleButton.style.zIndex = '1000';
      document.body.appendChild(toggleButton);
    }
  }

  getToggleIcon() {
    return this.currentTheme === 'light' 
      ? '<span class="theme-icon">🌙</span>' 
      : '<span class="theme-icon">☀️</span>';
  }

  bindEvents() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('#theme-toggle')) {
        this.toggleTheme();
      }
    });

    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
          this.applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
    
    // Update toggle button icon
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.innerHTML = this.getToggleIcon();
    }
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add(`theme-${theme}`);
  }

  getCurrentTheme() {
    return this.currentTheme;
  }

  setTheme(theme) {
    if (['light', 'dark'].includes(theme)) {
      this.currentTheme = theme;
      this.applyTheme(theme);
      localStorage.setItem('theme', theme);
    }
  }
}