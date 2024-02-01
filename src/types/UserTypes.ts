export interface UserContextType {
    userState: UserStateType,
    addUserScorePoints: (pointsToAdd?: number) => void,
    minusLife: () => void
    addLife: () => void
    increaseStuffSpeed: () => void
}

export interface UserStateType {
    scorePoints?: number,
    healthPoints?: number
    stuffSpeed?: number
}

export enum UserActions {
    ADD_SCORE_POINTS = 'ADD_SCORE_POINTS',
    MINUS_LIFE = 'MINUS_LIFE',
    ADD_LIFE = 'ADD_LIFE',
    INCREASE_STUFF_SPEED = 'INCREASE_SPEED',
    DEFAULT = 'DEFAULT'
}

export interface IncreaseSpeedPayload {
    interval: NodeJS.Timeout
}
export interface AddScorePointsPayload {
    pointsToAdd: number
}

export type UserActionPayload = IncreaseSpeedPayload | AddScorePointsPayload

export interface UserActionType {
    type: UserActions
    payload?: UserActionPayload
}

// TODO: change "any" type to specify it
export interface UserHandlersType {
    [UserActions.MINUS_LIFE]: (state: UserStateType) => UserStateType
    [UserActions.ADD_LIFE]: (state: UserStateType) => UserStateType
    [UserActions.DEFAULT]: (state: UserStateType) => UserStateType
    // eslint-disable-next-line
    [UserActions.ADD_SCORE_POINTS]: (state: UserStateType, payload: any) => UserStateType
    // eslint-disable-next-line
    [UserActions.INCREASE_STUFF_SPEED]: (state: UserStateType, payload: any) => UserStateType
}
