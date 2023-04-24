import { React, useEffect, useState } from "react";
import {
  CardMedia,
  Card,
  CardContent,
  Typography,
  CardActions,
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
    source: "https://picsum.photos/1000/1000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Harsh",
    source: "https://picsum.photos/1000/1000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Priyanshi",
    source: "https://picsum.photos/1000/1000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Kaushal",
    source: "https://picsum.photos/1000/1000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Devdeep",
    source: "https://picsum.photos/1000/1000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Achyut",
    source: "https://picsum.photos/1000/1000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Katrina",
    source: "https://picsum.photos/1000/1000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Kathan",
    source: "https://picsum.photos/1000/1000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Krish",
    source: "https://picsum.photos/1000/1000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Sanjay",
    source: "https://picsum.photos/1000/1000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Ram",
    source: "https://picsum.photos/1000/1000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Zeel",
    source: "https://picsum.photos/1000/1000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Devdeep",
    source: "https://picsum.photos/1000/1000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Achyut",
    source: "https://picsum.photos/1000/1000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Katrina",
    source: "https://picsum.photos/1000/1000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Kathan",
    source: "https://picsum.photos/1000/1000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Krish",
    source: "https://picsum.photos/1000/1000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Sanjay",
    source: "https://picsum.photos/1000/1000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Ram",
    source: "https://picsum.photos/1000/1000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
  {
    name: "Zeel",
    source: "https://picsum.photos/1000/1000",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
  },
];

const Connect = () => {
  // const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(12);

  //   useEffect(() => {
  //     fetch("https://jsonplaceholder.typicode.com/posts")
  //       .then((res) => res.json())
  //       .then((data) => setUsers(data));
  //   }, []);

  const ShowMoreItems = () => {
    setVisible((prevValue) => prevValue + 4);
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
            mt={2}
          >
            Connect With Others
          </Typography>
          <Divider />
          <Grid container rowSpacing={3} columnSpacing={4} mt ={0.5} mb = {2}>
            {users.slice(0, visible).map((user) => (
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
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ borderRadius: "16px" }}
                      fullWidth
                      color="info"
                      variant="outlined"
                    >
                      Connect
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box mt={2} mb={2}>
            <Button
              size="large"
              color="success"
              fullWidth
              onClick={ShowMoreItems}
            >
              Load more
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Connect;
