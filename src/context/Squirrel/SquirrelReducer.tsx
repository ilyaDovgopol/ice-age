import {
    SetSquirrelArmorPayload,
    SetMegaSquirrelPayload,
    SetSquirrelElementPayload,
    SquirrelActions,
    SquirrelActionType,
    SquirrelHandlersType,
    SquirrelStateType,
    SetSpeedBonusPayload
} from 'Types/SquirrelTypes'

const handlers: SquirrelHandlersType = {
    [SquirrelActions.SET_SQUIRREL_ELEMENT]: (state: SquirrelStateType, payload: SetSquirrelElementPayload) => ({ ...state, squirrelElement: payload }),
    [SquirrelActions.SET_SQUIRREL_ARMOR]: (state: SquirrelStateType, armorBonus: SetSquirrelArmorPayload) => ({ ...state, armorBonus }),
    [SquirrelActions.SET_MEGA_SQUIRREL]: (state: SquirrelStateType, isMega: SetMegaSquirrelPayload) => ({ ...state, isMega }),
    [SquirrelActions.SET_SPEED_BONUS]: (state: SquirrelStateType, payload: SetSpeedBonusPayload) => {
        if (payload.currentTimeout && state.speedBonusTimeout && payload.isActive) {
            window.clearTimeout(state.speedBonusTimeout)
        }

        return { ...state, speedBonus: payload.isActive, speedBonusTimeout: payload.currentTimeout }
    },
    [SquirrelActions.DEFAULT]: (state: SquirrelStateType) => state
}

const SquirrelReducer = (state: SquirrelStateType, action: SquirrelActionType): SquirrelStateType => {
    const handler = handlers[action.type] || handlers[SquirrelActions.DEFAULT]

    return handler(state, action.payload)
}

export default SquirrelReducer
