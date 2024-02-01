import React, {useReducer} from 'react'
import UserContext from 'Context/User/UserContext'
import UserReducer from 'Context/User/UserReducer'
import {UserActions} from 'Types/UserTypes'

const UserState: React.FC = ({ children }) => {
    const initialUser = {
        scorePoints: 0,
        healthPoints: 5
    }

    const [userState, dispatch] = useReducer(UserReducer, initialUser)

    const addUserScorePoints = (pointsToAdd = 1) => dispatch({ type: UserActions.ADD_SCORE_POINTS, payload: {pointsToAdd} })
    const minusLife = () => dispatch({ type: UserActions.MINUS_LIFE })
    const addLife = () => dispatch({ type: UserActions.ADD_LIFE })

    const increaseStuffSpeed = () => {
        const interval = setInterval(() => {
            dispatch({ type: UserActions.INCREASE_STUFF_SPEED, payload: {interval} })
        }, 5000)
    }

    return (
        <UserContext.Provider value={{
            userState,
            addUserScorePoints,
            minusLife,
            increaseStuffSpeed,
            addLife,
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserState
