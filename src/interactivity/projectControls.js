// Project controls for project filtering and sorting
export class ProjectControls {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.filters = new Set();
    this.currentSort = 'default';
    this.init();
  }

  init() {
    this.render();
    this.bindEvents();
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="controls-section">
        <div class="filter-controls">
          <h4>Filter by Technology:</h4>
          <div class="filter-buttons">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="AWS">AWS</button>
            <button class="filter-btn" data-filter="Docker">Docker</button>
            <button class="filter-btn" data-filter="Kubernetes">Kubernetes</button>
            <button class="filter-btn" data-filter="Terraform">Terraform</button>
            <button class="filter-btn" data-filter="Jenkins">Jenkins</button>
          </div>
        </div>
        
        <div class="sort-controls">
          <h4>Sort by:</h4>
          <select class="sort-select">
            <option value="default">Default</option>
            <option value="title">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>
    `;
  }

  bindEvents() {
    if (!this.container) return;

    // Filter button events
    this.container.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-btn')) {
        const filter = e.target.dataset.filter;
        this.handleFilterClick(e.target, filter);
      }
    });

    // Sort select events
    const sortSelect = this.container.querySelector('.sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.handleSortChange(e.target.value);
      });
    }
  }

  handleFilterClick(button, filter) {
    // Update active state
    this.container.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    button.classList.add('active');

    // Emit filter event
    this.emitEvent('filterChange', { filter });
  }

  handleSortChange(sortValue) {
    this.currentSort = sortValue;
    this.emitEvent('sortChange', { sort: sortValue });
  }

  emitEvent(eventName, data) {
    const event = new CustomEvent(eventName, { detail: data });
    document.dispatchEvent(event);
  }

  // Method to get current active filters
  getActiveFilters() {
    const activeBtn = this.container.querySelector('.filter-btn.active');
    return activeBtn ? activeBtn.dataset.filter : 'all';
  }

  // Method to get current sort
  getCurrentSort() {
    return this.currentSort;
  }
}