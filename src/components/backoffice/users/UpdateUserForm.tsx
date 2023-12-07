// src\components\backoffice\users\UpdateUserForm.tsx

import React, { useState, useEffect } from 'react';
import { User } from '@/interfaces/user';
import { validateUser, UserValidationResult } from '@/middleware/validationMiddleware'; // Importar la función de validación

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

// Definición del componente funcional para el formulario de actualización de usuario
const UpdateUserForm: React.FC<{
    updateUser: (userId: string, user: User) => void,
    onCancel: () => void,
    userToUpdate: User
}> = ({ updateUser, onCancel, userToUpdate }) => {
    const [user, setUser] = useState({
        name: userToUpdate.name,
        email: userToUpdate.email,
    });

    useEffect(() => {
        setUser({
            name: userToUpdate.name,
            email: userToUpdate.email,
        });
    }, [userToUpdate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validar campos antes de actualizar un usuario
        const validationResult: UserValidationResult = validateUser(user);

        if (validationResult.isValid) {
            updateUser(userToUpdate._id!, user);
            onCancel();
        } else {
            // Manejar errores de validación, por ejemplo, mostrar mensajes de error
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
                        Update User
                    </Button>
                    <Button type="button" variant="outlined" color="secondary" onClick={onCancel}>
                        Cancel
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default UpdateUserForm;
