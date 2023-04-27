import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  CardMedia,
  CardHeader,
  Avatar,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ImageUrl from "../static";
import DOMPurify from "dompurify";
import Collapse from "@mui/material/Collapse";
import red from "@mui/material/colors/red";
import Comment from "./Comment";
import AddComment from "./AddComment";

let user_id = "omp217";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  color: !expand ? "grey" : "black",
  transition: theme.transitions.create("color", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const PostCards = (props) => {
  const { item, comments } = props;
  const [expanded, setExpanded] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = () => {
    const post = {
      post_id: item.post_id,
    };
    handleDeletePost(post);
  };

  const handleDeletePost = (item) => {
    fetch(`http://localhost:7000/post/deletePost`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Post Deleted");
        } else {
          alert("Could not delete");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handleAddLike = () => {
    fetch(`http://localhost:7000/post/addLike`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ post_id: item.post_id, user_id: item.user_id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setLiked(true);
        else alert("Could not add like");
      });
  };

  const handleRemoveLike = () => {
    fetch(`http://localhost:7000/post/removeLike`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ post_id: item.post_id, user_id: item.user_id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setLiked(false);
        else alert("Could not remove like");
      });
  };

  item.description = DOMPurify.sanitize(item.description);
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            {item.user_id === user_id && (
              <DeleteIcon sx={{ fontSize: 30 }} onClick={handleDelete} />
            )}
          </IconButton>
        }
        title={item.user_id}
      />
      <CardMedia
        component="img"
        alt="green iguana"
        height="200"
        image={ImageUrl}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          dangerouslySetInnerHTML={{ __html: item.description }}
        ></Typography>
      </CardContent>
      <CardActions disableSpacing>
        {liked && (
          <IconButton aria-label="add to favorites" onClick={handleRemoveLike}>
            <FavoriteIcon sx={{ color: red[500] }} />
          </IconButton>
        )}
        {!liked && (
          <IconButton aria-label="add to favorites" onClick={handleAddLike}>
            <FavoriteIcon />
          </IconButton>
        )}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <AddCommentIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Comments:{comments.length}</Typography>
          <AddComment item={item} />
          {comments.map((comment) => (
            <Comment item={comment} />
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default PostCards;
