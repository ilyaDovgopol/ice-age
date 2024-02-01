import React, {useContext, useEffect, useRef, useState} from 'react'
import {getRandomElement, getRandomNumber} from 'Utils/utils'
import SquirrelContext from 'Context/Squirrel/SquirrelContext'

import styles from './StuffStyles.module.scss'
import UserContext from 'Context/User/UserContext'

type StuffType = {
    src: string,
    handler?: () => void
}

type StuffProps = {
    stuffs: Array<StuffType>
}

const Stuff: React.FC<StuffProps> = ({ stuffs }) => {
    const [randomElement, setRandomElement] = useState<StuffType>({ src: '' })
    const [verticalPosition, setVerticalPosition] = useState<number>(0)
    const [horizontalPosition, setHorizontalPosition] = useState<number>(0)
    const { squirrelState } = useContext(SquirrelContext)
    const { userState } = useContext(UserContext)

    const stuffElement = useRef<HTMLImageElement|null>(null)
    const verticalPositionState = useRef<number>(verticalPosition)
    const randomElementRef = useRef<StuffType|null>(null)

    const isCaught = () => {
        const stuffHeight: number = verticalPositionState.current + (stuffElement.current?.offsetHeight || 0)
        const maxHeight: number = document.body.offsetHeight - (squirrelState?.squirrelElement?.offsetHeight || 0)
        const isSquirrelHeightZone: boolean = stuffHeight > maxHeight
        const stuffWidthStart: number = stuffElement.current?.offsetLeft || 0
        const stuffWidthEnd: number = stuffWidthStart + (stuffElement.current?.offsetWidth || 0)
        const squirrelWidthStart: number = squirrelState?.squirrelElement?.offsetLeft || 0
        const squirrelWidthEnd: number = (squirrelState?.squirrelElement?.offsetLeft || 0)
            + (squirrelState?.squirrelElement?.offsetWidth || 0)
        const isStuffStartOnSquirrel: boolean = stuffWidthStart > squirrelWidthStart && stuffWidthStart < squirrelWidthEnd
        const isStuffEndOnSquirrel: boolean = stuffWidthEnd > squirrelWidthStart && stuffWidthEnd < squirrelWidthEnd
        const isCaught: boolean = isSquirrelHeightZone && (isStuffStartOnSquirrel || isStuffEndOnSquirrel)

        if (isCaught) {
            randomElementRef.current?.handler && randomElementRef.current?.handler()
        }

        return isCaught
    }

    const setNewPosition = () => {
        const stuffHeight: number = stuffElement.current?.offsetHeight || 0
        const maxHeight: number = document.body.offsetHeight - stuffHeight - 15
        const isReset: boolean = verticalPositionState.current > maxHeight || isCaught()

        if (isReset) {
            verticalPositionState.current = 0
            setVerticalPosition(0)
            recalculateHorizontalPosition()
            defineRandomElement()
        } else {
            setVerticalPosition(position => {
                const step = 15
                const newPosition = position + step

                verticalPositionState.current = newPosition

                return newPosition
            })
        }
    }

    const recalculateHorizontalPosition = () => {
        const fullWindowWidth: number = document.body.offsetWidth
        const stuffWidth: number = stuffElement.current?.offsetWidth || 0

        setHorizontalPosition(getRandomNumber(fullWindowWidth - Number(stuffWidth)))
    }

    const defineRandomElement = () => {
        const element = getRandomElement(stuffs)

        setRandomElement(element)
        randomElementRef.current = element
    }

    useEffect(() => {
        recalculateHorizontalPosition()
        defineRandomElement()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const DEFAULT_SPEED = 30
        const currentSpeed = squirrelState?.speedBonus ? 12 : userState?.stuffSpeed || DEFAULT_SPEED
        const interval = setInterval(setNewPosition, currentSpeed)
        return () => clearInterval(interval)
        // eslint-disable-next-line
    }, [userState?.stuffSpeed, squirrelState?.speedBonus])

    return (
        <img
            ref={stuffElement}
            className={styles.stuff}
            style={{ left: horizontalPosition, top: verticalPosition }}
            src={randomElement.src}
            alt={'Stuff item'}
        />
    )
}

export default Stuff
