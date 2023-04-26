import { React, useState, useEffect } from "react";
import { Button, Container, Grid, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Navbar from "../../components/Navbar";
import PostCards from "../../components/PostCards";
import SearchIcon from "@mui/icons-material/Search";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchInput, setSearchInput] = useState("");

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

  const handleSearchInput = (e) => {
    const { value } = e.target;
    setSearchInput(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    
    fetch(`http://localhost:7000/post/getPostsQuery`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ string: searchInput }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data) {
          setPosts(data);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <Container maxWidth="lg">
      <Box>
        <Navbar />
        <Grid container spacing={2}>
          <Grid item xs={1} md={2}></Grid>
          <Grid item xs={10} md={8}>
            <Paper
              elevation={3}
              sx={{ marginTop: "1em", marginBottom: "1em", paddingY: "1em" }}
            >
              <form onSubmit={handleSearchSubmit}>
                <Grid container>
                  <Grid
                    item
                    xs={1}
                    sx={{
                      justifyContent: "center",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <SearchIcon fontSize="large" />
                  </Grid>
                  <Grid item xs={9}>
                    <TextField
                      placeholder="Search"
                      fullWidth
                      name="search"
                      value={searchInput}
                      onChange={handleSearchInput}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      justifyContent: "center",
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "0.5em",
                    }}
                  >
                    <Button variant="contained" sx={{ borderRadius: "2em" }} type="submit">
                      Search
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
            {posts.map((post) => (
              <PostCards item={post} key={post.post_id} />
            ))}
          </Grid>
          <Grid item xs={1} md={2}></Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
