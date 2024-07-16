import { EPLAY_ITEM } from "./App.types";

export type OnlyAllowedTag<F, T> = T extends F ? T : never;

export function generateBoardNxN(n: number) {
    return new Array(n).fill(0).map(_ => new Array<EPLAY_ITEM>(n).fill(EPLAY_ITEM.EMPTY));
}

export type CommonClass = {
    [key: string]: string,
}

const commonClass: CommonClass = {
    'size': 'w, h'
};

const commonClassKeys = Object.keys(commonClass);

export function resolveTwConflicts(classA?: string, classB?: string) {

    if(!classB || classB.length === 0) return classA ?? "";
    else if(!classA || classA.length === 0) return classB ?? "";

    const classANames = classA.split(" ").map(className => className.split("-"));    

    const classBNamesPrefixes = classB.split(" ").flatMap(className => {
        const classPrefix = className.split("-")[0];
        if(commonClassKeys.includes(classPrefix)) {
            const equivalentPrefixes = commonClass[classPrefix];
            const prefixes = equivalentPrefixes.split(",");            
            return prefixes.map(prefix => prefix.trim());
        } 
        return classPrefix;
    });
    
    const filteredClasses = classANames
        .map((className: string[]) => classBNamesPrefixes.includes(className[0]) ? "" : className.join("-"));
    
    return (`${filteredClasses.join(" ")} ${classB}`).trim();
}

export function isInvalid<T>(value: T): boolean {
    return (
        value === undefined ||
        value === null ||
        (typeof value === 'number' && isNaN(value)) ||
        (typeof value === 'string' && value.trim() === '') ||
        (Array.isArray(value) && value.length === 0) );
}

type JSON_TYPE<V> = { [key: string]: V };

export function isObjectInvalid<V, T extends JSON_TYPE<V>>(object: T):  { isInvalid: boolean, key?: string } {
    const keys = Object.keys(object);

    for(const key of keys) {
        if(isInvalid(object[key])) {
            return { isInvalid: true, key};
        }
    }
    
    return { isInvalid: false };
}

export function capitalCase(value: string) {
    const chr = value.charAt(0).toUpperCase();

    return `${chr}${value.substring(1)}`;
}

export function checkRegex(pattern: string | RegExp, inputString: string) {
    let regex = new RegExp(pattern);
    
    return regex.test(inputString);
}

export function validateEmail(value: string): (string | boolean) {
    const isOK = checkRegex("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", value);
    
    return isOK || "Email  is not acceptable";
}

export function validatePassword(value: string): (string | boolean) {
    const isOK = checkRegex("^(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W_]).{9,}$", value);
    
    return isOK || "Use mix of uppercase | lowercase | special characters | should be > 8";
}

export function validateConfirmPassword(value1: string, value2: string): (string | boolean) {
    const isOK = (value1 === value2);
    
    return isOK || "Password and Confirm Password doesn't match.";
}

export function validateUsername(value: string) {
    const isOK = checkRegex("^[a-z][0-9a-z]{3,11}$", value);
    
    return isOK || "Username should be all lowercase and b/w 4 to 12 characters";
}
export type ValidatorFunc = (value: string) => (string | boolean);
export type Validator = {
    [key: string]: ValidatorFunc;
}

export const validator: Validator = {
    'email': validateEmail,
    'password': validatePassword,
    'username': validateUsername,
}

export function validateForm<T extends Record<string, any>>(formState: T): string {
    return Object.keys(formState).map((key: string) => {
        if(key === "confirmPassword")
            return validateConfirmPassword(formState["password"], formState["confirmPassword"]);
        
        const vFunc = validator[key];
        if(typeof vFunc  !== "function") return false;

        
        return vFunc(formState[key]);
    }).filter(msg => typeof msg === "string")[0];
}

export const fromHourToMillisec = (hours: number) => hours * 3600 * 1000;

export function setCookie(cookie: string) {
    document.cookie = cookie;
}

export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  