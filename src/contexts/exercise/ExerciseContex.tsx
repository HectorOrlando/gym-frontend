// src\contexts\exercise\ExerciseContex.tsx

import { createContext, useContext } from 'react';
import { ContextProps } from '@/interfaces/exercise';

// Contexto del estado de ejecicio
export const ExerciseContext = createContext<ContextProps | undefined>(undefined);

// Hook para acceder al contexto de ejercicio
export const useExerciseContext = (): ContextProps => {
    const context = useContext(ExerciseContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
}