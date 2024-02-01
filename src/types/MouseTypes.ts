export enum MouseActions {
    CHANGE_HORIZONTAL_POSITION = 'CHANGE_HORIZONTAL_POSITION',
    DEFAULT = 'DEFAULT'
}

export interface MouseStateType {
    horizontalPosition?: number
}

export interface MouseActionType {
    type: MouseActions,
    payload: number
}

export interface MouseContextType {
    mouseState: MouseStateType,
    changeHorizontalPosition: (horizontalPosition: number) => void
}

export interface MouseHandlersType {
    [MouseActions.CHANGE_HORIZONTAL_POSITION]: (state: MouseStateType, action: MouseActionType) => MouseStateType,
    [MouseActions.DEFAULT]: (state: MouseStateType, action: MouseActionType) => MouseStateType
}
