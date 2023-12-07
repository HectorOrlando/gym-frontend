// src\components\backoffice\users\UserList.tsx

import { useUserContext } from '@/contexts/user/UserContext';

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
    const { users, deleteUserById, createUser, updateUser} = useUserContext(); // Utilizamos el hook para acceder al contexto
    
    const handleAddUser = () => {
        const userNew = {"name": "user 7","email": "email-7-@email.com"}
        createUser(userNew);
    }

    const handleRemoveUser = (_id: string) => {
        deleteUserById(_id);
    }

    const handleUpdateUser = (userId: string) => {
    
        const userChange = {
            "name": `user 7 - cambiado AA-1 `,
            "email": `email-7-@email.com`,
        }
        updateUser(userId, userChange);
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
                    {Array.isArray(users) && users.map(({ _id, name, email }) => (
                        <TableRow key={_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">{_id}</TableCell>
                            <TableCell align="left">{name}</TableCell>
                            <TableCell align="left">{email}</TableCell>
                            <TableCell align="center" sx={{ display: 'flex', justifyContent: 'center' }}>
                                <ButtonGroup variant="outlined" aria-label="outlined button group">
                                    <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleRemoveUser(_id!)}></Button>
                                    <Button variant="outlined" startIcon={<EditIcon />} onClick={() => handleUpdateUser(_id!)}></Button>
                                    <Button variant="contained" startIcon={<AddCircleIcon />} onClick={() => handleAddUser()}></Button>
                                </ButtonGroup>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default UserList;