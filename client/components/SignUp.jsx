import React, { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import image from '../assets/plant.png';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// import UserService from '@services/user';

// import { UserContext } from '@contexts/user';
// import { AuthContext } from '@contexts/auth';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Wet Your Plants
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = {
  paperContainer: {
    backgroundImage: `url(${image})`,
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage:
      'url(https://lh3.googleusercontent.com/pIWn3qkeq2eg_vq3FwF2hujYm4KydZkv8rdkjO_qT2o6uJAigUzXGyBXUY9bKFCn_N5d6G6HkEmoukQUi0C3gEUxuhzm6IdD2NEquR-y8pu7yAZdx6Co62l04wfIwOUvxfh0rQUxXNGP5GEO2_2uwLPB4wM8OUlIqTLzJ0v8WZQ4y-A5Ar8oBZzk7nWoa5Y2j-le5cIGVOpRFH3na1hUJLp3S7q4aYjkYvvQxdAJK55fdHNyTeCY4HlrRV094561ubDmQYwjdizq2HMLVpq1yQdhN-rW5ncI7MauQmyp61i2EV9FinmgHuy17-jTtUMiBw6WxWsBjjx8H1eAXLMo3wSHnQDgFm6DSuSBGZsU1rrYwxpjmEfGo9onMupm4ChoBQzaPuqng1O7PuhmVYCUKm_PybEX5NCv-Rdfro_-Z4BXxjgQToFqUbF4NuhjC3lS8rklj8riJb0I6MPmz8cmpMD8ASbwx4ByhDJ5PWHzHLtt57q_JGhESVg39bJTSsXpJ5eVZSzMa94_U_vz0JxJnyLjEdSIZr7WcD3JkOYp2Ii-qLFlr-fk94eFpxsOQJdELRq3L1F2S1w35ZoU24H5AIKZZu1Ln3NF9ByIHpRceB5cIBxlnQmkKHhM7VEpJGri0F5305fG-z0wv_z6PyhC21xFc6eSa_M9RwM36t1ko25pEXsX98lzLAnpesPJzZY0XwlonWdyAdooZucw_S5Xe-6f=w988-h1482-no?authuser=0)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  // const { handleSubmit, control, errors: fieldsErrors, reset } = useForm();
  const [signedUp, setSignedUp] = useState(false);
  const [username, setUsername] = useState('');
  const [emailadd, setEmailadd] = useState('');
  const [phonenum, setPhonenum] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpw, setConfirmpw] = useState('');

  const onSubmit = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        email,
        password,
        phonenumber,
        confirmpassword,
      }),
    };
    fetch('/login', requestOptions)
      .then((res) => res.json())
      .then((data) => setSignedUp(true));
  };

  if (signedUp) {
    return <SignInSide />;
  }
  return (
    <div>
      <label htmlFor={'Username'}> </label>
      {/* <input
        id= {"Username"}
        onChange = {(event)=> {
          setUsername(event.target.value);
        }}
        /> */}

      <div>
        <label htmlFor={'EmailAddress'}> </label>
        {/* <input
        id= {"EmailAddress"}
        onChange = {(event)=> {
          setEmailadd(event.target.value);
        }}
        /> */}

        <div>
          <label htmlFor={'PhoneNumber'}> </label>
          {/* <input
        id= {"PhoneNumber"}
        onChange = {(event)=> {
          setPhonenum(event.target.value);
        }}
        /> */}
          <div>
            <label htmlFor={'Password'}> </label>

            <div>
              <Grid container component='main' className={classes.root}>
                <CssBaseline />
                <Grid
                  item
                  xs={false}
                  sm={4}
                  md={7}
                  className={classes.image}
                  style={styles.paperContainer}
                >
                  {/* <img src="/Assets/plant.png" /> */}
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={8}
                  md={5}
                  component={Paper}
                  elevation={6}
                  square
                >
                  <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                      Sign Up
                    </Typography>
                    {/* <form className={classes.form} noValidate> */}
                    <TextField
                      variant='outlined'
                      margin='normal'
                      required
                      fullWidth
                      id='Username'
                      label='Username'
                      name='username'
                      //   autoComplete="email"
                      autoFocus
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                      variant='outlined'
                      margin='normal'
                      required
                      fullWidth
                      id='EmailAddress'
                      label='Email Address'
                      name='email'
                      //   autoComplete="email"
                      autoFocus
                      value={emailadd}
                      onChange={(e) => setEmailadd(e.target.value)}
                    />
                    <TextField
                      variant='outlined'
                      margin='normal'
                      required
                      fullWidth
                      id='PhoneNumber'
                      label='Phone Number'
                      name='phonenum'
                      //   autoComplete="email"
                      autoFocus
                      value={phonenum}
                      onChange={(e) => setPhonenum(e.target.value)}
                    />
                    <TextField
                      variant='outlined'
                      margin='normal'
                      required
                      fullWidth
                      name='password'
                      label='Password'
                      type='password'
                      id='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      //   autoComplete="current-password"
                    />
                    <TextField
                      variant='outlined'
                      margin='normal'
                      required
                      fullWidth
                      name='password'
                      label='Confirm Password'
                      type='password'
                      id='password'
                      value={confirmpw}
                      onChange={(e) => setConfirmpw(e.target.value)}
                      //   autoComplete="current-password"
                    />
                    <FormControlLabel
                      control={<Checkbox value='remember' color='primary' />}
                      label='Agree to terms and conditions'
                    />
                    <Button
                      type='submit'
                      fullWidth
                      variant='contained'
                      color='primary'
                      className={classes.submit}
                      onClick={onSubmit}
                    >
                      Sign Up
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link href='#' variant='body2'></Link>
                      </Grid>
                      <Grid item>
                        <Link href='#' variant='body2'></Link>
                      </Grid>
                    </Grid>
                    <Box mt={5}>
                      <Copyright />
                    </Box>
                    {/* </form> */}
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
