import { createContext } from 'react'

import {MouseContextType} from 'Types//MouseTypes'

const MouseContext = createContext<Partial<MouseContextType>>({})

export default MouseContext