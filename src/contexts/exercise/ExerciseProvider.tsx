import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { ExerciseContext } from './ExerciseContex';
import { ContextProps, ExerciseListResponse } from '@/interfaces/exercise';
import { gymApi } from '@/api';

export const ExerciseProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, setState] = useState<ContextProps>({ exercises: [] });

    const getExercises = async () => {
        try {
            const { data } = await gymApi.get<ExerciseListResponse>('/gym/exercises');
            setState({ exercises: data.exercises });
        } catch (error) {
            console.error('Error fetching Exercise data:', error);
        }
    }

    useEffect(() => {
        getExercises();
    }, []);


    return (
        <ExerciseContext.Provider value={state}>
            {children}
        </ExerciseContext.Provider>
    )
};