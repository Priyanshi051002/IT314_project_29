import React from 'react'
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import Navbar from "../../components/Navbar";
import TextEditor from '../../components/TextEditor';

const AddPost = () => {
  return (
    <Container maxWidth="lg">
      <Box>
        <Navbar />
        {/* <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ p: "1em" }}>
          <Grid item xs={1} md={2}></Grid>
          <Grid item xs={10} md={8}>
            <TextEditor />
          </Grid>
          <Grid item xs={1} md={2}></Grid>
        </Grid> */}

        <TextEditor />

      </Box>
    </Container>
  );
}

export default AddPost;
