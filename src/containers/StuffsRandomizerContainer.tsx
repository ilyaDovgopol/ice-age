import React, {ReactElement, useContext, useEffect, useRef, useState} from 'react'
import Stuff from 'Components/Stuff/Stuff'
import badFish from 'Images/badfish.png'
import nut from 'Images/nut.png'
import nutX10 from 'Images/nut_x_10.png'
import bigLife from 'Images/big-life.png'
import armor from 'Images/armor.png'
import burger from 'Images/burger.png'
import speed from 'Images/speed.png'
import {getRandomNumber} from 'Utils/utils'
import UserContext from 'Context/User/UserContext'
import LostLifeAlert from 'Components/LostLifeAlert/LostLifeAlert'
import AddLifeAlert from 'Components/AddLifeAlert/AddLifeAlert'
import SquirrelContext from 'Context/Squirrel/SquirrelContext'

const StuffsRandomizerContainer: React.FC = () => {
    const { addUserScorePoints, minusLife, addLife, increaseStuffSpeed } = useContext(UserContext)
    const { squirrelState, setSquirrelArmor, setMegaSquirrel, setSpeedBonus } = useContext(SquirrelContext)
    const [stuffs, setStuffs] = useState<Array<React.ReactElement>>([])
    const [lifeAlerts, setLifeAlerts] = useState<Array<ReactElement>>([])
    const [badFishCaught, setBadFishCaught] = useState(false)

    const onCatchLifeHandler = () => {
        const animationTime = 1500
        addLife && addLife()
        setLifeAlerts(alerts => [ ...alerts, <AddLifeAlert key={alerts.length} /> ])
        const timer = setTimeout(() => {
            setLifeAlerts(alerts => alerts.slice(0, -1))
            clearTimeout(timer)
        }, animationTime)
    }

    // uniqueRate: 1 - not unique, 0.1 - very unique
    const STUFFS_CONFIG = useRef({
        STUFFS: [
            {
                uniqueRate: 0.7,
                src: badFish,
                handler: () => setBadFishCaught(true),
            },
            {
                uniqueRate: 1,
                src: nut,
                handler: () => addUserScorePoints && addUserScorePoints()
            },
            {
                uniqueRate: 0.1,
                src: nutX10,
                handler: () => addUserScorePoints && addUserScorePoints(10)
            },
            {
                uniqueRate: 0.05,
                src: bigLife,
                handler: onCatchLifeHandler
            },
            {
                uniqueRate: 0.05,
                src: armor,
                handler: () => setSquirrelArmor && setSquirrelArmor(true),
            },
            {
                uniqueRate: 0.05,
                src: burger,
                handler: () => setMegaSquirrel && setMegaSquirrel(true),
            },
            {
                uniqueRate: 0.05,
                src: speed,
                handler: () => setSpeedBonus && setSpeedBonus(),
            },
        ],
        STUFFS_QUANTITY_LEFT: 6
    })

    const pushStuff = () => {
        const MAX_SPEED_MS = 500
        const SPEED = getRandomNumber(MAX_SPEED_MS)

        const timeout = setTimeout(() => {
            STUFFS_CONFIG.current.STUFFS_QUANTITY_LEFT--
            setStuffs(stuffs => [ ...stuffs, <Stuff key={stuffs.length} stuffs={STUFFS_CONFIG.current.STUFFS} /> ])

            if (STUFFS_CONFIG.current.STUFFS_QUANTITY_LEFT) {
                pushStuff()
            }

            clearTimeout(timeout)
        }, SPEED)
    }

    useEffect(() => {
        let badFishCaughtTimeout: number

        if (badFishCaught && !squirrelState?.armorBonus && minusLife) {
            const animationTime = 1500
            minusLife()
            setBadFishCaught(false)
            setLifeAlerts(alerts => [ ...alerts, <LostLifeAlert key={alerts.length} /> ])
            badFishCaughtTimeout = window.setTimeout(() => {
                setLifeAlerts(alerts => alerts.slice(0, -1))
                clearTimeout(badFishCaughtTimeout)
            }, animationTime)
        } else {
            setBadFishCaught(false)
        }

        return () => {
            clearTimeout(badFishCaughtTimeout)
        }
        // eslint-disable-next-line
    }, [badFishCaught, squirrelState?.armorBonus])

    useEffect(() => {
        pushStuff()
        increaseStuffSpeed && increaseStuffSpeed()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {stuffs}
            {lifeAlerts}
        </>
    )
}

export default StuffsRandomizerContainer
