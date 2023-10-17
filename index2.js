const inquirer = require('inquirer');
const fs = require('fs');

class Color {
  constructor(name, value) {
    this.name = name;
    this.value = value;
  }
}

class Shape {
  constructor(name, color, borderColor, borderWidth) {
    this.name = name;
    this.color = color;
    this.borderColor = borderColor;
    this.borderWidth = borderWidth;
  }

  generateSvg() {
    throw new Error('generateSvg() method must be implemented by subclasses');
  }
}

class Circle extends Shape {
  generateSvg() {
    return `<circle cx="100" cy="100" r="95" fill="${this.color}" stroke="${this.borderColor}" stroke-width="${this.borderWidth}" />`;
  }
}

class Square extends Shape {
    generateSvg() {
      return `<rect x="5" y="5" width="190" height="190" fill="${this.color}" stroke="${this.borderColor}" stroke-width="${this.borderWidth}" />`;
    }
  }

  class Rectangle extends Shape {
    generateSvg() {
      return `<rect x="5" y="5" width="190" height="95" fill="${this.color}" stroke="${this.borderColor}" stroke-width="${this.borderWidth}" />`;
    }
  }
  
  class Triangle extends Shape {
    generateSvg() {
      return `<polygon points="100,5 5,195 195,195" fill="${this.color}" stroke="${this.borderColor}" stroke-width="${this.borderWidth}" />`;
    }
  }
  

// Define other shape classes (Rectangle, Triangle, Hexagon) similarly.

class Text {
  constructor(text, x, y, font, fontSize, textColor) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.font = font;
    this.fontSize = fontSize;
    this.textColor = textColor;
  }

  generateSvg() {
    return `<text x="${this.x}" y="${this.y}" dominant-baseline="middle" text-anchor="middle" font-family="${this.font}" font-size="${this.fontSize}" font-weight="bold" fill="${this.textColor}">${this.text}</text>`;
  }
}

class SVG {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.elements = [];
  }

  addElement(element) {
    this.elements.push(element);
  }

  generate() {
    const header = `<svg width="${this.width}" height="${this.height}" xmlns="http://www.w3.org/2000/svg">`;
    const footer = '</svg>';
    const content = this.elements.map(element => element.generateSvg()).join('');
    return `${header}${content}${footer}`;
  }
}

const colorChoices = [
  new Color("Red", "#FF0000"),
  new Color("Blue", "#0000FF"),
  new Color("Baby Blue", "#89CFF0"),
  new Color("Green", "#008000"),
  new Color("Yellow", "#FFFF00"),
  new Color("Black", "#000000"),
  new Color("White", "#FFFFFF"),
  new Color("Grey", "#808080"),
  new Color("Pink", "#FFC0CB")
];

const fontChoices = ['Arial', 'Georgia', 'Courier New'];

// Questions for the user
const questions = [
    {
        type: 'list',
        name: 'shape',
        message: 'Select a shape for the logo:',
        choices: ['Circle', 'Rectangle', 'Triangle', 'Square']
    },
    {
        type: 'input',
        name: 'text',
        message: 'Provide text for the logo (max 3 characters):',
        validate: function(value) {
            if (value.length > 3) {
                return 'Text must be 3 characters or fewer.';
            }
            return true;
        }
    },
    {
        type: 'list',
        name: 'color',
        message: 'Choose a color for the logo:',
        choices: colorChoices
    },
    {
        type: 'list',
        name: 'textColor',
        message: 'Choose a color for the text:',
        choices: colorChoices
    },
    {
        type: 'list',
        name: 'fontFirst',
        message: 'Choose a font for the first character:',
        choices: fontChoices
    },
    {
        type: 'list',
        name: 'fontMiddle',
        message: 'Choose a font for the second character:',
        when: (answers) => answers.text.length > 1,
        choices: fontChoices
    },
    {
        type: 'list',
        name: 'fontLast',
        message: 'Choose a font for the third character:',
        when: (answers) => answers.text.length === 3,
        choices: fontChoices
    }
];

inquirer.prompt(questions).then(answers => {
  const svg = new SVG(200, 200);
  const shape = getSelectedShape(answers);
  const text = new Text(
    answers.text,
    100, // x-coordinate for text (centered)
    100, // y-coordinate for text (centered)
    answers.fontFirst,
    60, // Font size for the text
    answers.textColor
  );
  svg.addElement(shape);
  svg.addElement(text);
  const svgContent = svg.generate();
  fs.writeFileSync('logo.svg', svgContent, 'utf-8');
  console.log('logo.svg has been generated!');
});

function getSelectedShape(answers) {
  const { shape, color, textColor } = answers;
  const borderColor = textColor;
  const borderWidth = 5;

  switch (shape) {
    case 'Circle':
      return new Circle(shape, color, borderColor, borderWidth);
    case 'Square':
      return new Square(shape, color, borderColor, borderWidth);
      case 'Rectangle':
        return new Rectangle(shape, color, borderColor, borderWidth);
      case 'Triangle':
        return new Triangle(shape, color, borderColor, borderWidth);
      // Add cases for other shape types as needed
    default:
      throw new Error('Invalid shape selected');
  }
}
