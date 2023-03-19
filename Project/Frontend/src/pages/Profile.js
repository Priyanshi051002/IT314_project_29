import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
  Grid,
} from "@mui/material";

const posts = (
  <React.Fragment>
    <Card variant="outlined">
      <CardMedia
        component="img"
        alt="green iguana"
        height="200"
        image="https://source.unsplash.com/random"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica. Lizards are
          a widespread group of squamate reptiles, with over 6,000 species,
          ranging across all continents except Antarctica.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="outlined">
          Share
        </Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  </React.Fragment>
);

const postCard = (
  <React.Fragment>
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          My Posts
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            {posts}
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            {posts}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button variant="contained" fullWidth color="success">
          Show all Posts
        </Button>
      </CardActions>
    </Card>
  </React.Fragment>
);

const profileCard = (
  <React.Fragment>
    <Card>
      <CardMedia
        component="img"
        height="200"
        image="https://source.unsplash.com/random"
      ></CardMedia>

      <Grid container>
        <Grid item xs={12} sm={4} md={4} px={6} py={3}>
          <CardMedia
            component="img"
            height="200"
            image="https://source.unsplash.com/random"
            sx={{ borderRadius: "50%" }}
          ></CardMedia>
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          <CardContent>
            <Grid container>
              <Grid item xs={8} sm={8} md={8}>
                <Typography variant="h4" component="div" gutterBottom>
                  Virat Kohli
                </Typography>
              </Grid>
              <Grid item xs={2} sm={2} md={2}>
                <Typography variant="h6" component="div" gutterBottom>
                  100 
                </Typography>
              </Grid>
              <Grid item xs={2} sm={2} md={2}>
                <Typography variant="h6" component="div" gutterBottom>
                  100
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="body2" height={80} gutterBottom>
              Virat Kohli is an Indian international cricketer and former
              captain of the Indian national team who plays as a right-handed
              batsman for Royal Challengers Bangalore in the IPL and for Delhi
              in Indian domestic cricket.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" variant="contained">
              Edit Profile
            </Button>
            <Button size="small" variant="contained">
              Share Profile
            </Button>
            <Button size="small" variant="contained">
              Add Post
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  </React.Fragment>
);

const Profile = () => {
  return (
    <>
      <Grid
        container
        xs={12}
        sm={10}
        md={8}
        rowSpacing={2}
        sx={{ margin: "auto" }}
      >
        <Grid item>{profileCard}</Grid>
        <Grid item>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                About
              </Typography>
              <Typography variant="body2" gutterBottom>
                Virat Kohli is an Indian international cricketer and former
                captain of the Indian national team who plays as a right-handed
                batsman for Royal Challengers Bangalore in the IPL and for Delhi
                in Indian domestic cricket.Virat Kohli is an Indian
                international cricketer and former captain of the Indian
                national team who plays as a right-handed batsman for Royal
                Challengers Bangalore in the IPL and for Delhi in Indian
                domestic cricket.Virat Kohli is an Indian international
                cricketer and former captain of the Indian national team who
                plays as a right-handed batsman for Royal Challengers Bangalore
                in the IPL and for Delhi in Indian domestic cricket.Virat Kohli
                is an Indian international cricketer and former captain of the
                Indian national team who plays as a right-handed batsman for
                Royal Challengers Bangalore in the IPL and for Delhi in Indian
                domestic cricket.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>{postCard}</Grid>
      </Grid>
    </>
  );
};

export default Profile;
