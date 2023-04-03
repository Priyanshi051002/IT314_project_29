import React from "react";
import { Paper, Grid, Avatar, TextField, Button } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

export const SignUp = () => {
 const paperStyle = {padding: 20, height: '70vh', width: 300, margin: "0 auto"};
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const buttonStyle = { margin: "8px 0" };
  return (
    <div>
      <Grid>
        <Paper style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <AddCircleOutlineOutlinedIcon />
            </Avatar>
            <h2>Sign Up</h2>
          </Grid>
          <TextField
            variant="filled"
            label="Username"
            required
            placeholder="Enter username"
            fullWidth="true"
            margin="10 px"
          ></TextField>
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
            Sign in
          </Button>
        </Paper>
      </Grid>
    </div>
  );
};

export default SignUp;
