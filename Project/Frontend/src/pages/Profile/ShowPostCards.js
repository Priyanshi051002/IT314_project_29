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
import { React, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

const posts = [
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
];

const ShowPostCards = () => {
  // const [posts, setPosts] = useState([]);
  const [visible, setVisible] = useState(4);

  //   useEffect(() => {
  //     fetch("https://jsonplaceholder.typicode.com/posts")
  //       .then((res) => res.json())
  //       .then((data) => setPosts(data));
  //   }, []);

  const ShowMoreItems = () => {
    setVisible((prevValue) => prevValue + 2);
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
            My Posts
          </Typography>
          <Divider />
          <Grid container rowSpacing={3} columnSpacing={4} mt={0.5} mb={2}>
            {posts.slice(0, visible).map((post) => (
              <Grid item xs={12} sm={6} md={6}>
                <Card variant="outlined" sx={{ mb: 2 }}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="200"
                    image={post.source}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {post.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {post.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="outlined">
                      Share
                    </Button>
                    <Button size="small">Learn More</Button>
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

export default ShowPostCards;
