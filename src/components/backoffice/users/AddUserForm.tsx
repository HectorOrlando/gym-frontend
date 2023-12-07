// src\components\backoffice\users\AddUserForm.tsx

import React, { useState } from 'react';
import { User } from '@/interfaces/user';
import { validateUser, UserValidationResult } from '@/middleware/validationMiddleware';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const AddUserForm: React.FC<{
    addUser: (user: User) => void,
    onCancel: () => void
}> = ({ addUser, onCancel }) => {
    const [user, setUser] = useState({
        name: '',
        email: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validar campos antes de agregar un usuario
        const validationResult: UserValidationResult = validateUser(user);

        if (validationResult.isValid) {
            addUser(user);
            setUser({ name: '', email: '' });
        } else {
            // Manejar errores, por ejemplo, podrías mostrar mensajes de error o realizar alguna otra acción
            console.log('Validation errors:', validationResult.errors);
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginBottom: '30px' }}>
            <form onSubmit={handleSubmit}>
                <Box sx={{ mt: 3 }}>
                    <TextField
                        required={true}
                        label="Name"
                        type="text"
                        name="name"
                        variant="outlined"
                        fullWidth
                        value={user.name}
                        onChange={handleChange}
                        margin="normal"
                    />
                </Box>

                <Box sx={{ mt: 2 }}>
                    <TextField
                        required={true}
                        label="Email"
                        type="email"
                        name="email"
                        variant="outlined"
                        fullWidth
                        value={user.email}
                        onChange={handleChange}
                        margin="normal"
                    />
                </Box>

                <Box sx={{ mt: 2 }}>
                    <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
                        Add User
                    </Button>
                    <Button type="button" variant="outlined" color="secondary" onClick={onCancel}>
                        Cancel
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default AddUserForm;
