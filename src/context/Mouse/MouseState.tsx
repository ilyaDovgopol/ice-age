import React, {useReducer} from 'react'
import MouseContext from 'Context/Mouse/MouseContext'
import MouseReducer from 'Context/Mouse/MouseReducer'

import {MouseActions} from 'Types/MouseTypes'

const MouseState: React.FC = ({ children }) => {
    const [mouseState, dispatch] = useReducer(MouseReducer, {})

    const changeHorizontalPosition = (horizontalPosition: number) => dispatch({
        type: MouseActions.CHANGE_HORIZONTAL_POSITION,
        payload: horizontalPosition
    })

    return (
        <MouseContext.Provider value={{
            mouseState,
            changeHorizontalPosition
        }}>
            {children}
        </MouseContext.Provider>
    )
}

export default MouseState
