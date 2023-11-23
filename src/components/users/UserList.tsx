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