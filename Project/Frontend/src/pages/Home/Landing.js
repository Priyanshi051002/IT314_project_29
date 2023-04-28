import React from "react";
import { Button, CardMedia, Grid, Typography, Box } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import image1 from "../../data/345.png";
import { useNavigate } from "react-router-dom";
const Landing = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/signinout");
  };

  return (
    <div>
      <Box>
        <Grid container spacing={1} alignItems={"center"} sx={{ mt: 2 }}>
          <Grid item xs={1} md={2}></Grid>
          <Grid item xs={10} md={3} justifyContent={"center"} sx={{textAlign:"center"}}>
            <SchoolIcon
              sx={{ mr: 2, color: "#1976d2", width: 50, height: 50 }}
            />
            <Typography
              component="a"
              href="/"
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                fontSize: 50,
                color: "#1976d2",
                textDecoration: "none",
              }}
            >
              DA-SH
            </Typography>
          </Grid>
          <Grid item xs={0} md={3}></Grid>
          <Grid item xs={6} md={1} sx={{textAlign:"right"}}>
            {localStorage.getItem("token") == null && (
              <Button variant="outlined" onClick={handleClick}>
                Sign up
              </Button>
            )}
          </Grid>
          <Grid item xs={6} md={1} sx={{textAlign:"center"}}>
            {localStorage.getItem("token") == null && (
              <Button color="primary" variant="contained" onClick={handleClick}>
                Sign in
              </Button>
            )}
          </Grid>
          <Grid item xs={0} md={2}></Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 4.5 }}>
        <Grid container spacing={1}>
          <Grid item xs={1} md={2}></Grid>
          <Grid item xs={11} md={3}>
            <Typography
              component="text"
              sx={{
                mr: 2,
                mb: 2,
                display: "flex",
                fontFamily: "",
                fontWeight: 500,
                fontSize: "7vmin",
                color: "#210062",
                textDecoration: "none",
              }}
            >
              Welcome to your professional community!
            </Typography>
            <Typography
              component="text"
              sx={{
                mr: 2,
                mb: 2,
                display: "flex",
                fontFamily: "",
                fontWeight: 500,
                fontSize: "5vmin",
                color: "#394867",
                textDecoration: "none",
              }}
            >
              Share your ideas here.
            </Typography>
            {localStorage.getItem("token") == null ? (
              <Button variant="contained" sx={{ mr: 2 }}>
                <Typography
                  component="text"
                  sx={{
                    fontFamily: "",
                    fontWeight: 500,
                    fontSize: 15,
                    color: "#ffffff",
                    textDecoration: "none",
                  }}
                  onClick={() => navigate("/signinout")}
                >
                  Get Started.
                </Typography>
              </Button>
            ) : (
              <Button variant="contained" sx={{ mr: 2 }}>
                <Typography
                  component="text"
                  sx={{
                    fontFamily: "",
                    fontWeight: 500,
                    fontSize: 15,
                    color: "#ffffff",
                    textDecoration: "none",
                  }}
                  onClick={() => navigate("/feed")}
                >
                  Get Started.
                </Typography>
              </Button>
            )}
          </Grid>

          <Grid item xs={1} md={0}></Grid>
          <Grid item xs={11} md={5}>
            <CardMedia
              component="img"
              src={image1}
              sx={{
                width: "90vmin",
                height: "90vmin",
                borderRadius: "50%",
              }}
            ></CardMedia>
          </Grid>
          <Grid item xs={1} md={2}></Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Landing;
