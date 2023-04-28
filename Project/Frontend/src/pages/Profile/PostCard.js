import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
  Grid,
  Container,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import PostCards from "../../components/PostCards";

const PostCard = (props) => {
  console.log(props.user);
  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            My Posts
          </Typography>
          <Grid container spacing={2}>
            {props.posts.length > 0 ? (
              props.posts.slice(0, 2).map((post) => (
                <Grid item xs={12} sm={6} md={6}>
                  <PostCards
                    item={post}
                    comments={post.comments}
                    user={props.user.username}
                  />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                {" "}
                <Typography>
                  You have No Posts. Add Post to show it here
                </Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            component={Link}
            to="/myposts"
            fullWidth
            color="success"
            name="myposts"
            type="button"
          >
            Show All Posts
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default PostCard;
