import { PlayItem } from "./App.types";

export function generateBoardNxN(n: number) {
    return new Array(n).fill(0).map(_ => new Array<PlayItem>(n).fill(PlayItem.EMPTY));
}

export function resolveConflicts(classA?: string, classB?: string) {
    if(!classB || classB.length === 0) return classA ?? "";
    else if(!classA || classA.length === 0) return classB ?? "";

    const classANames = classA.split(" ").map(className => className.split("-"));    
    const classBNamesPrefixes = classB.split(" ").map(className => className.split("-")[0])
    
    const filteredClasses = classANames
        .map((className: string[]) => classBNamesPrefixes.includes(className[0]) ? "" : className.join("-"));

    return `${filteredClasses.join(" ")} ${classB}`;
}