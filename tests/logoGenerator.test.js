const Circle = require('../Circle.js'); // Adjust the import path as needed

describe('Circle class', () => {
  it('should generate valid SVG for a circle', () => {
    const circle = new Circle('Circle', '#FF0000', '#000000', 5);
    const svgContent = circle.generateSvg();
    expect(svgContent).toContain('<circle');
    expect(svgContent).toContain('r="95"');
    // Add more assertions as needed to validate the SVG output
  });
});