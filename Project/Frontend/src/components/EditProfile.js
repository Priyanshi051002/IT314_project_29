import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Grid, Typography, CardMedia } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const EditProfile = ({ profile }) => {

    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState(profile.name);
    const [description, setDescription] = React.useState(profile.description);
    const [about, setAbout] = React.useState(profile.about);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen} size="small" >
                Edit Profile
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    <Typography align="center" bgcolor="#1976d2" color="#FFFFFF" minHeight={40}
                        sx={{
                            fontFamily: "monospace",
                            fontWeight: 700,
                            fontSize: 30,
                            borderRadius: 2,
                        }}>
                        Edit Profile</Typography>
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
                                        id="name"
                                        value={name}
                                        label="Name"
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        onChange={(event) => {
                                            setName(event.target.value);
                                        }}
                                    />
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="email"
                                        label="Email Address"
                                        type="email"
                                        defaultValue={'temp@gmail.com'}
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
                        value={description}
                        type="text"
                        variant="filled"
                        fullWidth
                        multiline
                        minRows={4}
                        onChange={(event) => {
                            setDescription(event.target.value);
                        }}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="about"
                        label="About"
                        value={about}
                        type="text"
                        variant="filled"
                        fullWidth
                        multiline
                        minRows={4}
                        onChange={(event) => {
                            setAbout(event.target.value);
                        }}

                    />



                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose} variant="contained">Edit</Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}

export default EditProfile;