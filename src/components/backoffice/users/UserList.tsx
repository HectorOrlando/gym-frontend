// src\components\backoffice\users\UserList.tsx

import { useState } from 'react';
import { useUserContext } from '@/contexts/user/UserContext';
import { User } from '@/interfaces/user';
import AddUserForm from './AddUserForm';
import UpdateUserForm from './UpdateUserForm';

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
    const { users, deleteUserById, createUser, updateUser } = useUserContext();
    const [showAddUserForm, setShowAddUserForm] = useState(false);
    const [showUpdateUserForm, setShowUpdateUserForm] = useState(false);
    const [userToUpdate, setUserToUpdate] = useState<User | null>(null);

    const handleRemoveUser = (_id: string) => {
        deleteUserById(_id);
    }

    const handleUpdateUser = (userId: string) => {
        const userToUpdate = users.find(user => user._id === userId);
        if (userToUpdate) {
            setUserToUpdate(userToUpdate);
            setShowUpdateUserForm(true);
        }
    }

    const showAddUser = () => {
        setShowAddUserForm(true);
    }

    const hideAddUserForm = () => {
        setShowAddUserForm(false);
    }

    const hideUpdateUserForm = () => {
        setShowUpdateUserForm(false);
        setUserToUpdate(null);
    }

    return (
        <>
            <Button
                variant="outlined"
                style={{ marginBottom: '15px' }}
                startIcon={<AddCircleIcon />}
                onClick={() => showAddUser()}
            >
                Add User
            </Button>
            {showAddUserForm && (
                <AddUserForm
                    addUser={createUser}
                    onCancel={hideAddUserForm}
                />
            )}
            {showUpdateUserForm && userToUpdate && (
                <UpdateUserForm
                    updateUser={updateUser}
                    onCancel={hideUpdateUserForm}
                    userToUpdate={userToUpdate}
                />
            )}
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
                        {Array.isArray(users) && users.map(({ _id, name, email }) => (
                            <TableRow key={_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{_id}</TableCell>
                                <TableCell align="left">{name}</TableCell>
                                <TableCell align="left">{email}</TableCell>
                                <TableCell align="center" sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                                        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleRemoveUser(_id!)}></Button>
                                        <Button variant="outlined" startIcon={<EditIcon />} onClick={() => handleUpdateUser(_id!)}></Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default UserList;
