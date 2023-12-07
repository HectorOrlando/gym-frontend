// src/contexts/user/UserReducer.ts

import { UserAction, UsersListResponse } from '../../interfaces/user'

export const userReducer = (state: UsersListResponse, action: UserAction): UsersListResponse => {
   switch (action.type) {
      case 'ADD_USER':
         return { users: [...state.users, action.payload] };
      case 'REMOVE_USER':
         return { users: state.users.filter(user => user._id !== action.payload._id) };
      case 'SET_USERS':
         return { users: action.payload.users };
      default:
         return state;
   }
};
