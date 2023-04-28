import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Grid, Typography, CardMedia } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router";

const EditProfile = ({ profile }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  //   const [name, setName] = React.useState(profile.user.name);
  //   const [description, setDescription] = React.useState(profile.description);
  //   const [about, setAbout] = React.useState(profile.about);
  const [details, setDetails] = useState({
    name: profile.user.name,
    about: profile.about,
    description: profile.description,
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
  const handleEdit = () => {
    // console.log(details);
    const token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_FINAL}/user/editProfile`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(details),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate(0);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} size="small">
        Edit Profile
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography
            align="center"
            bgcolor="#1976d2"
            color="#FFFFFF"
            minHeight={40}
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              fontSize: 30,
              borderRadius: 2,
            }}
          >
            Edit Profile
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={6} md={6}>
              <CardMedia
                component="img"
                src="https://picsum.photos/1000/1000"
                sx={{
                  margin: "auto",
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  maxWidth: "100%",
                }}
              ></CardMedia>
            </Grid>
            <Grid item xs={6} md={6}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    id="name"
                    value={details.name}
                    label="Name"
                    type="text"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email Address"
                    type="email"
                    defaultValue={profile.user.username}
                    variant="outlined"
                    fullWidth
                    inputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <TextField
            autoFocus
            margin="dense"
            id="desc"
            label="Description"
            value={details.description}
            name="description"
            type="text"
            variant="filled"
            fullWidth
            multiline
            minRows={4}
            onChange={handleChange}
          />
          <Typography>Word Count:{details.description.length}/100</Typography>

          <TextField
            autoFocus
            margin="dense"
            id="about"
            label="About"
            value={details.about}
            name="about"
            type="text"
            variant="filled"
            fullWidth
            multiline
            minRows={4}
            onChange={handleChange}
          />
          <Typography>Word Count:{details.about.length}/500</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleEdit();
              handleClose();
            }}
            variant="contained"
            type="submit"
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditProfile;
