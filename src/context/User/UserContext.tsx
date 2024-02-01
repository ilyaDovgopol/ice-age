import {createContext} from 'react'

import {UserContextType} from 'Types/UserTypes'

const UserContext = createContext<Partial<UserContextType>>({})

export default UserContext
