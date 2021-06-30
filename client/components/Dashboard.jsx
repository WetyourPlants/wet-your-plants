import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MainListItems from './MainListItems';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { red, yellow } from '@material-ui/core/colors';
import { ClassRounded } from '@material-ui/icons';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import moment from 'moment';
// import Chart from './Chart';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  dangerCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: 'red',
    background: 'linear-gradient(red, orange)',
    color: 'white',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Dashboard() {
  console.log('Hit dashboard');
  useEffect(() => {
    console.log('Inside use effect');
  }, []);
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    console.log('I am using effect');
    fetch('/home/getPlants')
      .then((res) => res.json())
      .then((res) => {
        console.log(res.plantList[0].plantInfo);
        setCards(res.plantList || []);
      });
  }, []);
  console.log(cards);

  const waterClick = (cardDet) => {
    console.log(cardDet);
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nickname: cardDet.nickname,
        planttype: cardDet.planttype,
        healthInfo: cardDet.healthInfo,
        lastWatered: new Date(),
      }),
    };
    fetch('/updateuserplant', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log('updated user plant after water???');
        console.log(data);
        setCards(data.plantList || []);
      });
  };
  const addPlant = (event) => {
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

  function handleAdd(event) {
    setCards(event || []);
  }
  // const deletePlantClick = () => {
  //   const requestOptions = {
  //     method: 'PATCH',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({lastWaterDate})
  //   }
  //   fetch('/deleteuserplant', requestOptions)
  //   .then(res => res.json())
  //   .then(data => )
  // }

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const getCardClass = (nextWater) => {
    let currDate = new Date();
    if (moment(nextWater).isBefore(moment(currDate))) {
      return classes.dangerCard;
    }
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position='absolute'
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component='h1'
              variant='h6'
              color='inherit'
              noWrap
              className={classes.title}
            >
              Wet Your Plants
            </Typography>
            <IconButton color='inherit'>
              <Badge badgeContent={4} color='secondary'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant='permanent'
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <List>
            <MainListItems handleAdd={handleAdd} />
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container className={classes.cardGrid} maxWidth='md'>
            {/* End hero unit */}
            <Grid container spacing={4}>
              {cards.map((card, i) => (
                <Grid item key={i} xs={12} sm={6} md={4}>
                  <Card className={getCardClass(card.nextWaterDate)}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={card.imageUrl}
                      title='Image title'
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant='h5' component='h2'>
                        {card.nickname}
                      </Typography>
                      <Typography>
                        <label>Last Water Date: </label>
                        {moment(card.lastWaterDate).format('MMM Do YY')}
                        <br></br>
                        <label>Next Water Date: </label>{' '}
                        {moment(card.nextWaterDate).format('MMM Do YY')}
                      </Typography>
                    </CardContent>
                    <div className={classes.controls}>
                      <IconButton
                        aria-label='play/pause'
                        onClick={() => {
                          waterClick(card);
                        }}
                      >
                        <LocalDrinkIcon className={classes.playIcon} />
                      </IconButton>
                    </div>
                    <CardActions></CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      </div>
    </React.Fragment>
  );
}
