// src\components\users\UserList.tsx

import { useContext } from 'react';
import { UserContext } from './UserContext';
import { User } from '@/interfaces/users-list';
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

const UserList: React.FC<{ users: User[] }> = ({ users: userList }) => {

    const { dispatch } = useContext(UserContext)!;

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
                        userList.map(({ _id, name, email }) => (
                            <TableRow key={_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{_id}</TableCell>
                                <TableCell align="left">{name}</TableCell>
                                <TableCell align="left">{email}</TableCell>
                                <TableCell align="center" sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                                        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleRemoveUser(_id)}></Button>
                                        <Button variant="outlined" startIcon={<EditIcon />} onClick={() => handleUpdateUser(_id)}></Button>
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
