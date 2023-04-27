import { React, useState, useEffect } from "react";
import { Button, Container, Grid, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Navbar from "../../components/Navbar";
import PostCards from "../../components/PostCards";
import SearchIcon from "@mui/icons-material/Search";

let user_id = "";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchInput, setSearchInput] = useState(null);
  const [searchPost, setSearchPost] = useState(false); // for search bar
  useEffect(() => {
    setSearchPost(false);
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        const response1 = await fetch(`${process.env.REACT_APP_FINAL}/user/getProfile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data1 = await response1.json();
        console.log(data1.data);
        if (data1.success) {
          user_id = data1.data.user.username;
          console.log(user_id);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
    fetch(`${process.env.REACT_APP_FINAL}/post/getPostsHome`, {
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
    fetch(`${process.env.REACT_APP_FINAL}/post/getPostsQuery`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ string: searchInput }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          setPosts(data);
          setSearchPost(true);
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
                    <Button
                      variant="contained"
                      sx={{ borderRadius: "2em" }}
                      type="submit"
                    >
                      Search
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
            {searchPost &&
              posts.map((post) => (
                <PostCards
                  item={post}
                  comments={post.normal_comments}
                  user={user_id}
                />
              ))}
            {!searchPost &&
              posts.map((post) => (
                <PostCards
                  item={post}
                  comments={post.comments}
                  user={user_id}
                />
              ))}
            {/* {posts.map((post) => (
              <PostCards item={post} comments={post.comments} />
            ))} */}
          </Grid>
          <Grid item xs={1} md={2}></Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
