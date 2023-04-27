import React, { useState } from "react";
import {
  Paper,
  Grid,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import { Link, useNavigate } from "react-router-dom";

export const Forgotpassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState({
    username: localStorage.getItem("username"),
    password: "",
    confirmPass: "",
  });
  console.log(password);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password.password !== password.confirmPass) {
      alert("Password did not Match");
      return;
    }

    fetch(`${process.env.REACT_APP_FINAL}/user/updatepassword`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(password),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Password Changed Successfully");
          localStorage.removeItem('username');
          navigate("/signinout");
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
    height: "50vh",
    width: 300,
    margin: "2% 38%",
  };
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
            name="password"
            value={password.password}
            placeholder="Enter password"
            type="password"
            fullWidth
            onChange={handleChange}
          ></TextField>
          <TextField
            variant="filled"
            label="Confirm Password"
            name="confirmPass"
            value={password.confirmPass}
            required
            placeholder="Enter password"
            type="password"
            fullWidth
            onChange={handleChange}
          ></TextField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth="true"
            onClick={handlePasswordSubmit}
            style={buttonStyle}
          >
            Change Password
          </Button>
        </Paper>
      </Grid>
    </div>
  );
};

export default Forgotpassword;
