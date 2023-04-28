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
  console.log(item.user_id[0]);
  item.comment = DOMPurify.sanitize(item.comment);

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      {/* console.log(item.user_id[0]); */}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
           {item.user_id[0].toUpperCase()}
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
