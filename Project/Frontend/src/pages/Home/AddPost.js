import React from 'react'
import { Button, Container, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Navbar from "../../components/Navbar";

const AddPost = () => {
    return (
        <Container maxWidth="lg">
          <Box>
            <Navbar />
            <Grid container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ p: "1em" }}>
              <Grid item xs={1} md={2}></Grid>
              <Grid item xs={10} md={8}>
              <TextField
                id="outlined-multiline-static"
                multiline
                fullWidth
                rows={4}
                placeholder="Write your thoughts here"
                />
              </Grid>
              <Grid item xs={1} md={2}></Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={4} md={5}></Grid>
              <Grid item xs={4} md={2}>
                <Button variant="contained" fullWidth> Add Post</Button>
              </Grid>
              <Grid item xs={4} md={5}></Grid>
            </Grid>
          </Box>
        </Container>
      );
}

export default AddPost;
