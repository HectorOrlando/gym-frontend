// src\components\backoffice\exercises\AddExerciseForm.tsx

import React, { useState } from 'react';
import { Exercise } from '@/interfaces/exercise';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { ExerciseValidationResult, validateExercise } from '@/middleware/validationMiddleware';

const AddExerciseForm: React.FC<{
    addExercise: (exercise: Exercise) => void,
    onCancel: () => void
}> = ({ addExercise, onCancel }) => {
    const [exercise, setExercise] = useState({
        name: '',
        typeOfExercise: '',
        series: 0,
        repetitions: 0,
        rest: 0,
        weight: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setExercise({ ...exercise, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validar campos antes de agregar un ejercicio
        const validationResult: ExerciseValidationResult = validateExercise(exercise);

        if (validationResult.isValid) {
            addExercise(exercise);
            setExercise({
                name: '',
                typeOfExercise: '',
                series: 0,
                repetitions: 0,
                rest: 0,
                weight: 0,
            });
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
                        value={exercise.name}
                        onChange={handleChange}
                        margin="normal"
                    />
                </Box>

                {/* Nuevos campos para el ejercicio */}
                <Box sx={{ mt: 2 }}>
                    <TextField
                        required={true}
                        label="Type of Exercise"
                        type="text"
                        name="typeOfExercise"
                        variant="outlined"
                        fullWidth
                        value={exercise.typeOfExercise}
                        onChange={handleChange}
                        margin="normal"
                    />
                </Box>

                <Box sx={{ mt: 2 }}>
                    <TextField
                        required={true}
                        label="Series"
                        type="number"
                        name="series"
                        variant="outlined"
                        fullWidth
                        value={exercise.series}
                        onChange={handleChange}
                        margin="normal"
                    />
                </Box>

                <Box sx={{ mt: 2 }}>
                    <TextField
                        required={true}
                        label="Repetitions"
                        type="number"
                        name="repetitions"
                        variant="outlined"
                        fullWidth
                        value={exercise.repetitions}
                        onChange={handleChange}
                        margin="normal"
                    />
                </Box>

                <Box sx={{ mt: 2 }}>
                    <TextField
                        required={true}
                        label="Rest"
                        type="number"
                        name="rest"
                        variant="outlined"
                        fullWidth
                        value={exercise.rest}
                        onChange={handleChange}
                        margin="normal"
                    />
                </Box>

                <Box sx={{ mt: 2 }}>
                    <TextField
                        required={true}
                        label="Weight"
                        type="number"
                        name="weight"
                        variant="outlined"
                        fullWidth
                        value={exercise.weight}
                        onChange={handleChange}
                        margin="normal"
                    />
                </Box>

                <Box sx={{ mt: 2 }}>
                    <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
                        Add Exercise
                    </Button>
                    <Button type="button" variant="outlined" color="secondary" onClick={onCancel}>
                        Cancel
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default AddExerciseForm;
