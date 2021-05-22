export interface IRule {
    // It's true
    name: string;
    match: RegExp;
    rules: string[];
    replace: string[] | RegExp[];
}
