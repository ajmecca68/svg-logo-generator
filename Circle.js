class Circle {
    constructor(name, color, borderColor, borderWidth) {
      this.name = name;
      this.color = color;
      this.borderColor = borderColor;
      this.borderWidth = borderWidth;
    }
  
    generateSvg() {
      return `<circle cx="100" cy="100" r="95" fill="${this.color}" stroke="${this.borderColor}" stroke-width="${this.borderWidth}" />`;
    }
  }
  
  module.exports = Circle;