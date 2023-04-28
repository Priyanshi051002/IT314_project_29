import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  Divider,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Link, useNavigate } from "react-router-dom";
import ImageUrl from "../../static";
import Navbar from "../../components/Navbar";
import PostCards from "../../components/PostCards";
import CircularProgress from "@mui/material/CircularProgress";

let user_id = "";
const UserProfile = () => {
  const navigate = useNavigate();
  const [prof, setProf] = useState({});
  const [posts, setPosts] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const response1 = await fetch(
          `${process.env.REACT_APP_FINAL}/user/getProfile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data1 = await response1.json();
        console.log(data1.data);
        user_id = data1.data.user.username;
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
    fetch(
      `${process.env.REACT_APP_FINAL}/user/getProfileOfUser?profile=${id}`,
      {
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProf(data.data);
        fetch(`${process.env.REACT_APP_FINAL}/post/getPostsUser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: id }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setPosts(data);
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

  const handleFollow = (username) => {
    // console.log("Follow");
    fetch(`${process.env.REACT_APP_FINAL}/user/follow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ username: username }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.success) {
          alert(
            "Followed. Navigate to Following and Followers Page to see the results"
          );
        } else {
          alert(
            "Unfollowed. Navigate to Following and Followers Page to see the results"
          );
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container maxWidth="lg">
      <Navbar />
      <Card>
        <CardMedia component="img" height="250" image={ImageUrl}></CardMedia>
        <Grid container>
          <Grid item xs={12} sm={5} md={4} py={3}>
            <CardMedia
              component="img"
              image="https://marketplace.canva.com/EAFEits4-uw/1/0/800w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-r0bPCSjUqg0.jpg"
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
              <Grid container spacing={1}>
                <Grid item xs={6} sm={8} md={8}>
                  <Typography variant="h4" component="div" gutterBottom>
                    {prof.user ? prof.user.name : <CircularProgress />}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={3}
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
                  xs={3}
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
                <Typography variant="h6" gutterBottom>
                  {prof.user ? prof.description : <CircularProgress />}
                </Typography>
              </Grid>
            </CardContent>
            <CardActions disableSpacing={true}>
              <Grid container spacing={1}>
                <Grid item xs={6} md={4} sx={{ textAlign: "left" }}>
                  {/* <Button
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
                  </Button> */}
                  <Button
                    size="small"
                    sx={{ borderRadius: "16px" }}
                    fullWidth
                    color="info"
                    variant="outlined"
                    onClick={() => handleFollow(prof.user.username)}
                  >
                    Connect
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
      <Card component={Grid} sx={{ my: "1em" }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            About
          </Typography>
          <Typography variant="body2" gutterBottom>
            {prof.about}
          </Typography>
        </CardContent>
      </Card>

      <Box>
        <Typography
          variant="h4"
          textAlign={"center"}
          component="div"
          gutterBottom
          mt={2}
        >
          {prof.user && prof.user.name + "'s Posts"}
        </Typography>
        <Divider />
        {posts ? (
          <Grid container rowSpacing={3} columnSpacing={4} mt={0.5} mb={2}>
            {posts.map((post) => (
              <Grid item xs={12} sm={6} md={6}>
                <PostCards
                  key={post.post_id}
                  item={post}
                  comments={post.comments}
                  user={user_id}
                />
              </Grid>
            ))}
          </Grid>
        ) : <CircularProgress />}
      </Box>
    </Container>
  );
};

export default UserProfile;
