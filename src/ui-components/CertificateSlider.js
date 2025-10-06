// Certificate Slider Component
export class CertificateSlider {
  constructor() {
    this.currentSlide = 0;
    this.totalSlides = 5;
    this.track = document.getElementById('cert-slider-track');
    this.prevBtn = document.getElementById('cert-prev');
    this.nextBtn = document.getElementById('cert-next');
    this.dotsContainer = document.getElementById('cert-dots');
    
    this.init();
  }

  init() {
    if (!this.track) return;
    
    this.createDots();
    this.bindEvents();
    this.updateSlider();
    this.startAutoPlay();
  }

  createDots() {
    if (!this.dotsContainer) return;
    
    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot';
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => this.goToSlide(i));
      this.dotsContainer.appendChild(dot);
    }
  }

  bindEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prevSlide());
    }
    
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextSlide());
    }

    // Touch/swipe support
    let startX = 0;
    let endX = 0;

    this.track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    this.track.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      this.handleSwipe();
    });

    // Mouse drag support
    let isDragging = false;
    
    this.track.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
    });

    this.track.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
    });

    this.track.addEventListener('mouseup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      endX = e.clientX;
      this.handleSwipe();
    });

    this.track.addEventListener('mouseleave', () => {
      isDragging = false;
    });
  }

  handleSwipe() {
    const threshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
  }

  prevSlide() {
    this.currentSlide = this.currentSlide > 0 ? this.currentSlide - 1 : this.totalSlides - 1;
    this.updateSlider();
    this.resetAutoPlay();
  }

  nextSlide() {
    this.currentSlide = this.currentSlide < this.totalSlides - 1 ? this.currentSlide + 1 : 0;
    this.updateSlider();
    this.resetAutoPlay();
  }

  goToSlide(index) {
    this.currentSlide = index;
    this.updateSlider();
    this.resetAutoPlay();
  }

  updateSlider() {
    const translateX = -this.currentSlide * 20; // 20% per slide
    this.track.style.transform = `translateX(${translateX}%)`;
    
    // Update dots
    const dots = this.dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentSlide);
    });
    
    // Update button states
    if (this.prevBtn) {
      this.prevBtn.disabled = false; // Enable cycling
    }
    if (this.nextBtn) {
      this.nextBtn.disabled = false; // Enable cycling
    }
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 4000); // Change slide every 4 seconds
  }

  resetAutoPlay() {
    clearInterval(this.autoPlayInterval);
    this.startAutoPlay();
  }

  destroy() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }
}