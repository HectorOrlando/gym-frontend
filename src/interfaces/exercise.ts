// src\interfaces\exercise.ts
// https://app.quicktype.io/

export interface ExerciseListResponse {
    exercises: Exercise[];
}

export interface Exercise {
    _id?:           string;
    name:           string;
    typeOfExercise: string;
    series:         number;
    repetitions:    number | string;
    rest:           number;
    weight:         number;
}

export interface ContextProps {
    exercises: Exercise[];
}
