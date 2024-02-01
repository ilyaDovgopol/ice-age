import React, {useContext, useEffect, useRef} from 'react'
import MouseContext from 'Context/Mouse/MouseContext'
import hero from 'Images/hero.png'
import megaHero from 'Images/mega-hero.png'
import SquirrelContext from 'Context/Squirrel/SquirrelContext'

import styles from './SquirrelStyles.module.scss'

const Squirrel: React.FC = () => {
    const { mouseState } = useContext(MouseContext)
    const { setSquirrelElement, setMegaSquirrel, squirrelState } = useContext(SquirrelContext)

    const heroElementRef = useRef(null)

    useEffect(() => {
        let megaSquirrelTimeout: number

        if (squirrelState?.isMega && setMegaSquirrel) {
            megaSquirrelTimeout = window.setTimeout(() => setMegaSquirrel(false), 10000)
        }

        return () => {
            clearTimeout(megaSquirrelTimeout)
        }
    }, [setMegaSquirrel, squirrelState?.isMega])

    useEffect(() => {
        setSquirrelElement && setSquirrelElement(heroElementRef.current)
        // eslint-disable-next-line
    },[])

    return (
        <img
            ref={heroElementRef}
            src={squirrelState?.isMega ? megaHero : hero}
            className={styles.squirrel}
            style={{ left: mouseState?.horizontalPosition }}
            alt={'Hero'}
        />
    )
}

export default Squirrel
