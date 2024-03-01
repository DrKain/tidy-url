import { IConfig } from './interface';

export class TidyConfig implements IConfig {
    public allowAMP: boolean = false;
    public allowCustomHandlers: boolean = true;
    public allowRedirects: boolean = true;
    public silent: boolean = true;

    /**
     * Fetch a copy of the current config.
     * You can then pass this to `setMany` if
     * you want to sync with another TidyConfig instance.
     *
     * @returns A copy of the current config
     */
    public copy() {
        return {
            allowAMP: this.allowAMP,
            allowCustomHandlers: this.allowCustomHandlers,
            allowRedirects: this.allowRedirects,
            silent: this.silent
        };
    }

    /**
     * You can just use `config.key` but yeah.
     * @param key The key you're wanting to get the value of
     * @returns The value
     */
    public get(key: keyof IConfig) {
        return this[key];
    }

    /**
     * Set a single config option. If you want to set multiple at once
     * use `setMany`
     * @param key Option to set
     * @param value Value to set it to
     */
    public set(key: keyof IConfig, value: boolean) {
        this[key] = value;
    }

    /**
     * Set multiple config options at once by passing it an object.
     * @param obj An object containing any number of config options
     */
    public setMany(obj: Partial<IConfig>) {
        Object.keys(obj).forEach((_key) => {
            const key: keyof IConfig = _key as any;
            const val: boolean = obj[key] ?? this[key];

            if (typeof this[key] === 'undefined') {
                throw new Error(`Config error: ${key} is a valid config key`);
            }

            this.set(key, val);
        });
    }
}
