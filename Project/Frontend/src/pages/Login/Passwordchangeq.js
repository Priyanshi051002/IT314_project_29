import React, { useState } from "react";
import { Paper, Grid, Avatar, TextField, Button } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Link, useNavigate } from "react-router-dom";

export const Passwordchangeq = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    username: "",
    birthplace: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_FINAL}/user/forget`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(details),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("username", details.username);
          navigate("/fp");
        } else {
          alert(data.error);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const paperStyle = {
    padding: 20,
    height: "auto",
    width: "20%",
    margin: "2% 38%",
  };
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
          <TextField
            variant="filled"
            label="Username"
            name="username"
            value={details.username}
            required
            placeholder="Enter username"
            fullWidth
            onChange={handleChange}
          ></TextField>
          <TextField
            variant="filled"
            label="What is your birth place?"
            value={details.birthplace}
            name="birthplace"
            placeholder="Enter place of birth"
            type="text"
            fullWidth
            onChange={handleChange}
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
            fullWidth
            style={buttonStyle}
            onClick={handlePasswordSubmit}
          >
            Submit
          </Button>
        </Paper>
      </Grid>
    </div>
  );
};

export default Passwordchangeq;
