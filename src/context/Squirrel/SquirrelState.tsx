import React, {useReducer} from 'react'
import SquirrelContext from 'Context/Squirrel/SquirrelContext'
import SquirrelReducer from 'Context/Squirrel/SquirrelReducer'
import {SetSquirrelArmorPayload, SquirrelActions} from 'Types/SquirrelTypes'

const SquirrelState: React.FC = ({children}) => {
    const [squirrelState, dispatch] = useReducer(SquirrelReducer, {})

    const setSquirrelElement = (squirrelElement: HTMLImageElement|null) => dispatch({
        type: SquirrelActions.SET_SQUIRREL_ELEMENT,
        payload: squirrelElement
    })

    const setSquirrelArmor = (armorBonus: SetSquirrelArmorPayload) => dispatch({
        type: SquirrelActions.SET_SQUIRREL_ARMOR,
        payload: armorBonus
    })

    const setMegaSquirrel = (isMega: boolean) => dispatch({
        type: SquirrelActions.SET_MEGA_SQUIRREL,
        payload: isMega
    })

    const setSpeedBonus = () => {
        const timeout = window.setTimeout(() => dispatch({
            type: SquirrelActions.SET_SPEED_BONUS,
            payload: {
                isActive: false,
            }
        }), 5000)

        dispatch({
            type: SquirrelActions.SET_SPEED_BONUS,
            payload: {
                isActive: true,
                currentTimeout: timeout
            }
        })
    }

    return (
        <SquirrelContext.Provider value={{
            squirrelState,
            setSquirrelElement,
            setSquirrelArmor,
            setMegaSquirrel,
            setSpeedBonus,
        }}>
            {children}
        </SquirrelContext.Provider>
    )
}

export default SquirrelState
