import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { ExerciseContext } from './ExerciseContex';
import { ContextProps, Exercise, ExerciseListResponse } from '@/interfaces/exercise';
import { gymApi } from '@/api';

export const ExerciseProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, setState] = useState<ContextProps>({
        exercises: [],
        createExercise: () => { throw new Error('createExercise called before getExercises') },
    });

    const getExercises = async () => {
        try {
            const { data } = await gymApi.get<ExerciseListResponse>('/gym/exercises');
            setState({ exercises: data.exercises, createExercise });
        } catch (error) {
            console.error('Error fetching Exercise data:', error);
        }
    }

    useEffect(() => {
        getExercises();
    }, []);

    const createExercise = async (exerciseData: Exercise) => {

        try {
            await gymApi.post('/gym/exercise', exerciseData);
            getExercises();
        } catch (error) {
            console.error('Error create user:', error);
        }
    }


    return (
        <ExerciseContext.Provider value={state}>
            {children}
        </ExerciseContext.Provider>
    )
};