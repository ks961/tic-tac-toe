import { PlayItem } from "./App.types";

export function generateBoardNxN(n: number) {
    return new Array(n).fill(0).map(_ => new Array<PlayItem>(n).fill(PlayItem.EMPTY));
}