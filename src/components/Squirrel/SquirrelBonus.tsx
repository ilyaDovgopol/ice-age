import React, {useContext, useEffect} from 'react'
import MouseContext from 'Context/Mouse/MouseContext'
import SquirrelContext from 'Context/Squirrel/SquirrelContext'
import heroArmor from 'Images/hero-armor.png'

import styles from './SquirrelStyles.module.scss'

const SquirrelBonus: React.FC = () => {
    const { mouseState } = useContext(MouseContext)
    const { squirrelState, setSquirrelArmor } = useContext(SquirrelContext)

    useEffect(() => {
        let armorBonusTimeout: number

        if (squirrelState?.armorBonus && setSquirrelArmor) {
            // duration is in ms
            const ARMOR_BONUS_DURATION = 10000
            armorBonusTimeout = window.setTimeout(() => {
                setSquirrelArmor(false)
            }, ARMOR_BONUS_DURATION)
        }

        return () => {
           clearTimeout(armorBonusTimeout)
        }
    }, [squirrelState?.armorBonus, setSquirrelArmor])

    return (
        <>
            {squirrelState?.armorBonus && <img
                src={heroArmor}
                className={styles.squirrel}
                style={{ left: (mouseState?.horizontalPosition || 0) - (squirrelState.isMega ? -5 : 55), bottom: squirrelState.isMega ? 100 : 60 }}
                alt={'Hero'}
            />}
        </>
    )
}

export default SquirrelBonus
