// src\contexts\user\UserProvider.tsx

import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import { ContextProps, User, UsersListResponse } from '../../interfaces/user';
import { gymApi } from '@/api';

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, setState] = useState<ContextProps>({
        users: [],
        deleteUserById: () => { throw new Error('deleteUserById called before getUsers') },
        createUser: () => { throw new Error('createUser called before getUsers') },
        updateUser: () => { throw new Error('updateUser called before getUsers') }
    });

    const getUsers = async () => {
        try {
            const { data } = await gymApi.get<UsersListResponse>('/gym/users');
            setState({ users: data.users, deleteUserById, createUser, updateUser });
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    const deleteUserById = async (_id: string) => {
        try {
            await gymApi.delete(`/gym/user/${_id}`);
            getUsers(); // Actualizar la lista de usuarios después de eliminar
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const createUser = async (userData: User) => {
        
        try {
            await gymApi.post('/gym/user', userData);
            getUsers();
        } catch (error) {
            console.error('Error create user:', error);
        }
    }

    const updateUser =async (_id: string, userData: User) => {

        try {
            await gymApi.put(`/gym/user/${_id}`, userData);
            getUsers();
        } catch (error) {
            console.error('Error update user:', error);
        }
    }

    return (
        <UserContext.Provider value={state}>
            {children}
        </UserContext.Provider>
    );
};
