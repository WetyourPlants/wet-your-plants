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
import Popper from '@material-ui/core/Popper';
// import { useHistory } from 'react-router-dom';
/*
const useStyles = makeStyles((theme) => ({
  paper: {
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));
*/
const MainListItems = (props) => {
  // const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [add, setAdd] = useState([]);
  const [planttype, setType] = useState('');
  const [nickname, setNickname] = useState('');
  const [lastWatered, setLastWatered] = useState('');
  const refHook = useRef(false);
  const [renderStatus, setRenderStatus] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const popHandleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  // const open = Boolean(anchorEl);
  // const id = open ? 'simple-popper' : undefined;

  const handleClickOpen = () => {
    setOpen(true);
  };
  // const [cards, setCards] = useState([]);
  
  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleClose = () => {};

  const addPlantClick = (info) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname, planttype, lastWatered }),
    };
    fetch('/adduserplant', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        props.handleAdd(data.plantList);
        setOpen(false);
      });
  };

  return (
    <div id='sidebar'>

      {/* this is the dialog for the add button */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        id='addPlant'
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
          <Button
            onClick={() => {
              setOpen(false);
            }}
            color='primary'
          >
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

      {/* this is the dialog for the delete button */}
      <Dialog
        open={openDelete}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        id='deletePlant'
      >
        <DialogTitle id='form-dialog-title'>Delete Your Plant</DialogTitle>
        <DialogContent>
          <DialogContentText>
            As the garden shrinks, so does the gardener!
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
          <Button
            onClick={() => {
              setOpenDelete(false);
            }}
            color='primary'
          >
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

      <ListItem button id='opendeletebutton' onClick={handleClickOpenDelete}>
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText primary='Delete A Plant' />
      </ListItem>

      <ListItem button onClick={popHandleClick}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary='Reports' />
      </ListItem>
    </div>
  );
};

export default MainListItems;