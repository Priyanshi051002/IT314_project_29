import React, { useState } from "react";
import { Paper, Grid, Avatar, TextField, Button } from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useNavigate } from "react-router-dom";
import {Divider} from "@mui/material"
import Alert from "@mui/material/Alert";
import { Typography,Box } from "@mui/material";

export const SignUp = () => {
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    name: "",
    username: "",
    password: "",
    confirm_password: "",
    birthplace: "",
    about: "",
    desc: "",
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
    height: "auto",
    width: "88%",
    margin: "0 auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const buttonStyle = { margin: "8px 0" };
   const boxStyle = { padding: "10px", border: "1px solid #ccc", marginBottom: "20px",};
  return (
    <div>
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
          <Grid item xs={12} sm={6} md={3}></Grid>
            {/* <Avatar style={avatarStyle}>
              <AddCircleOutlineOutlinedIcon />
            </Avatar> */}
            {/* <Box sx={boxStyle}> */}
            <Typography variant="h5" align="center" style={{ fontWeight: 600, marginBottom: 20 }}>Educational <span style={{ color: "blue" }}>App</span></Typography>
            {/* </Box> */}
            <h3>Personal Details</h3>
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
            </form>
            </Paper>
             <Divider/>
            <Paper elevation={20} style={paperStyle}>
            
             <form>
              <Grid align='center'>
              <Grid item xs={12} sm={6} md={3}></Grid>
               <h3>Profile Details</h3>
               </Grid>
            <TextField
              variant="filled"
              label="Enter about yourself"
              name="about"
              value={details.about}
              required
              placeholder="Enter about yourself"
              type="text"
              fullWidth="true"
              onChange={handleChange}
            ></TextField>
            <TextField
              variant="filled"
              label="Enter description"
              name="name"
              value={details.desc}
              required
              placeholder="Enter description"
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
