const inquirer = require('inquirer');
const fs = require('fs');
const colorChoices = [
    { name: "Red", value: "#FF0000" },
    { name: "Blue", value: "#0000FF" },
    { name: "Green", value: "#008000" },
    { name: "Yellow", value: "#FFFF00" },
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Grey", value: "#808080" },
    { name: "Baby Blue", value: "#89CFF0" },
    { name: "Pink", value: "#FFC0CB" }
];

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
    }
];


// SVG generation based on user's choice
function generateSvg(answers) {
    let svgContent = '';
    const header = '<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">';
    const footer = '</svg>';
    
    switch(answers.shape) {
        case 'Circle':
            svgContent = `<circle cx="100" cy="100" r="80" fill="${answers.color}" />`;
            break;
        case 'Rectangle':
            svgContent = `<rect width="180" height="100" x="10" y="50" fill="${answers.color}" />`;
            break;
        case 'Triangle':
            svgContent = `<polygon points="100,10 190,190 10,190" fill="${answers.color}" />`;
            break;
        case 'Hexagon':
            svgContent = `<polygon points="100,10 190,60 190,140 100,190 10,140 10,60" fill="${answers.color}" />`;
            break;
        case 'Square':
            svgContent = `<rect width="160" height="160" x="20" y="20" fill="${answers.color}" />`;
            break;
    }

    let textContent = '';
if (answers.text.length === 1) {
    textContent = `<text x="100" y="100" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="35" fill="${answers.textColor}">${answers.text}</text>`;
} else if (answers.text.length === 2) {
    textContent = `
        <text x="85" y="100" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="25" fill="${answers.textColor}">${answers.text[0]}</text>
        <text x="115" y="100" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="25" fill="${answers.textColor}">${answers.text[1]}</text>
    `;
} else if (answers.text.length === 3) {
    textContent = `
        <text x="80" y="100" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="25" fill="${answers.textColor}">${answers.text[0]}</text>
        <text x="100" y="100" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="35" fill="${answers.textColor}">${answers.text[1]}</text>
        <text x="120" y="100" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="25" fill="${answers.textColor}">${answers.text[2]}</text>
    `;
}

    
    return `${header}${svgContent}${textContent}${footer}`;
}
 
inquirer.prompt(questions).then(answers => {
    const svgContent = generateSvg(answers);
    fs.writeFileSync('logo.svg', svgContent, 'utf-8');
    console.log('logo.svg has been generated!');
});
