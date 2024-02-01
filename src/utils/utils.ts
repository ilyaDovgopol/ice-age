// TODO: change "any" type to specify it
// eslint-disable-next-line
export const getRandomElement = (array: Array<any>): any => {
    const uniqueFilterNumber = Math.random()

// eslint-disable-next-line
    const randomizer = (array: Array<any>): any => {
        const selectedElement = array[Math.floor(Math.random() * array.length)]

        if (selectedElement.uniqueRate >= uniqueFilterNumber) {
            return selectedElement
        } else {
            return randomizer(array)
        }
    }

    return randomizer(array)
}
export const getRandomNumber = (num: number): number => Math.floor(Math.random() * num)
