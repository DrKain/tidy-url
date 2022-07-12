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
        let p = 0;
        let count = 0;
        let body = 'Total unique rules: %RULE_COUNT%\n\n';

        // Sort rules and set padding width
        let lines = rules
            .filter((rule: any) => {
                if (rule.name === 'Global') count = rule.rules.length;
                return rule.name !== 'Global';
            })
            .sort((a: any, b: any) => a.name.localeCompare(b.name))
            .map((rule: any) => {
                if (rule.name.length > p) p = rule.name.length;
                return rule;
            });

        // Create table header
        body += ['| Match'.padEnd(p + 2, ' ') + ' | Rules |', '| :'.padEnd(p + 2, '-') + ' | :---- |'].join('\n') + '\n';

        // Append rules to table
        body += lines
            .map((rule: any) => {
                // prettier-ignore
                const n = (rule.rules ? rule.rules.length : 0) + 
                    (rule.replace ? rule.replace.length : 0) +
                    (rule.decode ? 1: 0) +
                    (rule.redirect ? 1 : 0) + 
                    (rule.amp ? 1 : 0);
                count += n;
                return `| ${rule.name.padEnd(p, ' ')} | ${`${n}`.padEnd(5, ' ')} |`;
            })
            .join('\n');

        // Update the rule count
        body = body.replace('%RULE_COUNT%', count as any);

        // Write
        writeFileSync('./data/supported-sites.txt', body);
        console.log('Updated supported-sites.txt');
    } catch (e) {
        console.log(e);
    }
};

bumpUserscript();
generateSupported();
