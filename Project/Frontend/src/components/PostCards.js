import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
} from "@mui/material";

const PostCards = (props) => {
  const { items } = props;
  return (
    <>
      {items.map((item) => (
        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardMedia
            component="img"
            alt="green iguana"
            height="200"
            image={item.source}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" variant="outlined">
              Share
            </Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))}
    </>
  );
};

export default PostCards;
