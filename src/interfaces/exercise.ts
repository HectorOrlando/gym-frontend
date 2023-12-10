// src\interfaces\exercise.ts
// https://app.quicktype.io/

export interface ExerciseListResponse {
    exercises: Exercise[];
}

export interface Exercise {
    _id?: string;
    name: string;
    typeOfExercise: string;
    series: number;
    repetitions: number;
    rest: number;
    weight: number;
}

export interface ContextProps {
    exercises: Exercise[];
    createExercise: (exercise: Exercise) => void;
    updateExerciseById: (id: string, exercise: Exercise) => void;
    deleteExerciseById: (id: string) => void;
}
