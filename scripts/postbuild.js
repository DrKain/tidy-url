const { readFileSync, writeFileSync } = require('fs');

// This is the script that runs after building

const version = require('../package.json').version;
let data = readFileSync('./data/tidy.user.js', 'utf-8');
const rules = require('../data/rules.js');

/**
 * Update userscript version (to make it fetch the new rules)
 */
const bumpUserscript = () => {
    data = data.replace(/\/\/ @version      (.*)/gi, '// @version      ' + version);
    console.log('Bumped userscript version');
    writeFileSync('./data/tidy.user.js', data);
};

/**
 * Generate supported-sites.txt
 * It's messy, but that's fine. It's not important.
 */
const generateSupported = () => {
    try {
        let body = '| Match                | Rules |\n| :------------------- | :---- |\n';
        body += rules
            .filter((rule) => rule.name !== 'Global')
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((rule) => `| ${rule.name.padEnd(20, ' ')} | ${`${rule.rules.length}`.padEnd(5, ' ')} |`)
            .join('\n');
        writeFileSync('./data/supported-sites.txt', body);
        console.log('Updated supported-sites.txt');
    } catch (e) {
        console.log(e);
    }
};

bumpUserscript();
generateSupported();
