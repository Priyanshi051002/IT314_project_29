import React, { useState } from "react";
import { Paper, Grid, Avatar, TextField, Button } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useNavigate } from "react-router-dom";

import Alert from "@mui/material/Alert";

export const SignUp = () => {
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    name: "",
    username: "",
    password: "",
    confirm_password: "",
    birthplace: "",
  });

  const [isPasswordMatched, setIsPasswordMatched] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const signUpHandler = (e) => {
    e.preventDefault();

    if (details.password !== details.confirm_password) {
      setIsPasswordMatched(false);
    } else {
      fetch(`http://localhost:5000/user/register`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(details),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            return navigate("/login");
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
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
        <Paper style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <AddCircleOutlineOutlinedIcon />
            </Avatar>
            <h2>Sign Up</h2>
            {!isPasswordMatched ? (
              <Alert severity="error" sx={{ margin: "1em" }}>
                Password did not match!
              </Alert>
            ) : null}
          </Grid>
          <form onSubmit={signUpHandler}>
            <TextField
              variant="filled"
              label="Name"
              name="name"
              value={details.name}
              required
              placeholder="Enter your name"
              fullWidth="true"
              onChange={handleChange}
            ></TextField>
            <TextField
              variant="filled"
              label="Username"
              name="username"
              type="email"
              value={details.username}
              required
              placeholder="Enter username"
              fullWidth="true"
              onChange={handleChange}
            ></TextField>
            <TextField
              variant="filled"
              label="Password"
              required
              name="password"
              value={details.password}
              placeholder="Enter password"
              type="password"
              fullWidth="true"
              onChange={handleChange}
            ></TextField>
            <TextField
              variant="filled"
              label="Confirm Password"
              name="confirm_password"
              value={details.confirm_password}
              required
              placeholder="Enter password"
              type="password"
              fullWidth="true"
              onChange={handleChange}
            ></TextField>
            <TextField
              variant="filled"
              label="Enter your birth place for Password Recovery"
              name="birthplace"
              value={details.birthplace}
              required
              placeholder="Enter your birth place"
              type="text"
              fullWidth="true"
              onChange={handleChange}
            ></TextField>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth="true"
              style={buttonStyle}
            >
              Sign up
            </Button>
          </form>
        </Paper>
      </Grid>
    </div>
  );
};

export default SignUp;
