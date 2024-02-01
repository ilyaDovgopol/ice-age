import React, {useContext} from 'react'
import UserContext from 'Context/User/UserContext'

import styles from './GameOverStyles.module.scss'

const GameOver: React.FC = () => {
    const { userState } = useContext(UserContext)

    const getNewScore = () => {
        const score = JSON.parse(localStorage.getItem('score') || '0')
        if ((userState?.scorePoints || 0) > score) {
            localStorage.setItem('score', JSON.stringify(userState?.scorePoints))
            return userState?.scorePoints
        }
        return score
    }

    const reloadGameClick = () => window.location.reload()

    return (
        <div className={styles.gameOver}>
            <div className={styles.info}>
                <p className="text-danger">GAME OVER</p>
                <p>Points: <span className="text-warning font-weight-bold">{userState?.scorePoints}</span></p>
                <p className={styles.score}>Score: <span className="text-warning font-weight-bold">{getNewScore()}</span></p>
                <div className={styles.reloadGame} onClick={reloadGameClick}>Reload game</div>
            </div>
        </div>
    )
}

export default GameOver
