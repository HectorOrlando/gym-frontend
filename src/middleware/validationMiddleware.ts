// src\middleware\validationMiddleware.ts

import { User } from "@/interfaces/user";

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
