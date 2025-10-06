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
    if (!this.track) {
      console.error('Certificate slider track not found');
      return;
    }
    
    console.log('Certificate slider initialized successfully');
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
      this.prevBtn.addEventListener('click', () => {
        console.log('Previous button clicked');
        this.prevSlide();
      });
    }
    
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        console.log('Next button clicked');
        this.nextSlide();
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.prevSlide();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.nextSlide();
      }
    });

    // Touch/swipe support
    let startX = 0;
    let endX = 0;

    this.track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    this.track.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      this.handleSwipe(startX, endX);
    });

    // Mouse drag support for desktop
    let isDragging = false;
    let mouseStartX = 0;
    
    this.track.addEventListener('mousedown', (e) => {
      isDragging = true;
      mouseStartX = e.clientX;
      this.track.style.cursor = 'grabbing';
    });

    this.track.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
    });

    this.track.addEventListener('mouseup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      this.track.style.cursor = 'grab';
      const mouseEndX = e.clientX;
      this.handleSwipe(mouseStartX, mouseEndX);
    });

    this.track.addEventListener('mouseleave', () => {
      if (isDragging) {
        isDragging = false;
        this.track.style.cursor = 'grab';
      }
    });

    // Set initial cursor
    this.track.style.cursor = 'grab';

    // Wheel/scroll support for desktop
    this.track.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (e.deltaX > 0 || e.deltaY > 0) {
        this.nextSlide();
      } else if (e.deltaX < 0 || e.deltaY < 0) {
        this.prevSlide();
      }
    });
  }

  handleSwipe(startX, endX) {
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
    
    console.log(`Sliding to position ${this.currentSlide}, translateX: ${translateX}%`);
    
    // Update dots
    const dots = this.dotsContainer?.querySelectorAll('.dot');
    if (dots) {
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === this.currentSlide);
      });
    }
    
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