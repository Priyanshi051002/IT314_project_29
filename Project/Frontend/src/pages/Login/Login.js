import React from 'react'
import {Avatar, Button, FormControlLabel, Grid, Paper, TextField, Typography,Link} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import Checkbox from '@mui/material/Checkbox';


const Login = () => {
  const paperStyle = {padding: 20, height: '70vh', width: 280, margin: "20px auto"}
  const avatarStyle = {backgroundColor: '#1bbd7e'}
  const buttonStyle={margin:'8px 0'}
  return (
    <div>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align='center'>
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon/>
          </Avatar>
          <h2>Sign in</h2>
          </Grid>
          <TextField variant="filled" label='Username' required placeholder='Enter username' fullWidth='true' margin='10 px'></TextField>
          <TextField variant="filled" label='Password' required placeholder='Enter password'  type='password' fullWidth='true'></TextField>
          <FormControlLabel
          control={
            <Checkbox
              name="checkedB"
              color="primary"
            />
          }
          label="Remember me"
    />
    <Button type='submit' variant="contained" color="primary" fullWidth='true' style={buttonStyle}>Sign in</Button>
    <Typography>
      <Link href="#" >
     Forgot Password?
</Link>
    </Typography>
    <Typography> Do you have an account?
      <Link href="#" >
     Sign Up
</Link>
    </Typography>
           </Paper>
      </Grid>
    </div>
  )
}

export default Login
