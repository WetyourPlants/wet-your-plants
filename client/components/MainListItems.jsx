/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
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
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
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
  const [lastWatered, setLastWatered] = React.useState(new Date());
  const refHook = useRef(false);
  const [renderStatus, setRenderStatus] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [plantsList, setPlantsList] = useState([])
  const [myPlants, setMyPlants] = useState([])
  const [openCustom, setOpenCustom] = useState(false);
  const [species, setSpecies] = useState('');
  const [image, setImage] = useState('');
  const [desc, setDesc] = useState('');
  const [sched, setSched] = useState("1-2 weeks");

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

  const handleClickOpenCustom = () => {
    setOpenCustom(true);
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
        getMyPlants()
        setOpen(false);
      });
  };

  const deletePlantClick = (info) => {
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname }),
    };
    fetch('/deleteuserplant', requestOptions)
      // .then(data => console.log(data))
      .then(res => res.json())
      .then((data) => {
        console.log('still here')
        console.log(data)
        props.handleAdd(data.plantList);
        getMyPlants()
        setOpenDelete(false);
      })
      .catch(err => console.log('error in deleteplantclick', err));
  }
  
  const customPlantClick = (info) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ species, image, desc, sched }),
    };
    fetch('/addcustomplant', requestOptions)
      // .then(data => console.log(data))
      .then(res => res.json())
      .then((data) => {
        console.log('still here')
        console.log(data)
        // props.handleAdd(data.plantList);
        mapPlantsToDrop()
        setOpenCustom(false);
      })
      .catch(err => console.log('error in deleteplantclick', err));
  }

 const mapPlantsToDrop = () => {
   fetch('/getplanttypes')
   .then((res) => res.json())
   .then((data) => {
     console.log(data)
     const mappedPlants = [];
     data.forEach((el) => mappedPlants.push(<MenuItem value={el}>{el}</MenuItem>))
     setPlantsList(mappedPlants)
   })
 }

const getMyPlants= () => {
  fetch('/home/getPlants')
  .then(res => res.json())
  .then(data => {
    console.log(data)
    const tempPlantsObjToArray = [];
    data.plantList.forEach((el) => {
      tempPlantsObjToArray.push(el['nickname'])
    })
    return tempPlantsObjToArray
  })
  .then(data => {
    console.log(data)
    const tempMyPlants = [];
    data.forEach((el) => tempMyPlants.push(<MenuItem value={el}>{el}</MenuItem>))
    setMyPlants(tempMyPlants)
  })
}

  useEffect(() => {
    if(plantsList.length === 0) {
      mapPlantsToDrop()
      console.log('fetching plants type')
    }
    if(myPlants.length === 0) {
      getMyPlants()
    }
  })

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
          {/* Insert Plant nickname field */}
          <TextField
            autoFocus
            margin='dense'
            id='nickname'
            label='Enter New Plant Nickname'
            type='nickname'
            fullWidth
            onChange={(e) => setNickname(e.currentTarget.value)}
          />
          {/* Plant type dropdown */}
          &nbsp;
          <Select
            margin='dense'
            fullWidth
            value={planttype}
            onChange={(e) => setType(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="" disabled>
              Select Plant Type
            </MenuItem>
            {plantsList}
          </Select>

          {/* Insert date when last watered field */}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                fullWidth
                autoOk={true}
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Pick Last Watered Date"
                value={lastWatered}
                onChange={setLastWatered}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
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
        <DialogTitle id='form-dialog-title'>Pull A Plant</DialogTitle>
        <DialogContent>
          <DialogContentText>
            As the garden shrinks, so does the gardener!
          </DialogContentText>
          {/* Plant nickname dropdown */}
          <Select
            margin='dense'
            fullWidth
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="" disabled>
              Select a plant to pull
            </MenuItem>
            {myPlants}
          </Select>
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
              deletePlantClick(e);
            }}
            color='primary'
          >
            RIP
          </Button>
        </DialogActions>
      </Dialog>

      {/* this is the dialog for the custom plant type button */}
      <Dialog
        open={openCustom}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        id='addPlant'
      >
        <DialogTitle id='form-dialog-title'>Add New Custom Plant</DialogTitle>
        <DialogContent>
          <DialogContentText>
            As the garden variety grows, so does the gardener!
          </DialogContentText>
          {/* Insert Plant name field */}
          <TextField
            autoFocus
            margin='dense'
            id='nickname'
            label='Enter New Plant Species'
            type='species'
            fullWidth
            onChange={(e) => setSpecies(e.currentTarget.value)}
          />
          {/* Plant image upload */}
          <TextField
            margin='dense'
            id='image'
            label='Enter Image URL'

            fullWidth
            onChange={(e) => setImage(e.currentTarget.value)}
          />
          
          {/* Insert description */}
          <TextField
            margin='dense'
            id='desc'
            label='Enter a Description'
            type='desc'
            fullWidth
            onChange={(e) => setDesc(e.currentTarget.value)}
          />
          {/* Insert watering schedule */}
          &nbsp;
          <Select
            margin='dense'
            fullWidth
            value={sched}
            onChange={(e) => setSched(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="" disabled>
              Choose a Watering Schedule
            </MenuItem>
            <MenuItem value={"1-2 weeks"}>1-2 weeks</MenuItem>
            <MenuItem value={"2-3 weeks"}>2-3 weeks</MenuItem>
            <MenuItem value={"3-4 weeks"}>3-4 weeks</MenuItem>

          </Select>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenCustom(false);
            }}
            color='primary'
          >
            Cancel
          </Button>
          <Button
            onClick={(e) => {
              customPlantClick(e);
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

      <ListItem button onClick={handleClickOpenCustom}>
        <ListItemIcon>
          <AddCircleIcon />
        </ListItemIcon>
        <ListItemText primary='Diversify Garden' />
      </ListItem>

    </div>
  );
};

export default MainListItems;