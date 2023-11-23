// src\components\users\UserProvider.tsx

import { FC, ReactNode, useReducer } from 'react';
import { UserContext } from './UserContext';
import { userReducer } from './UserReducer';
import { userData } from '../types';

interface UserProviderProps {
    children: ReactNode;
}


export const UserProvider:FC<UserProviderProps> = ({ children }) => {

    const [users, dispatch] = useReducer( userReducer , userData );

    return (
        <UserContext.Provider value={{ users, dispatch }}>
            {children}
        </UserContext.Provider>
    )
};