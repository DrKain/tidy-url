import { RedirectHandler } from './RedirectHandler';
import { IData, IRule, EEncoding } from '../interfaces';
import { decodeURL, validateURL } from '../utils';
import { TidyConfig } from '../config/TidyConfig';

jest.mock('../utils', () => ({
  decodeURL: jest.fn(),
  validateURL: jest.fn(),
}));

describe('RedirectHandler', () => {
  let config: TidyConfig;
  let handler: RedirectHandler;
  let data: IData;

  beforeEach(() => {
    config = new TidyConfig();
    config.allowRedirects = true;
    handler = new RedirectHandler(config);

    data = {
      "url": "https://steamcommunity.com/linkfilter/?url=https://github.com",
      "info": {
          "original": "https://steamcommunity.com/linkfilter/?url=https://github.com",
          "reduction": 0,
          "difference": 0,
          "replace": [],
          "removed": [],
          "handler": null,
          "match": [
              {
                  "rules": [
                      "utm_source",
                      "utm_medium",
                      "utm_term",
                      "utm_campaign",
                      "utm_content",
                      "utm_name",
                      "utm_cid",
                      "utm_reader",
                      "utm_viz_id",
                      "utm_pubreferrer",
                      "utm_swu",
                      "utm_social-type",
                      "utm_brand",
                      "utm_team",
                      "utm_feeditemid",
                      "utm_id",
                      "utm_marketing_tactic",
                      "utm_creative_format",
                      "utm_campaign_id",
                      "utm_source_platform",
                      "utm_timestamp",
                      "utm_souce",
                      "itm_source",
                      "itm_medium",
                      "itm_term",
                      "itm_campaign",
                      "itm_content",
                      "itm_channel",
                      "itm_source_s",
                      "itm_medium_s",
                      "itm_campaign_s",
                      "itm_audience",
                      "int_source",
                      "int_cmp_name",
                      "int_cmp_id",
                      "int_cmp_creative",
                      "int_medium",
                      "int_campaign",
                      "pk_campaign",
                      "pk_cpn",
                      "pk_source",
                      "pk_medium",
                      "pk_keyword",
                      "pk_kwd",
                      "pk_content",
                      "pk_cid",
                      "piwik_campaign",
                      "piwik_cpn",
                      "piwik_source",
                      "piwik_medium",
                      "piwik_keyword",
                      "piwik_kwd",
                      "piwik_content",
                      "piwik_cid",
                      "gclid",
                      "ga_source",
                      "ga_medium",
                      "ga_term",
                      "ga_content",
                      "ga_campaign",
                      "ga_place",
                      "gclid",
                      "gclsrc",
                      "hsa_cam",
                      "hsa_grp",
                      "hsa_mt",
                      "hsa_src",
                      "hsa_ad",
                      "hsa_acc",
                      "hsa_net",
                      "hsa_kw",
                      "hsa_tgt",
                      "hsa_ver",
                      "hsa_la",
                      "hsa_ol",
                      "fbclid",
                      "oly_enc_id",
                      "oly_anon_id",
                      "vero_id",
                      "vero_conv",
                      "__s",
                      "_hsenc",
                      "_hsmi",
                      "__hssc",
                      "__hstc",
                      "__hsfp",
                      "hsCtaTracking",
                      "mkt_tok",
                      "mtm_campaign",
                      "mtm_keyword",
                      "mtm_kwd",
                      "mtm_source",
                      "mtm_medium",
                      "mtm_content",
                      "mtm_cid",
                      "mtm_group",
                      "mtm_placement",
                      "elqTrackId",
                      "elq",
                      "elqaid",
                      "elqat",
                      "elqCampaignId",
                      "elqTrack",
                      "mc_cid",
                      "mc_eid",
                      "ncid",
                      "cmpid",
                      "mbid",
                      "rdt_cid"
                  ],
                  "replace": [],
                  "exclude": [],
                  "redirect": "",
                  "amp": null,
                  "decode": null,
                  "name": "Global",
                  "match": /steamcommunity.com/i
              },
              {
                  "rules": [],
                  "replace": [],
                  "exclude": [],
                  "redirect": "url",
                  "amp": null,
                  "decode": null,
                  "name": "steamcommunity.com",
                  "match": /steamcommunity.com/i
              },
              {
                  "rules": [],
                  "replace": [],
                  "exclude": [],
                  "redirect": "u",
                  "amp": null,
                  "decode": null,
                  "name": "steamcommunity.com/linkfilter",
                  "match": /steamcommunity.com/i,
                  "match_href": true
              }
          ],
          "decoded": null,
          "is_new_host": false,
          "isNewHost": false,
          "full_clean": false,
          "fullClean": false
      }
  };
  
    (decodeURL as jest.Mock).mockImplementation((url: string) => url);
    (validateURL as jest.Mock).mockImplementation(() => true);
  });

  it('should return unchanged data if redirects are not allowed', () => {
    config.allowRedirects = false;
    const result = handler.handle(data);
    expect(result.url).toBe('https://steamcommunity.com/linkfilter/?url=https://github.com');
  });

  it('should apply the first matching redirect rule', () => {
    const result = handler.handle(data);
    expect(result.url).toBe('https://github.com');
  });

  it('should not redirect if no match is found', () => {
    data.url = 'http://unmatched.com';
    const result = handler.handle(data);
    expect(result.url).toBe('http://unmatched.com');
  });

  it('should skip redirection if the target parameter is missing', () => {
    data.url = 'http://example.com';
    const result = handler.handle(data);
    expect(result.url).toBe('http://example.com');
  });

  it('should not redirect if the target URL is invalid', () => {
    (validateURL as jest.Mock).mockImplementation(() => false);
    const result = handler.handle(data);
    expect(result.url).toBe('https://steamcommunity.com/linkfilter/?url=https://github.com');
  });
});

