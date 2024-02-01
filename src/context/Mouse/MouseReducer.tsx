import {MouseActions, MouseActionType, MouseHandlersType, MouseStateType} from 'Types/MouseTypes'

const handlers: MouseHandlersType = {
    [MouseActions.CHANGE_HORIZONTAL_POSITION]: (state: MouseStateType, { payload }: MouseActionType) => ({ ...state, horizontalPosition: payload }),
    DEFAULT: (state: MouseStateType) => state
}

const MouseReducer = (state: MouseStateType, action: MouseActionType): MouseStateType => {
    const handler = handlers[action.type] || handlers.DEFAULT

    return handler(state, action)
}

export default MouseReducer