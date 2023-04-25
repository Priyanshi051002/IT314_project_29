import React from "react";
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
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import PostCards from "../../components/PostCards";
import PersonIcon from "@mui/icons-material/Person";
import EditProfile from "../../components/EditProfile";

const posts = [
  {
    title: "Om",
    source: "https://picsum.photos/1000/1000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
    user_id: "",
    comments: [],
    post_id: "",
    likes: [],
  },
  {
    title: "Harsh",
    source: "https://picsum.photos/1000/1000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
    user_id: "",
    comments: [],
    post_id: "",
    likes: [],
  },
  {
    title: "Priyanshi",
    source: "https://picsum.photos/1000/1000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
    user_id: "",
    comments: [],
    post_id: "",
    likes: [],
  },
  {
    title: "Kaushal",
    source: "https://picsum.photos/1000/1000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
    user_id: "",
    comments: [],
    post_id: "",
    likes: [],
  },
  {
    title: "Devdeep",
    source: "https://picsum.photos/1000/1000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
    user_id: "",
    comments: [],
    post_id: "",
    likes: [],
  },
  {
    title: "Achyut",
    source: "https://picsum.photos/1000/1000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
    user_id: "",
    comments: [],
    post_id: "",
    likes: [],
  },
];

const PROFILE_DATA = {
  name: "Virat Kohli",
  prf_image: "https://picsum.photos/1000/1000",
  bg_image: "https://picsum.photos/1000/1000",
  description: `Virat Kohli is an Indian international cricketer and former captain of the Indian national team who plays as a right-handed batsman for Royal Challengers Bangalore in the IPL and for Delhi in Indian domestic cricket.`,
  about: `Virat Kohli is an Indian international cricketer and former
  captain of the Indian national team who plays as a right-handed batsman for Royal Challengers Bangalore in the
  IPL and for Delhi in Indian domestic cricket.Virat Kohli is an Indian international cricketer and former captain of the
  Indian national team who plays as a right-handed batsman for Royal Challengers Bangalore in the IPL and for Delhi in
  Indian domestic cricket.Virat Kohli is an Indian international cricketer and former captain of the Indian national team who plays as a right-handed batsman for Royal Challengers Bangalore in the IPL and for Delhi in Indian domestic cricket.Virat Kohli is an Indian international cricketer and former captain of the Indian national team who plays as a right-handed batsman for Royal Challengers Bangalore in the IPL and for Delhi in Indian domestic cricket.`,
};

const postCard = (
  <React.Fragment>
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          My Posts
        </Typography>
        <Grid container spacing={2}>
          {posts.slice(0, 2).map((post) => (
            <Grid item xs={12} sm={6} md={6}>
              <PostCards item={post} />
            </Grid>
          ))}
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          component={Link}
          to="/myposts"
          fullWidth
          color="success"
        >
          Show All Posts
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
        height="250"
        image={PROFILE_DATA.bg_image}
      ></CardMedia>

      <Grid container>
        <Grid item xs={12} sm={5} md={4} py={3}>
          <CardMedia
            component="img"
            image={PROFILE_DATA.prf_image}
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
                  {PROFILE_DATA.name}
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
            <Typography variant="body2" height={80} gutterBottom>
              {PROFILE_DATA.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing={true}>
            <Grid container>
              <Grid item xs={2} md={3}>
                <EditProfile profile={PROFILE_DATA} />
              </Grid>

              <Grid item xs={2} md={3}>
                <Button
                  size="small"
                  variant="contained"
                  component={Link}
                  to={"/profile/addpost"}
                  style={{ maxWidth: '500px', maxHeight: '30px', minWidth: '30px', minHeight: '20px' }}
                >
                  Share Profile
                </Button>
              </Grid>

              <Button
                size="small"
                variant="contained"
                component={Link}
                to={"/profile/addpost"}
                style={{ maxWidth: '300px', maxHeight: '100px', minWidth: '30px', minHeight: '30px' }}
              >
                Add Post
              </Button>
            </Grid>



          </CardActions>
        </Grid>
      </Grid>
    </Card>
  </React.Fragment>
);

const Profile = () => {
  return (
    <>
      <Container maxWidth="lg">
        <Box>
          <Navbar />
          <Grid container xs={12} sm={12} md={12} rowSpacing={2}>
            <Grid item>{profileCard}</Grid>
            <Grid item>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    About
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {PROFILE_DATA.about}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>{postCard}</Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Profile;
