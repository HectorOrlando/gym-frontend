// src\components\users\UserReducer.ts

import { User, UserAction } from '../types';

export const userReducer = (state: User[], action: UserAction): User[] => {
   switch (action.type) {
      case 'ADD_USER':
         return [...state, action.payload];
      case 'REMOVE_USER':
         return state.filter(user => user.id !== action.payload.id);
      // Puedes agregar más casos según tus necesidades
      default:
         return state;
   }
};
