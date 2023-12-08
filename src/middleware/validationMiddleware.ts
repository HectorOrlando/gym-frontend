// src\middleware\validationMiddleware.ts

import { User } from "@/interfaces/user";
import { Exercise } from "@/interfaces/exercise";

export interface UserValidationResult {
    isValid: boolean;
    errors: { [key: string]: string };
}

export const validateUser = (user: User): UserValidationResult => {
    const errors: { [key: string]: string } = {};
    let isValid = true;

    // Validación del campo de nombre
    if (user.name.trim() === '' || user.name.length <= 3) {
        errors.name = 'Name is required';
        isValid = false;
    }

    // Validación del campo de correo electrónico
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
        errors.email = 'Invalid email address';
        isValid = false;
    }

    return { isValid, errors };
};


export interface ExerciseValidationResult {
    isValid: boolean;
    errors: { [key: string]: string };
}

export const validateExercise = (exercise: Exercise): ExerciseValidationResult => {
    const errors: { [key: string]: string } = {};
    let isValid = true;

    // Validación del campo de nombre
    if (exercise.name.trim() === '' || exercise.name.length <= 3) {
        errors.name = 'Name is required and must be at least 3 characters long';
        isValid = false;
    }

    // Validación del campo typeOfExercise
    if (exercise.typeOfExercise.trim() === '') {
        errors.typeOfExercise = 'Type of exercise is required';
        isValid = false;
    }

    // Validación del campo series
    if (isNaN(exercise.series) || exercise.series <= 0) {
        errors.series = 'Series must be a positive number';
        isValid = false;
    }

    // Validación del campo repetitions
    const repetitions = parseInt(exercise.repetitions as string);
    if (isNaN(repetitions) || repetitions <= 0) {
        errors.repetitions = 'Repetitions must be a positive number';
        isValid = false;
    }

    // Validación del campo rest
    if (isNaN(exercise.rest) || exercise.rest < 0) {
        errors.rest = 'Rest must be a non-negative number';
        isValid = false;
    }

    // Validación del campo weight
    if (isNaN(exercise.weight) || exercise.weight < 0) {
        errors.weight = 'Weight must be a non-negative number';
        isValid = false;
    }

    return { isValid, errors };
};