const inquirer = require('inquirer');
const fs = require('fs');
const colorChoices = [
    { name: "Red", value: "#FF0000" },
    { name: "Blue", value: "#0000FF" },
    { name: "Baby Blue", value: "#89CFF0" },
    { name: "Green", value: "#008000" },
    { name: "Yellow", value: "#FFFF00" },
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Grey", value: "#808080" },
    { name: "Pink", value: "#FFC0CB" }
];
const fontChoices = ['Arial', 'Georgia', 'Courier New'];

// Questions for the user
const questions = [
    {
        type: 'list',
        name: 'shape',
        message: 'Select a shape for the logo:',
        choices: ['Circle', 'Rectangle', 'Triangle', 'Hexagon', 'Square']
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


// SVG generation based on user's choice
function generateSvg(answers) {
    const header = '<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">';
    let shapeContent = '';
    const borderColor = answers.textColor;
    const borderWidth = 5;
    let textY = 100;

    switch (answers.shape) {
        case 'Circle':
            shapeContent = `<circle cx="100" cy="100" r="95" fill="${answers.color}" stroke="${borderColor}" stroke-width="${borderWidth}" />`;
            break;
        case 'Square':
            shapeContent = `<rect x="5" y="5" width="190" height="190" fill="${answers.color}" stroke="${borderColor}" stroke-width="${borderWidth}" />`;
            break;
        case 'Rectangle':
            shapeContent = `<rect x="5" y="5" width="190" height="95" fill="${answers.color}" stroke="${borderColor}" stroke-width="${borderWidth}" />`;
            textY -= 40;  // Move text up for rectangle
            break;
        case 'Triangle':
            shapeContent = `<polygon points="100,5 5,195 195,195" fill="${answers.color}" stroke="${borderColor}" stroke-width="${borderWidth}" />`;
            textY += 60;  // Move text down for triangle
            break;
        case 'Hexagon':
            shapeContent = `<polygon points="100,5 195,50 195,150 100,195 5,150 5,50" fill="${answers.color}" stroke="${borderColor}" stroke-width="${borderWidth}" />`;
            break;
    }

    let textContent = '';
    if (answers.text.length === 1) {
        textContent = `<text x="100" y="${textY}" dominant-baseline="middle" text-anchor="middle" font-family="${answers.fontFirst}" font-size="60" font-weight="bold" fill="${answers.textColor}">${answers.text}</text>`;
    } else if (answers.text.length === 2) {
        textContent = `<text x="85" y="${textY}" dominant-baseline="middle" text-anchor="middle" font-family="${answers.fontFirst}" font-size="50" font-weight="bold" fill="${answers.textColor}">${answers.text[0]}</text>
        <text x="115" y="${textY}" dominant-baseline="middle" text-anchor="middle" font-family="${answers.fontMiddle}" font-size="50" font-weight="bold" fill="${answers.textColor}">${answers.text[1]}</text>`;
    } else if (answers.text.length === 3) {
        textContent = `<text x="60" y="${textY}" dominant-baseline="middle" text-anchor="middle" font-family="${answers.fontFirst}" font-size="50" font-weight="bold" fill="${answers.textColor}">${answers.text[0]}</text>
        <text x="100" y="${textY}" dominant-baseline="middle" text-anchor="middle" font-family="${answers.fontMiddle}" font-size="60" font-weight="bold" fill="${answers.textColor}">${answers.text[1]}</text>
        <text x="140" y="${textY}" dominant-baseline="middle" text-anchor="middle" font-family="${answers.fontLast}" font-size="50" font-weight="bold" fill="${answers.textColor}">${answers.text[2]}</text>`;
    }

    const footer = '</svg>';
    return `${header}${shapeContent}${textContent}${footer}`;
}

inquirer.prompt(questions).then(answers => {
    const svgContent = generateSvg(answers);
    fs.writeFileSync('logo.svg', svgContent, 'utf-8');
    console.log('logo.svg has been generated!');
});
