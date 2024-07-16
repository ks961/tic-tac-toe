export const enum EPLAY_ITEM {
    EMPTY = "empty",
    CHECK = "check",
    CIRCLE = "circle"
};

export type PoolId = string;
export type PlayerId = string;
export type GameSessionId = string;

export const enum EGAME_STATE {
    END,
    START,
    PAUSED,
    PLAYING,
};

export const enum EGAME_RESULT {
    WON = "won",
    NONE = "none",
    DRAW = "draw",
}

export type GameSession = {
    boardSize: number,
    playerTurn: PlayerId,
    gameResult: EGAME_RESULT,
}

export type BoardCoords = {
    x: number,
    y: number
}

export type BoardUpdate = {
    playerTurn: PlayerId,
    playItem: EPLAY_ITEM,
    coords: BoardCoords,
}

export type PlayerInGameSession = {
    username: string,
    playerId: PlayerId,
}

export type GameSessionInfo = GameSession & {
    player: PlayerInGameSession,
}

export type PlayerWon = {
    playerId: PlayerId,
}