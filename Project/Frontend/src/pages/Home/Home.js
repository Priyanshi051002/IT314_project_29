import React, { useState } from "react";
import { Button, Container, Grid, Icon, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Navbar from "../../components/Navbar";
import PostCards from "../../components/PostCards";
import SearchIcon from "@mui/icons-material/Search";

const DUMMY_DATA = [
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
const Home = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = (e) => {
    const { value } = e.target;
    setSearchInput(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
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
              sx={{ marginTop: "1em", marginBottom: "1em",  paddingY : "1em" }}
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
                      paddingLeft: '0.5em'
                    }}
                  >
                    <Button variant="contained" sx={{ borderRadius: "2em" }}>
                      Search
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
            <PostCards items={DUMMY_DATA} />
          </Grid>
          <Grid item xs={1} md={2}></Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
