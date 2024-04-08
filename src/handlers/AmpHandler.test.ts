// AmpHandler.test.ts
import { AmpHandler } from './AmpHandler';
import { IData, IRule } from '../interfaces';

describe('AmpHandler', () => {
    let ampHandler: AmpHandler;
    let mockRules: IRule[];
    let mockReapplyClean: (url: string, allowReclean: boolean) => string;

    beforeEach(() => {
        // Initialize with some hypothetical rules
        mockRules = [
            {
                name: 'Remove AMP Query',
                match: /^https:\/\/example\.com/,
                match_href: false,
                rules: [],
                replace: [],
                redirect: '',
                amp: {
                    regex: /\/amp$/,
                    replace: { text: '/amp', with: '' },
                    sliceTrailing: '/amp'
                },
                decode: {},
                rev: false
            }
        ];

        // Mock reapplyClean function
        mockReapplyClean = jest.fn().mockImplementation((url: string, allowReclean: boolean) => url);

        // Initialize AmpHandler with mock rules and the mock reapplyClean function
        ampHandler = new AmpHandler(mockRules, mockReapplyClean);
    });

    it('removes /amp from URLs', () => {
        const data: IData = {
            url: 'https://example.com/path/amp',
            info: {
                original: 'https://example.com/path/amp',
                reduction: 0,
                difference: 0,
                replace: [],
                removed: [],
                handler: null,
                match: [
                    {
                        replace: [],
                        exclude: [],
                        redirect: '',
                        amp: null,
                        decode: null,
                        name: 'Global',
                        match: {}
                    },
                    {
                        rules: [],
                        replace: [],
                        exclude: [],
                        redirect: 'url',
                        amp: {
                            regex: {}
                        },
                        decode: null,
                        name: 'google.com',
                        match: {}
                    }
                ],
                decoded: null,
                is_new_host: false,
                isNewHost: false,
                full_clean: false,
                fullClean: false
            }
        };

        const expectedUrl = 'https://example.com/path';
        const result = ampHandler.handle(data);
        expect(result.url).toBe(expectedUrl);
    });

    // Test to ensure that URLs without '/amp' are unaffected
    it('does not alter non-AMP URLs', () => {
        const data: IData = {
            url: 'https://example.com/path',
            info: {
                original: 'https://example.com/path',
                reduction: 0,
                difference: 0,
                replace: [],
                removed: [],
                handler: null,
                match: [],
                decoded: null,
                is_new_host: false,
                isNewHost: false,
                full_clean: false,
                fullClean: false
            }
        };

        const result = ampHandler.handle(data);
        expect(result.url).toBe('https://example.com/path');
    });
});
