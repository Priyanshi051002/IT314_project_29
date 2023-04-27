import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  Avatar,
} from "@mui/material";
import DOMPurify from "dompurify";
import red from "@mui/material/colors/red";

const Comment = (props) => {
  const { item } = props;
  item.comment = DOMPurify.sanitize(item.comment);

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={item.user_id}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          dangerouslySetInnerHTML={{ __html: item.comment }}
        ></Typography>
      </CardContent>
    </Card>
  );
};

export default Comment;
