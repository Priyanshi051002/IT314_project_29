import React,{useState} from "react";
import {
  Avatar,
  Button,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Checkbox from "@mui/material/Checkbox";
import { Link, redirect } from "react-router-dom";

const Login = ({ handleChange }) => {

  const [details, setDetails] = useState({
    username: "",
    password: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setDetails((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSignin = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(details),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.success){
          return redirect("/");
        }
        else{
          return null;
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 300,
    margin: "0 auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const buttonStyle = { margin: "8px 0" };
  return (
    <div>
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Sign in</h2>
          </Grid>
          <form onSubmit={handleSignin}>
            <TextField
              variant="filled"
              label="Username"
              name="username"
              value={details.username}
              required
              onChange={changeHandler}
              placeholder="Enter username"
              fullWidth="true"
              margin="10 px"
            ></TextField>
            <TextField
              variant="filled"
              label="Password"
              name="password"
              value={details.password}
              required
              placeholder="Enter password"
              type="password"
              onChange={changeHandler}
              fullWidth="true"
            ></TextField>
            <FormControlLabel
              control={<Checkbox name="checkedB" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth="true"
              style={buttonStyle}
            >
              Sign in
            </Button>
          </form>
          <Typography>
            <Link to="/pc">Forgot Password?</Link>
          </Typography>
          <Typography>
            {" "}
            Do you have an account?
            <Link href="#" onClick={() => handleChange("event", 1)}>
              Sign Up
            </Link>
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
};

export default Login;
