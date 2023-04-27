import React from "react";
import { Paper, Grid, Avatar, TextField, Button } from "@mui/material";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { Link } from 'react-router-dom';

export const Passwordchangeq = () => {
 const paperStyle = { padding: 20,
    height: "auto",
    width: "20%",
    margin: "2% 38%",};
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const buttonStyle = { margin: "8px 0" };
  return (
    <div>
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <Grid item xs={12} sm={6} md={3}></Grid>
            <Avatar style={avatarStyle}>
              <HomeOutlinedIcon />
            </Avatar>
            <h2>Answer this Question</h2>
          </Grid>
          {/* <TextField
            variant="filled"
            label="Username"
            required
            placeholder="Enter username"
            fullWidth="true"
            margin="10 px"
          ></TextField> */}
          <TextField
            variant="filled"
            label="What is your birth place?"
            required
            placeholder="Enter place of birth"
            type="text"
            fullWidth="true"
          ></TextField>
          {/* <TextField
            variant="filled"
            label="Confirm Password"
            required
            placeholder="Enter password"
            type="password"
            fullWidth="true"
          ></TextField> */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth="true"
            style={buttonStyle}
          >
            <Link to="/fp" style={{ textDecoration: 'none' , color:'white'}}>Submit</Link>
            
          </Button>
        </Paper>
      </Grid>
    </div>
  );
};

export default Passwordchangeq;
