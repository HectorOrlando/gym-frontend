// src\contexts\user\UserProvider.tsx

import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { userReducer } from './userReducer';
import { UserContext } from './UserContext';
import { getUsers } from '@/api';
import { ContextProps, User, UsersListResponse } from '../../interfaces/user'
import axios from 'axios';

export const gymApi = axios.create({
    // baseURL: 'https://gym-backend.upaje.com',
    baseURL: 'http://localhost:3008',
    
});
// src/contexts/user/UserProvider.tsx

// ...
export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, { users: [] as User[] });

    const deleteUserById = (id: string) => {
        dispatch({ type: 'REMOVE_USER', payload: { _id: id } });
    };

    const addUser = () => {
        const randomInt = (min: number, max: number) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        const numRandom = randomInt(10, 100).toString();
        const userNew = { _id: numRandom, name: `name ${numRandom}`, email: `email-${numRandom}-@email.com` };

        dispatch({ type: 'ADD_USER', payload: userNew });
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await gymApi.get<UsersListResponse>('/gym/users');
                dispatch({ type: 'SET_USERS', payload: data });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, []);

    const contextValue: ContextProps = {
        users: state.users,
        deleteUserById,
        addUser
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};