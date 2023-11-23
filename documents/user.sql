## Estoy creando el componente User estos son los archivos

// src\components\types\index.ts

export * from './User';
export * from './UserActions';

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

// src\components\types\UserActions.ts

import { User } from './User';

export type UserAction =
    | { type: 'ADD_USER'; payload: User }
    | { type: 'REMOVE_USER'; payload: {id: string} }


// src\components\users\UserContext.tsx

import { Dispatch, createContext } from 'react';
import { User, UserAction } from '../types';

interface UserContextProps {
    users: User[];
    dispatch: Dispatch<UserAction>;
}


export const UserContext = createContext({} as UserContextProps );


// src\components\users\UserProvider.tsx

import { FC, ReactNode, useReducer } from 'react';
import { UserContext } from './UserContext';
import { userReducer } from './UserReducer';
import { userData } from '../types';

interface UserProviderProps {
    children: ReactNode;
}


export const UserProvider:FC<UserProviderProps> = ({ children }) => {

    const [users, dispatch] = useReducer( userReducer , userData );

    return (
        <UserContext.Provider value={{ users, dispatch }}>
            {children}
        </UserContext.Provider>
    )
};


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

// src\components\users\UserList.tsx

import { useContext } from 'react';
import { UserContext } from './UserContext';
import { UserAction, createUser } from '../types';

import { Button, List, ListItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const UserList: React.FC = () => {

    const { users, dispatch } = useContext(UserContext)!;

    const handleAddUser = () => {
        const action: UserAction = {
            type: 'ADD_USER',
            payload: createUser()
        }
        dispatch(action);
    }

    const handleRemoveUser = (userId: string) => {
        const action: UserAction = {
            type: 'REMOVE_USER',
            payload: { id: userId }
        }
        dispatch(action);
    }


    return (
        <List sx={{ width: '100%', maxWidth: 660, bgcolor: 'background.paper' }}>
            {
                users.map(({ id, name, email }) => (
                    <ListItem key={id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            {`Id:   ${id}   Name:   ${name} Email:  ${email}`}
                        </div>
                        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleRemoveUser(id)}>
                            Delete
                        </Button>
                    </ListItem>
                ))
            }
            <Button variant="contained" color="success" startIcon={<AddCircleIcon />} onClick={() => handleAddUser()}>
                Add User
            </Button>
        </List>
    )
}

export default UserList;



