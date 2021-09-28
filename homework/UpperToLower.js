const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`Enter your text: `, (text) => {
    for (let i = 0; i < text.length; i++)
        text = text[i] === text[i].toUpperCase() ? 
                            text.substring(0, i) + text[i].toLowerCase() + text.substring(i + 1) :
                            text.substring(0, i) + text[i].toUpperCase() + text.substring(i + 1);
    console.log(`Your text after processing: ${text}`);
    rl.close();
});

Можна виконати простіше без додаткових модулів.
