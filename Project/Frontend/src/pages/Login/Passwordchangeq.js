import React from "react";
import { Paper, Grid, Avatar, TextField, Button } from "@mui/material";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
export const Passwordchangeq = ({handleChange2}) => {
 const paperStyle = {padding: 20, height: '70vh', width: 300, margin: "0 auto"};
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const buttonStyle = { margin: "8px 0" };
  return (
    <div>
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
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
            Submit
          </Button>
        </Paper>
      </Grid>
    </div>
  );
};

export default Passwordchangeq;
