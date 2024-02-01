export interface SquirrelContextType {
    squirrelState: SquirrelStateType,
    setSquirrelElement: (squirrelElement: HTMLImageElement | null) => void
    setSquirrelArmor: (armorBonus: SetSquirrelArmorPayload) => void
    setMegaSquirrel: (isMega: boolean) => void
    setSpeedBonus: () => void
}

export interface SquirrelStateType {
    squirrelElement?: HTMLImageElement | null
    armorBonus?: boolean
    isMega?: boolean
    speedBonus?: boolean
    speedBonusTimeout?: number
}

export enum SquirrelActions {
    SET_SQUIRREL_ELEMENT = 'SET_SQUIRREL_ELEMENT',
    SET_SQUIRREL_ARMOR = 'SET_SQUIRREL_ARMOR',
    SET_MEGA_SQUIRREL = 'SET_MEGA_SQUIRREL',
    SET_SPEED_BONUS = 'SET_SPEED_BONUS',
    DEFAULT = 'DEFAULT'
}

export type SetSquirrelElementPayload = HTMLImageElement | null
export type SetSquirrelArmorPayload = boolean
export type SetMegaSquirrelPayload = boolean
export type SetSpeedBonusPayload = { currentTimeout?: number, isActive: boolean }

export interface SquirrelActionType {
    type: SquirrelActions,
    payload?: SetSquirrelElementPayload | SetSquirrelArmorPayload | SetMegaSquirrelPayload | SetSpeedBonusPayload
}

// TODO: change "any" type to specify it
export interface SquirrelHandlersType {
    [SquirrelActions.DEFAULT]: (state: SquirrelStateType) => SquirrelStateType
    // eslint-disable-next-line
    [SquirrelActions.SET_SQUIRREL_ARMOR]: (state: SquirrelStateType, payload?: any) => SquirrelStateType
    // eslint-disable-next-line
    [SquirrelActions.SET_SQUIRREL_ELEMENT]: (state: SquirrelStateType, payload?: any) => SquirrelStateType
    // eslint-disable-next-line
    [SquirrelActions.SET_MEGA_SQUIRREL]: (state: SquirrelStateType, payload?: any) => SquirrelStateType
    // eslint-disable-next-line
    [SquirrelActions.SET_SPEED_BONUS]: (state: SquirrelStateType, payload?: any) => SquirrelStateType
}
