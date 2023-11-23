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

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Button, ButtonGroup } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';

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

    const handleUpdateUser = (userId: string) => {
        console.log(`actualizar usuario nº :  ${userId}`);
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">ID</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        users.map(({ id, name, email }) => (
                            <TableRow key={id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{id}</TableCell>
                                <TableCell align="left">{name}</TableCell>
                                <TableCell align="left">{email}</TableCell>
                                <TableCell align="center" sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                                        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleRemoveUser(id)}></Button>
                                        <Button variant="outlined" startIcon={<EditIcon />} onClick={() => handleUpdateUser(id)}></Button>
                                        <Button variant="contained" startIcon={<AddCircleIcon />} onClick={() => handleAddUser()}></Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default UserList;

