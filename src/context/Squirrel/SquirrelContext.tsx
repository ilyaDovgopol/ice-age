import {createContext} from 'react'

import {SquirrelContextType} from 'Types/SquirrelTypes'

const SquirrelContext = createContext<Partial<SquirrelContextType>>({})

export default SquirrelContext