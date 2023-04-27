import React from "react";
import { Paper, Grid, Avatar, TextField, Button,Typography } from "@mui/material";
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { Link } from 'react-router-dom';

export const Forgotpassword = () => {
 const paperStyle = {padding: 20, height: '50vh', width: 300, margin: "2% 38%",};
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const buttonStyle = { margin: "10px 0" };
  return (
    <div>
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <Grid item xs={12} sm={6} md={3}></Grid>
            <Avatar style={avatarStyle}>
              <VpnKeyOutlinedIcon />
            </Avatar>
            <h2>Enter New Password</h2>
          </Grid>
          
          <TextField
            variant="filled"
            label="Password"
            required
            placeholder="Enter password"
            type="password"
            fullWidth="true"
          ></TextField>
          <TextField
            variant="filled"
            label="Confirm Password"
            required
            placeholder="Enter password"
            type="password"
            fullWidth="true"
          ></TextField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth="true"
            style={buttonStyle}
          >
            <Link to="/signinout" style={{color:'white',textDecoration:'none'}}> Change Password</Link>
           
          </Button>
        </Paper>
      </Grid>
    </div>
  );
};

export default Forgotpassword;

