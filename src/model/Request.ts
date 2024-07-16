
export type errorString = string;

export type ServerResponse<T> = {
    status: number,
    payload: T,
}

export type PlayerInfoDTO = {
    username: string,
    playerId: string,
};

export type LoginSuccessPayload = {
    playerInfo: PlayerInfoDTO,
    token: string,
}
