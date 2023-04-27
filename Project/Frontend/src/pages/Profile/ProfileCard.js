import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
  Grid,
  Container,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ImageUrl from "../../static";
import PersonIcon from "@mui/icons-material/Person";
import EditProfile from "../../components/EditProfile";

const ProfileCard = ({ profileData }) => {
  const navigate = useNavigate();

  const prof = profileData;
  console.log(prof);
  return (
    <>
      <Card>
        <CardMedia component="img" height="250" image={ImageUrl}></CardMedia>

        <Grid container>
          <Grid item xs={12} sm={5} md={4} py={3}>
            <CardMedia
              component="img"
              image={ImageUrl}
              sx={{
                margin: "auto",
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                maxWidth: "100%",
              }}
            ></CardMedia>
          </Grid>
          <Grid item xs={12} sm={7} md={8}>
            <CardContent>
              <Grid container>
                <Grid item xs={8} sm={8} md={8}>
                  <Typography variant="h4" component="div" gutterBottom>
                    {prof.user.name}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  sm={2}
                  md={2}
                  sx={{
                    textAlign: "center",
                    textDecoration: "none",
                    activeStyle: { color: "red" },
                    color: "black",
                  }}
                  component={Link}
                  to={"/myconnection"}
                >
                  <PersonIcon fontSize="large" />
                  <Typography variant="body2" component="div" gutterBottom>
                    Followers
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  sm={2}
                  md={2}
                  sx={{
                    textAlign: "center",
                    textDecoration: "none",
                    activeStyle: { color: "red" },
                    color: "black",
                  }}
                  component={Link}
                  to={"/myconnection"}
                >
                  <PersonIcon fontSize="large" />
                  <Typography variant="body2" component="div" gutterBottom>
                    Following
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" height={80} gutterBottom>
                  {profileData.description}
                </Typography>
              </Grid>
            </CardContent>
            <CardActions disableSpacing={true}>
              <Grid container>
                <Grid item xs={6} md={3}>
                  <EditProfile profile={prof} />
                </Grid>
                <Grid item xs={6} md={9}>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={(e) => {
                      navigate("/profile/addPost");
                    }}
                    style={{
                      maxWidth: "300px",
                      maxHeight: "100px",
                      minWidth: "30px",
                      minHeight: "30px",
                    }}
                  >
                    Add Post
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default ProfileCard;
