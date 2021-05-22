export interface IRule {
    name: string;
    match: RegExp;
    rules: string[];
    replace: string[] | RegExp[];
}
