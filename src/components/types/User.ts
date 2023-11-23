// src\components\types\User.ts

export interface User {
    id: string;
    name: string;
    email: string;
}

export const userData: User[] = [
    {
        id: '1',
        name: 'user 1',
        email: 'email-1-@email.com'
    },
    {
        id: '2',
        name: 'user 2',
        email: 'email-2-@email.com'
    },
    {
        id: '3',
        name: 'user 3',
        email: 'email-3-@email.com'
    }
]

export const createUser = (): User => {
    const num = random();
    return {
        id: `${num}`,
        name: `Producto ${num}`,
        email: `email-${num}-@email.com`
    }
}

export function random() {
    const min = 4;
    const max = 1000;
    return Math.floor((Math.random() * (max - min + 1)) + min);
}