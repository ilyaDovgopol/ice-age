import React from 'react'
import { Switch, Redirect } from 'react-router-dom'
import GameContainer from 'Containers/GameContainer/GameContainer'
import MouseState from 'Context/Mouse/MouseState'
import SquirrelState from 'Context/Squirrel/SquirrelState'
import UserState from 'Context/User/UserState'

function App() {
  return (
    <>
        <UserState>
            <MouseState>
                <SquirrelState>
                    <GameContainer />
                    <Switch>
                        <Redirect to="/game" />
                    </Switch>
                </SquirrelState>
            </MouseState>
        </UserState>
    </>
  )
}

export default App
