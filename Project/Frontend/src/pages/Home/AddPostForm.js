import {
  Avatar,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
  Box,
  Modal,
  Stack
} from "@mui/material";
import React from "react";

import ImageIcon from "@mui/icons-material/Image";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import AudioFileIcon from "@mui/icons-material/AudioFile";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddPostForm = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const modalOpenHandler = () => setIsModalOpen(true);
  const modalCloseHandler = () => setIsModalOpen(false);
  return (
    <Paper elevation={3} sx={{ my: 1 }}>
      <Box>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ p: "1em" }}
        >
          <Grid item xs={2} md={1}>
            <Avatar />
          </Grid>
          <Grid item xs={10} md={11}>
            <TextField
              fullWidth
              id="addPost"
              placeholder="Drop some knowledge!"
              onClick={modalOpenHandler}
            />
            <Modal
              open={isModalOpen}
              onClose={modalCloseHandler}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Stack spacing={2}>
                  <Typography variant="h3" component="h2">
                    Add a Post
                  </Typography>
                  <TextField
                    multiline
                    rows={5}
                    fullWidth
                    placeholder="Write your thoughts here..."
                  />
                  <Button variant="contained">Post</Button>
                </Stack>
              </Box>
            </Modal>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Box>
        <Grid container spacing={2} sx={{ py: "1em" }}>
          <Grid item xs={4} align="center">
            <Button>
              <ImageIcon />
              <Typography>Image</Typography>
            </Button>
          </Grid>
          <Grid item xs={4} align="center">
            <Button>
              <VideoLibraryIcon />
              <Typography>Video</Typography>
            </Button>
          </Grid>
          <Grid item xs={4} align="center">
            <Button>
              <AudioFileIcon />
              <Typography>Audio</Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default AddPostForm;
