import { IConfig } from './interface';
export declare class TidyConfig implements IConfig {
    allowAMP: boolean;
    allowCustomHandlers: boolean;
    allowRedirects: boolean;
    silent: boolean;
    /**
     * Fetch a copy of the current config.
     * You can then pass this to `setMany` if
     * you want to sync with another TidyConfig instance.
     *
     * @returns A copy of the current config
     */
    copy(): {
        allowAMP: boolean;
        allowCustomHandlers: boolean;
        allowRedirects: boolean;
        silent: boolean;
    };
    /**
     * You can just use `config.key` but yeah.
     * @param key The key you're wanting to get the value of
     * @returns The value
     */
    get(key: keyof IConfig): boolean;
    /**
     * Set a single config option. If you want to set multiple at once
     * use `setMany`
     * @param key Option to set
     * @param value Value to set it to
     */
    set(key: keyof IConfig, value: boolean): void;
    /**
     * Set multiple config options at once by passing it an object.
     * @param obj An object containing any number of config options
     */
    setMany(obj: Partial<IConfig>): void;
}
