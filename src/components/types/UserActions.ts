// src\components\types\UserActions.ts

import { User } from './User';

export type UserAction =
    | { type: 'ADD_USER'; payload: User }
    | { type: 'REMOVE_USER'; payload: {id: string} }
    | { type: 'SET_USERS'; payload: User[] }
