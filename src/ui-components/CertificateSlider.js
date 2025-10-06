// Certificate Slider Component
export class CertificateSlider {
  constructor() {
    this.track = document.getElementById('cert-slider-track');
    this.prevBtn = document.getElementById('cert-prev');
    this.nextBtn = document.getElementById('cert-next');
    this.dotsContainer = document.getElementById('cert-dots');
    this.sliderRoot = document.querySelector('.certifications-slider');

    this.currentSlide = 0;
    this.slidesPerView = 1;
    this.autoPlayInterval = null;

    this.onResize = this.onResize.bind(this);

    this.init();
  }

  init() {
    if (!this.track || !this.sliderRoot) {
      console.error('Certificate slider setup failed: required elements missing');
      return;
    }

    this.slides = Array.from(this.track.querySelectorAll('.cert-slide'));
    this.totalSlides = this.slides.length;

    if (this.totalSlides === 0) {
      return;
    }

    this.updateResponsiveSettings(true);
    this.bindEvents();
    this.updateSlider();
    this.startAutoPlay();
  }

  getSlidesPerView() {
    const styles = window.getComputedStyle(this.sliderRoot);
    const value = parseInt(styles.getPropertyValue('--slides-per-view'), 10);
    if (Number.isNaN(value) || value < 1) {
      return 1;
    }
    return Math.min(value, this.totalSlides);
  }

  updateResponsiveSettings(force = false) {
    const newSlidesPerView = this.getSlidesPerView();

    if (!force && newSlidesPerView === this.slidesPerView) {
      this.maxIndex = Math.max(0, this.totalSlides - this.slidesPerView);
      this.toggleControls();
      return;
    }

    this.slidesPerView = newSlidesPerView;
    this.maxIndex = Math.max(0, this.totalSlides - this.slidesPerView);
    this.currentSlide = Math.min(this.currentSlide, this.maxIndex);

    const basis = 100 / this.slidesPerView;
    this.slides.forEach((slide) => {
      slide.style.flex = `0 0 ${basis}%`;
    });

    this.buildDots();
    this.toggleControls();
  }

  buildDots() {
    if (!this.dotsContainer) return;

    const positions = Math.max(1, this.maxIndex + 1);
    this.dotsContainer.innerHTML = '';

    for (let i = 0; i < positions; i += 1) {
      const dot = document.createElement('div');
      dot.className = 'dot';
      dot.addEventListener('click', () => this.goToSlide(i));
      this.dotsContainer.appendChild(dot);
    }

    this.updateDots();
  }

  bindEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.handlePrev());
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.handleNext());
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.handleNext();
      }
    });

    let startX = 0;
    this.track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    this.track.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      this.handleSwipe(startX, endX);
    });

    let isDragging = false;
    let mouseStartX = 0;

    this.track.addEventListener('mousedown', (e) => {
      isDragging = true;
      mouseStartX = e.clientX;
      this.track.style.cursor = 'grabbing';
    });

    this.track.addEventListener('mousemove', (e) => {
      if (isDragging) {
        e.preventDefault();
      }
    });

    this.track.addEventListener('mouseup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      this.track.style.cursor = 'grab';
      this.handleSwipe(mouseStartX, e.clientX);
    });

    this.track.addEventListener('mouseleave', () => {
      if (isDragging) {
        isDragging = false;
        this.track.style.cursor = 'grab';
      }
    });

    this.track.addEventListener('wheel', (e) => {
      if (!this.hasMultipleSlides) return;
      e.preventDefault();
      if (e.deltaX > 0 || e.deltaY > 0) {
        this.handleNext();
      } else if (e.deltaX < 0 || e.deltaY < 0) {
        this.handlePrev();
      }
    });

    this.track.style.cursor = 'grab';

    window.addEventListener('resize', this.onResize);
  }

  handleSwipe(startX, endX) {
    if (!this.hasMultipleSlides) return;

    const threshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        this.handleNext();
      } else {
        this.handlePrev();
      }
    }
  }

  handlePrev() {
    if (!this.hasMultipleSlides) return;

    this.currentSlide = this.currentSlide > 0 ? this.currentSlide - 1 : this.maxIndex;
    this.updateSlider();
    this.resetAutoPlay();
  }

  handleNext() {
    if (!this.hasMultipleSlides) return;

    this.currentSlide = this.currentSlide < this.maxIndex ? this.currentSlide + 1 : 0;
    this.updateSlider();
    this.resetAutoPlay();
  }

  goToSlide(index) {
    if (!this.hasMultipleSlides) return;

    this.currentSlide = Math.max(0, Math.min(index, this.maxIndex));
    this.updateSlider();
    this.resetAutoPlay();
  }

  updateSlider() {
    const basis = 100 / this.slidesPerView;
    const translateX = this.currentSlide * basis;
    this.track.style.transform = `translateX(-${translateX}%)`;
    this.updateDots();
  }

  updateDots() {
    if (!this.dotsContainer) return;

    const dots = this.dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentSlide);
    });
  }

  toggleControls() {
    this.hasMultipleSlides = this.totalSlides > this.slidesPerView;
    const displayValue = this.hasMultipleSlides ? 'flex' : 'none';

    if (this.prevBtn) {
      this.prevBtn.style.display = displayValue;
    }
    if (this.nextBtn) {
      this.nextBtn.style.display = displayValue;
    }
    if (this.dotsContainer) {
      this.dotsContainer.style.display = this.hasMultipleSlides ? 'flex' : 'none';
    }

    if (!this.hasMultipleSlides) {
      this.currentSlide = 0;
      this.track.style.transform = 'translateX(0)';
      this.resetAutoPlay(true);
    }
  }

  onResize() {
    this.updateResponsiveSettings();
    this.updateSlider();
  }

  startAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }

    if (!this.hasMultipleSlides) {
      return;
    }

    this.autoPlayInterval = setInterval(() => {
      this.handleNext();
    }, 5000);
  }

  resetAutoPlay(skipRestart = false) {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }

    if (!skipRestart) {
      this.startAutoPlay();
    }
  }

  destroy() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }

    window.removeEventListener('resize', this.onResize);
  }
}
