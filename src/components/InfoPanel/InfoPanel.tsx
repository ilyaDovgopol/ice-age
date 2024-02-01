import React, {useContext} from 'react'
import UserContext from 'Context/User/UserContext'
import life from 'Images/life.png'

import styles from './InfoPanelStyles.module.scss'

const InfoPanel: React.FC = () => {
    const { userState } = useContext(UserContext)
    const healthPoints = userState?.healthPoints || 0

    return (
        <div className={styles.panel}>
            <p>Points: <span className="text-success font-weight-bold">{userState?.scorePoints}</span></p>
            <div>
                {new Array(healthPoints).fill(null).map((heart, index) => (
                    <img key={index} src={life} alt={'life'} />
                ))}
            </div>
        </div>
    )
}

export default InfoPanel
