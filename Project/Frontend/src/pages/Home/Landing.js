import React from 'react';
import { Button, CardMedia, Grid, Typography, Box } from '@mui/material';
import SchoolIcon from "@mui/icons-material/School";
import image1 from "../../data/345.png";


const Landing = () => {
    return (
        <div>
            <Box>
                <Grid container spacing={1} alignItems={'center'} sx={{ mt: 2 }}>
                    <Grid item xs = {2} md={2}></Grid>
                    <Grid item xs = {8} md={3} justifyContent={'center'}>
                        <SchoolIcon sx={{ mr: 2, color: "white", width: 50, height: 50 }} />
                        <Typography
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                fontFamily: "monospace",
                                fontWeight: 700,
                                fontSize: 50,
                                color: "#ffffff",
                                textDecoration: "none"
                            }}
                        >
                            DA-SH
                        </Typography>
                    </Grid>
                    <Grid item xs = {2} md={3}></Grid>
                    <Grid item xs = {5} md={1}>
                        <Button variant='outlined' sx={{ mr: 2 }}>Sign up</Button>
                    </Grid>
                    <Grid item xs = {5} md={1}>
                        <Button color='primary' variant='contained'>Sign in</Button>
                    </Grid>
                    <Grid item xs = {1} md={2}></Grid>
                </Grid>
            </Box>
            <Box sx={{mt : 10}}>
            <Grid container spacing={1} sx={{ mt: 2 }}>
                    <Grid item xs = {2} md={2}></Grid>
                    <Grid item xs = {4} md={4}>
                        <Typography
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                mb: 2,
                                display: "flex",
                                fontFamily: "",
                                fontWeight: 500,
                                fontSize: 60,
                                color: "#ffffff",
                                textDecoration: "none"
                            }}
                        >
                        Welcome to your professional community!
                        </Typography>
                        <Typography
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                mb: 2,
                                display: "flex",
                                fontFamily: "",
                                fontWeight: 500,
                                fontSize: 30,
                                color: "#ffffff",
                                textDecoration: "none"
                            }}
                        >
                        Share your ideas here.
                        </Typography>
                        <Button variant='contained' sx={{ mr: 2 }}>
                            <Typography
                            component="a"
                            href="/"
                            sx={{
                                fontFamily: "",
                                fontWeight: 500,
                                fontSize: 15,
                                color: "#ffffff",
                                textDecoration: "none"
                            }}
                        >
                            Get Started.
                        </Typography>
                        </Button>
                    </Grid>
                            
                    <Grid item xs = {12} md={4}>
                    <CardMedia
                                component="img"
                                src={image1}
                                sx={{
                                    width: "500px",
                                    height: "500px",
                                    borderRadius: "50%",
                                }}
                            ></CardMedia>
                    </Grid>
                    <Grid item xs = {2} md={2}></Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default Landing;