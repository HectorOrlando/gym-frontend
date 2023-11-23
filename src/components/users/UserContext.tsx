// src\components\users\UserContext.tsx

import { Dispatch, createContext } from 'react';
import { User, UserAction } from '../types';

interface UserContextProps {
    users: User[];
    dispatch: Dispatch<UserAction>;
}


export const UserContext = createContext({} as UserContextProps );