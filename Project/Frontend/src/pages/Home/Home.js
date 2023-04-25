import { React, useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import Navbar from "../../components/Navbar";
import PostCards from "../../components/PostCards";

// const posts = [
//   {
//     name: "Om",
//     source: "https://picsum.photos/1000/1000",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
//   },
//   {
//     name: "Harsh",
//     source: "https://picsum.photos/1000/1000",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
//   },
//   {
//     name: "Priyanshi",
//     source: "https://picsum.photos/1000/1000",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
//   },
//   {
//     name: "Kaushal",
//     source: "https://picsum.photos/1000/1000",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
//   },
//   {
//     name: "Devdeep",
//     source: "https://picsum.photos/1000/1000",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
//   },
//   {
//     name: "Achyut",
//     source: "https://picsum.photos/1000/1000",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Mus mauris vitae ultricies leo integer malesuada nunc.",
//   },
// ];

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:7000/post/getPostsHome`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          setPosts(data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <Container maxWidth="lg">
      <Box>
        <Navbar />
        <Grid container spacing={2}>
          <Grid item xs={1} md={2}></Grid>
          <Grid item xs={10} md={8}>
            {posts.map((post) => (
              <PostCards item={post} />
            ))}
          </Grid>
          <Grid item xs={1} md={2}></Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
