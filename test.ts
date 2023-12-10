import { TidyURL } from './src';

TidyURL.silent = false;

const tests = [
    // Delete test URLs before commit
    ''
];

for (const test of tests) {
    if (test.length === 0) continue;
    const link = TidyURL.clean(test);

    // New options added in 1.2.8
    TidyURL.allow_amp = false;
    TidyURL.allow_redirects = true;

    // All tests should pass before publishing
    if (link.info.reduction < 0) {
        console.log(link.url);
        throw Error('Reduction less than 0');
    }

    // If last link, log additional information that can be used for debugging
    if (test === tests[tests.length - 1]) {
        const params = new URL(link.url).searchParams;
        console.log(link);
        params.forEach((val, key) => console.log({ [key]: val }));
    }

    console.log('Input: ' + link.info.original);
    console.log('Clean: ' + link.url);
    console.log('New Host: ' + link.info.is_new_host);
    console.log(`${link.info.reduction}% smaller (${link.info.difference} characters)\n\n`);
}
