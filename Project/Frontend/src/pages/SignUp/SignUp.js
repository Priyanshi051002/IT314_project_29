import React, { useState } from "react";
import { Paper, Grid, Avatar, TextField, Button } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import Alert from "@mui/material/Alert";
import { Typography, Box } from "@mui/material";

export const SignUp = () => {
  const navigate = useNavigate();

  const [passwordMatched, setPasswordMatched] = useState(true);
  const [userExist, setUserExist] = useState(false);
  const [profileCreated, setProfileCreated] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    username: "",
    password: "",
    birthplace: "",
    about: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordMatched(true);
    setUserExist(false);
    if (name === "username") {
      setUserExist(false);
    }
    setDetails((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const signUpHandler = async (e) => {
    e.preventDefault();

    if (details.password !== details.confirm_password) {
      setPasswordMatched(false);
      return;
    } else if (!details.birthplace.trim()) {
      alert("Please Enter correct BirthPlace");
      return;
    }
    const personalDetails = {
      name: details.name,
      username: details.username,
      password: details.password,
      birthplace: details.birthplace,
    };

    const profileDetails = {
      user: details.username,
      name: details.name,
      about: details.about,
      description: details.description,
    };
    try {
      const response1 = await fetch(
        `${process.env.REACT_APP_FINAL}/user/register`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          mode: "cors",
          body: JSON.stringify(personalDetails),
        }
      );
      const data1 = await response1.json();

      const response2 = await fetch(
        `http://localhost:5000/user/createProfile`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          mode: "cors",
          body: JSON.stringify(profileDetails),
        }
      );

      const data2 = await response2.json();

      if (!data1.success) {
        setUserExist(true);
      } else {
        if (data2.success) {
          setProfileCreated(true);
          navigate(0);
        }
        // alert("Something Wrong Please Try Again Later")
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const paperStyle = {
    padding: 20,
    height: "auto",
    width: "88%",
    margin: "0 auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const buttonStyle = { margin: "8px 0" };
  const boxStyle = {
    padding: "10px",
    border: "1px solid #ccc",
    marginBottom: "20px",
  };
  return (
    <div>
      <Grid>
        <form onSubmit={signUpHandler}>
          <Paper elevation={20} style={paperStyle}>
            <Grid align="center">
              <Grid item xs={12} sm={6} md={3}></Grid>
              {/* <Avatar style={avatarStyle}>
              <AddCircleOutlineOutlinedIcon />
            </Avatar> */}
              {/* <Box sx={boxStyle}> */}
              <Typography
                variant="h5"
                align="center"
                style={{ fontWeight: 600, marginBottom: 20 }}
              >
                Educational <span style={{ color: "blue" }}>App</span>
              </Typography>
              {/* </Box> */}
              <h3>Personal Details</h3>
              {!passwordMatched ? (
                <Alert severity="error" sx={{ margin: "1em" }}>
                  Password did not match!
                </Alert>
              ) : userExist ? (
                <Alert severity="error" sx={{ margin: "1em" }}>
                  User already exists!
                </Alert>
              ) : null}
              {profileCreated ? (
                <Alert severity="success" sx={{ margin: "1em" }}>
                  Profile Created! Go to SignIn...
                </Alert>
              ) : null}
            </Grid>
            <TextField
              variant="filled"
              label="Name"
              name="name"
              value={details.name}
              required
              placeholder="Enter your name"
              fullWidth
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
              fullWidth
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
              fullWidth
              onChange={handleChange}
            ></TextField>
            <TextField
              variant="filled"
              label="Confirm Password"
              required
              name="confirm_password"
              placeholder="Enter password"
              type="password"
              fullWidth
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
              fullWidth
              onChange={handleChange}
            ></TextField>
          </Paper>
          <Divider />
          <Paper elevation={20} style={paperStyle}>
            <Grid align="center">
              <Grid item xs={12} sm={6} md={3}></Grid>
              <h3>Profile Details</h3>
            </Grid>
            <TextField
              variant="filled"
              label="Enter about yourself"
              name="about"
              value={details.about}
              required
              multiline
              placeholder="Enter about yourself"
              type="text"
              fullWidth
              onChange={handleChange}
            ></TextField>
            <TextField
              variant="filled"
              label="Enter description"
              name="description"
              value={details.description}
              required
              placeholder="Enter description"
              type="text"
              fullWidth
              multiline
              onChange={handleChange}
            ></TextField>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={buttonStyle}
            >
              Sign Up
            </Button>
          </Paper>
        </form>
      </Grid>
    </div>
  );
};

export default SignUp;
