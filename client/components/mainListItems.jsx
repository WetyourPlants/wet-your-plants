import React, { useState, useRef } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EcoIcon from '@material-ui/icons/Eco';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import BarChartIcon from '@material-ui/icons/BarChart';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export const MainListItems = () => {
  const [open, setOpen] = useState(false);
  const [add, setAdd] = useState([]);
  const [planttype, setType] = useState('');
  const [nickname, setNickname] = useState('');
  const [lastWatered, setLastWatered] = useState('');
  const refHook = useRef(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {};

  const addPlantClick = (info) => {
    console.log('info: ', info.target);
    console.log('info:', info.currentTarget);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname, planttype, lastWatered }),
    };
    fetch('/adduserplant', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOpen(false);
      });
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Add A New Plant</DialogTitle>
        <DialogContent>
          <DialogContentText>
            As the garden grows, so does the gardener!
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='nickname'
            label='Enter New Plant Nickname'
            type='nickname'
            fullWidth
            onChange={(e) => setNickname(e.currentTarget.value)}
          />
          <TextField
            autoFocus
            margin='dense'
            id='plantType'
            label='Enter New Plant Type'
            type='plantType'
            fullWidth
            onChange={(e) => setType(e.currentTarget.value)}
          />
          <TextField
            autoFocus
            margin='dense'
            id='lastWatered'
            label='Enter Last Watered Date (MM-DD-YYYY)'
            type='lastWatered'
            fullWidth
            onChange={(e) => setLastWatered(e.currentTarget.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              addPlantClick(e);
            }}
            color='primary'
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary='Dashboard' />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <EcoIcon />
        </ListItemIcon>
        <ListItemText primary='Plants' />
      </ListItem>
      <ListItem button onClick={handleClickOpen}>
        <ListItemIcon>
          <AddCircleIcon />
        </ListItemIcon>
        <ListItemText primary='Add A New Plant' />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText primary='Delete A Plant' />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary='Reports' />
      </ListItem>
    </div>
  );
};
