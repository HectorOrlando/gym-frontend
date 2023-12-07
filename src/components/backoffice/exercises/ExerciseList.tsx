import React from 'react'
import PropTypes from 'prop-types'
import { useExerciseContext } from '@/contexts/exercise/ExerciseContex'

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

const ExerciseList: React.FC = () => {

  const { exercises } = useExerciseContext();

  const handleRemoveExercise = (_id: string) => {
    // deleteExerciseById(_id);
}

const handleUpdateExercise = (exerciseId: string) => {
    // const exerciseToUpdate = exercises.find(exercise => exercise._id === exerciseId);
    // if (exerciseToUpdate) {
    //     setExerciseToUpdate(exerciseToUpdate);
    //     setShowUpdateUserForm(true);
    // }
}


  return (
    <>
     
    
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