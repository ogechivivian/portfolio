// Modal component for project details
export class Modal {
  constructor() {
    this.modal = null;
    this.isOpen = false;
    this.init();
  }

  init() {
    this.createModal();
    this.bindEvents();
  }

  createModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <button class="modal-close">&times;</button>
        <div class="modal-body"></div>
      </div>
    `;
    document.body.appendChild(modal);
    this.modal = modal;
  }

  bindEvents() {
    if (!this.modal) return;

    // Close modal on overlay click
    this.modal.querySelector('.modal-overlay').addEventListener('click', () => {
      this.close();
    });

    // Close modal on close button click
    this.modal.querySelector('.modal-close').addEventListener('click', () => {
      this.close();
    });

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  open(content) {
    if (!this.modal) return;
    
    this.modal.querySelector('.modal-body').innerHTML = content;
    this.modal.classList.add('active');
    document.body.classList.add('modal-open');
    this.isOpen = true;
  }

  close() {
    if (!this.modal) return;
    
    this.modal.classList.remove('active');
    document.body.classList.remove('modal-open');
    this.isOpen = false;
  }
}