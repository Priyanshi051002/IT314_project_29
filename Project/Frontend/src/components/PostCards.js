import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
} from "@mui/material";
import ImageUrl from "../static";
import DOMPurify from "dompurify";

const PostCards = (props) => {
  const { item } = props;

  item.description = DOMPurify.sanitize(item.description);

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
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
      <CardActions>
        <Button size="small" variant="outlined">
          Share
        </Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default PostCards;
