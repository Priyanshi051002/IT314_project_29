import React from "react";
import "./AddPost.css";
import TextEditor from "../../components/TextEditor";
import Navbar from "../../components/Navbar";
import { Container } from "@mui/material/";
// import { BiImageAdd, BiVideoPlus, BiFile } from 'react-icons/bi';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFileAlt } from '@fortawesome/free-solid-svg-icons'
// import Grid from '@material-ui/core/Grid';

function AddPost() {
  return (
    <>
      <Container maxWidth="lg">
        <Navbar />
        <TextEditor />
      </Container>
    </>
  );
}

export default AddPost;
