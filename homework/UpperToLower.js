const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`Enter your text: `, (text) => {
  let result = '';
  for (let i = 0; i < text.length; i++)
      result += text[i] === text[i].toUpperCase() ? text[i].toLowerCase() : text[i].toUpperCase();
  console.log(`Your text after processing: ${result}`);
  rl.close();
});