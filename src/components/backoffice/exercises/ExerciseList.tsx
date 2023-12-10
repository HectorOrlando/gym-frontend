// src\components\backoffice\exercises\ExerciseList.tsx

import React, { useState } from 'react';
import { useExerciseContext } from '@/contexts/exercise/ExerciseContex';
import AddExerciseForm from './AddExerciseForm';
import { Exercise } from '@/interfaces/exercise';

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
import UpdateExerciseForm from './UpdateExerciseForm';


const ExerciseList: React.FC = () => {

  const { exercises, createExercise, updateExerciseById, deleteExerciseById } = useExerciseContext();
  const [showAddExerciseForm, setShowAddExerciseForm] = useState(false);
  const [showUpdateExerciseForm, setShowUpdateExerciseForm] = useState(false);
  const [exerciseToUpdate, setExerciseToUpdate] = useState<Exercise | null>(null);

  const handleRemoveExercise = (_id: string) => {
    deleteExerciseById(_id);
  }

  const handleUpdateExercise = (exerciseId: string) => {
    const exerciseToUpdate = exercises.find(exercise => exercise._id === exerciseId);
    if (exerciseToUpdate) {
      setExerciseToUpdate(exerciseToUpdate);
      setShowUpdateExerciseForm(true);
    }
  }

  const showAddExercise = () => {
    setShowAddExerciseForm(true);
  }

  const hideAddExerciseForm = () => {
    setShowAddExerciseForm(false);
  }

  const hideUpdateExerciseForm = () => {
    setShowUpdateExerciseForm(false);
    setExerciseToUpdate(null);
  }


  return (
    <>
      <Button
        variant="outlined"
        style={{ marginBottom: '15px' }}
        startIcon={<AddCircleIcon />}
        onClick={() => showAddExercise()}
      >
        Add Exercise
      </Button>
      {
        showAddExerciseForm && (
          <AddExerciseForm
            addExercise={createExercise}
            onCancel={hideAddExerciseForm}
          />
        )
      }
      {showUpdateExerciseForm && exerciseToUpdate && (
        <UpdateExerciseForm
          updateExercise={updateExerciseById}
          onCancel={hideUpdateExerciseForm}
          exerciseToUpdate={exerciseToUpdate}
        />
      )}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Type of Exercise</TableCell>
              <TableCell align="left">Series</TableCell>
              <TableCell align="left">Repetitions</TableCell>
              <TableCell align="left">Rest</TableCell>
              <TableCell align="left">Weight</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(exercises) && exercises.map(({ _id, name, typeOfExercise, series, repetitions, rest, weight }) => (
              <TableRow key={_id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{_id}</TableCell>
                <TableCell align="left">{name}</TableCell>
                <TableCell align="left">{typeOfExercise}</TableCell>
                <TableCell align="left">{series}</TableCell>
                <TableCell align="left">{repetitions}</TableCell>
                <TableCell align="left">{rest}</TableCell>
                <TableCell align="left">{weight}</TableCell>
                <TableCell align="center" sx={{ display: 'flex', justifyContent: 'center' }}>
                  <ButtonGroup variant="outlined" aria-label="outlined button group">
                    <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleRemoveExercise(_id!)}></Button>
                    <Button variant="outlined" startIcon={<EditIcon />} onClick={() => handleUpdateExercise(_id!)}></Button>
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

export default ExerciseList; 