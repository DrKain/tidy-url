import { TidyURL } from './src';
import { decodeBase64, guessEncoding } from './src/utils';

TidyURL.config.setMany({
    silent: false,
    allowAMP: false,
    allowCustomHandlers: true,
    allowRedirects: true
});

const tests = [
    // Delete test URLs before commit
    ''
];

for (const test of tests) {
    if (test.length === 0) continue;
    const link = TidyURL.clean(test);

    // All tests should pass before publishing
    if (link.info.reduction < 0) {
        console.log(link.url);
        throw Error('Reduction less than 0');
    }

    // If last link, log additional information that can be used for debugging
    if (test === tests[tests.length - 1]) {
        const params = new URL(link.url).searchParams;
        console.log(link);
        console.log('--- start:params ---');
        params.forEach((val, key) => {
            // This is just to save time when testing URLs
            const possible = guessEncoding(val);
            if (possible.base64) console.log(`'${key}' might be base64: ${decodeBase64(val)}`);
            if (possible.isJSON) console.log(`'${key}' might be JSON: ${JSON.stringify(val)}`);
            if (/script/i.test(val)) console.warn(`'${key}' Possible XSS`);
            console.log({ [key]: val });
        });
        console.log('--- end:params ---');
    }

    console.log(TidyURL.loglines);
    console.log('Input: ' + link.info.original);
    console.log('Clean: ' + link.url);
    console.log('New Host: ' + link.info.isNewHost);
    console.log(`${link.info.reduction}% smaller (${link.info.difference} characters)\n\n`);
}
