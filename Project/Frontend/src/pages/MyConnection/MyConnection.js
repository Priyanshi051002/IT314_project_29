import { React, useEffect, useState } from "react";
import {
  CardMedia,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Container,
  Box,
  Divider,
} from "@mui/material";

// import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const users = [
  {
    name: "Om",
    source: "https://source.unsplash.com/random",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Harsh",
    source: "https://source.unsplash.com/random",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Priyanshi",
    source: "https://source.unsplash.com/random",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Kaushal",
    source: "https://source.unsplash.com/random",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Devdeep",
    source: "https://source.unsplash.com/random",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Achyut",
    source: "https://source.unsplash.com/random",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Katrina",
    source: "https://source.unsplash.com/random",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Kathan",
    source: "https://source.unsplash.com/random",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Krish",
    source: "https://source.unsplash.com/random",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Sanjay",
    source: "https://source.unsplash.com/random",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Ram",
    source: "https://source.unsplash.com/random",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Zeel",
    source: "https://source.unsplash.com/random",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Devdeep",
    source: "https://source.unsplash.com/random",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Achyut",
    source: "https://source.unsplash.com/random",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Katrina",
    source: "https://source.unsplash.com/random",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Kathan",
    source: "https://source.unsplash.com/random",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Krish",
    source: "https://source.unsplash.com/random",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Sanjay",
    source: "https://source.unsplash.com/random",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Ram",
    source: "https://source.unsplash.com/random",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Zeel",
    source: "https://source.unsplash.com/random",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
];

const MyConnection = () => {
  // const [users, setUsers] = useState([]);
  const [follower, setFollower] = useState(8);
  const [following, setFollowing] = useState(8);

  //   useEffect(() => {
  //     fetch("https://jsonplaceholder.typicode.com/posts")
  //       .then((res) => res.json())
  //       .then((data) => setUsers(data));
  //   }, []);

  const ShowMoreFollower = () => {
    setFollower((prevValue) => prevValue + 4);
  };
  const ShowMoreFollowing = () => {
    setFollowing((prevValue) => prevValue + 4);
  };

  return (
    <>
      <Container maxWidth="lg">
        <Box>
          <Navbar />
          <Typography
            variant="h4"
            textAlign={"center"}
            component="div"
            gutterBottom
          >
            Followers
          </Typography>
          <Divider />
          <Grid container rowSpacing={3} columnSpacing={4} mt={0.5} mb={2}>
            {users.slice(0, follower).map((user) => (
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="125"
                    image={user.source}
                  />
                  <CardContent>
                    <Typography variant="h5" textAlign={"left"} component="div">
                      {user.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box mt={2} mb={2}>
            <Button
              size="large"
              color="success"
              fullWidth
              onClick={ShowMoreFollower}
            >
              Load more
            </Button>
          </Box>
          <Typography
            variant="h4"
            textAlign={"center"}
            component="div"
            gutterBottom
          >
            Following
          </Typography>
          <Divider />

          <Grid container rowSpacing={3} columnSpacing={4} mt={0.5} mb={2}>
            {users.slice(0, following).map((user) => (
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="125"
                    image={user.source}
                  />
                  <CardContent>
                    <Typography variant="h5" textAlign={"left"} component="div">
                      {user.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box mt={2} mb={2}>
            <Button
              size="large"
              color="success"
              fullWidth
              onClick={ShowMoreFollowing}
            >
              Load more
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default MyConnection;
