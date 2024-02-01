import React, {useContext} from 'react'
import Squirrel from 'Components/Squirrel/Squirrel'
import SquirrelBonus from 'Components/Squirrel/SquirrelBonus'
import MouseContext from 'Context/Mouse/MouseContext'
import StuffsRandomizerContainer from 'Containers/StuffsRandomizerContainer'
import SquirrelContext from 'Context/Squirrel/SquirrelContext'
import InfoPanel from 'Components/InfoPanel/InfoPanel'
import GameOver from 'Containers/GameOver/GameOver'
import UserContext from 'Context/User/UserContext'

import styles from './GameContainerStyles.module.scss'

const GameContainer: React.FC = () => {
    const { changeHorizontalPosition } = useContext(MouseContext)
    const { squirrelState } = useContext(SquirrelContext)
    const { userState } = useContext(UserContext)

    const onMouseMovePage = ({ pageX }: React.MouseEvent) => {
        const maxPosition: number = document.body.offsetWidth - (squirrelState?.squirrelElement?.offsetWidth || 0)
        const isMaxPosition: boolean = pageX > maxPosition

        if (isMaxPosition) {
            changeHorizontalPosition && changeHorizontalPosition(maxPosition)
        } else {
            changeHorizontalPosition && changeHorizontalPosition(pageX)
        }

    }
    const onMouseTouchPage = ({ targetTouches }: React.TouchEvent) => changeHorizontalPosition
        && changeHorizontalPosition(targetTouches.item(0).pageX)

    return (
        <>
            {userState?.healthPoints
                ? <div
                    onMouseMove={onMouseMovePage}
                    onTouchMove={onMouseTouchPage}
                    onContextMenu={e => e.preventDefault()}
                    className={styles.mainGamePage}
                >
                    <StuffsRandomizerContainer />
                    <Squirrel />
                    <SquirrelBonus />
                    <InfoPanel />
                    <div className={styles.cover}/>
                    <audio className={styles.backgroundMusic} src='./background-music.mp3' autoPlay loop/>
                </div>
                : <GameOver />
            }
        </>
    )
}

export default GameContainer
