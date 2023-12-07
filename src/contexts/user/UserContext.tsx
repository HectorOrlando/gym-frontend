// src\contexts\user\UserContext.tsx

import { createContext, useContext } from 'react';
import { UsersListResponse } from '@/interfaces/user';

interface ContextProps {
    // Estados
    users: UsersListResponse;
    // Métodos
    deleteUserById: (id: string) => void;
    addUser: () => void;
}

// Contexto del estado de usuario
export const UserContext = createContext<ContextProps | undefined>(undefined);

// Hook para acceder al contexto de usuario
export const useUserContext = (): ContextProps => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};