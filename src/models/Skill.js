// Skill model class
export class Skill {
  constructor(category, items = []) {
    this.category = category;
    this.items = items;
  }

  // Method to render skill category as HTML
  toHTML() {
    return `
      <div class="skill-category">
        <h4>${this.category}</h4>
        <div class="skill-items">
          ${this.items.map(item => `<span class="skill-item">${item}</span>`).join('')}
        </div>
      </div>
    `;
  }

  // Method to add a skill item
  addSkill(skillName) {
    if (!this.items.includes(skillName)) {
      this.items.push(skillName);
    }
  }

  // Method to remove a skill item
  removeSkill(skillName) {
    this.items = this.items.filter(item => item !== skillName);
  }

  // Static method to create skill from data
  static fromData(data) {
    return new Skill(data.category, data.items);
  }
}