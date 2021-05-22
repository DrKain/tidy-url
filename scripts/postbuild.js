const { readFileSync, writeFileSync } = require('fs');

let data = readFileSync('./data/tidy.user.js', 'utf-8');
const version = require('../package.json').version;

data = data.replace(/\/\/ @version      (.*)/gi, '// @version      ' + version);
console.log('Bumped userscript version');

writeFileSync('./data/tidy.user.js', data);
