import { IHandler } from './interface';
import { decodeBase64, regexExtract } from './utils';

/**
 * This is currently experimental while I decide on how I want to restructure the main code to make it easier to follow.
 * There will need to be handlers for each process of the "clean" as well as these custom cases for sites that mix it up.
 * If you would like to help or give your thoughts feel free to open an issue on GitHub.
 */
export const handlers: { [key: string]: IHandler } = {};

handlers['patchbot.io'] = {
    exec: (_str, args) => {
        try {
            const dec = args.decoded.replace(/%3D/g, '=');
            return { url: decodeURIComponent(dec.split('|')[2]) };
        } catch (error) {
            if (`${error}`.startsWith('URIError')) error = new Error('Unable to decode URI component. The URL may be invalid');
            return { url: args.originalURL, error };
        }
    }
};

handlers['urldefense.proofpoint.com'] = {
    exec: (_str, args) => {
        try {
            const arg = args.urlParams.get('u');

            if (arg === null) throw new Error('Target parameter (u) was null');
            const url = decodeURIComponent(arg.replace(/-/g, '%')).replace(/_/g, '/').replace(/%2F/g, '/');

            return { url };
        } catch (error) {
            return { url: args.originalURL, error };
        }
    }
};

handlers['stardockentertainment.info'] = {
    exec: (str, args) => {
        try {
            const target = str.split('/').pop();
            let url = '';

            if (typeof target == 'undefined') throw new Error('Undefined target');
            url = decodeBase64(target);

            return { url: url };
        } catch (error) {
            return { url: args.originalURL, error };
        }
    }
};

handlers['0yxjo.mjt.lu'] = {
    exec: (str, args) => {
        try {
            const target = str.split('/').pop();
            let url = '';

            if (typeof target == 'undefined') throw new Error('Undefined target');
            url = decodeBase64(target);

            return { url: url };
        } catch (error) {
            return { url: args.originalURL, error };
        }
    }
};

handlers['click.redditmail.com'] = {
    exec: (str, args) => {
        try {
            const reg = /https:\/\/click\.redditmail\.com\/CL0\/(.*?)\//gi;
            const matches = regexExtract(reg, str);

            if (typeof matches[1] === 'undefined') throw new Error('regexExtract failed to find a URL');
            const url = decodeURIComponent(matches[1]);

            return { url: url };
        } catch (error) {
            return { url: args.originalURL, error };
        }
    }
};

handlers['deals.dominos.co.nz'] = {
    exec: (str, args) => {
        try {
            const target = str.split('/').pop();
            let url = '';

            if (!target) throw new Error('Missing target');
            url = decodeBase64(target);

            return { url };
        } catch (error) {
            return { url: args.originalURL, error };
        }
    }
};
