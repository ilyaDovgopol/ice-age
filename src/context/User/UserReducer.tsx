import {
    UserActions,
    UserActionType,
    UserHandlersType,
    UserStateType,
    AddScorePointsPayload, IncreaseSpeedPayload
} from 'Types/UserTypes'

const handlers: UserHandlersType = {
    [UserActions.ADD_SCORE_POINTS]: (state: UserStateType, payload: AddScorePointsPayload): UserStateType => ({
        ...state,
        scorePoints: (state?.scorePoints || 0) + (payload?.pointsToAdd || 1)
    }),
    [UserActions.MINUS_LIFE]: (state: UserStateType): UserStateType => {
        const lifePoints = state?.healthPoints || 0

        return {
            ...state,
            healthPoints: lifePoints && lifePoints - 1
        }
    },
    [UserActions.ADD_LIFE]: (state: UserStateType): UserStateType => {
        const lifePoints = state?.healthPoints || 0

        return {
            ...state,
            healthPoints: lifePoints && lifePoints + 1
        }
    },
    [UserActions.INCREASE_STUFF_SPEED]: (state: UserStateType, payload: IncreaseSpeedPayload): UserStateType => {
        const DEFAULT_SPEED = 30
        const SPEED_LIMIT = 18

        if (state?.stuffSpeed === SPEED_LIMIT && payload?.interval) {
            window.clearInterval(payload.interval)
            return state
        }

        const stuffSpeed = (state?.stuffSpeed || DEFAULT_SPEED) - 1
        return {
            ...state,
            stuffSpeed,
        }
    },
    [UserActions.DEFAULT]: (state: UserStateType): UserStateType => state
}

const UserReducer = (state: UserStateType, action: UserActionType): UserStateType => {
    const handler = handlers[action.type]

    return handler(state, action.payload)
}

export default UserReducer
