import * as React from "react";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Textarea from "@mui/joy/Textarea";
import Typography from "@mui/joy/Typography";
import { Button } from "@mui/material/";

const AddComment = (props) => {
  const { item } = props;
  const [text, setText] = React.useState("");
  const addEmoji = (emoji) => () => setText(`${text}${emoji}`);

  const handleSave = () => {
    let newComment = {
      user_id: item.user_id,
      comment: text,
    };
    console.log(item);
    item.comments.push(newComment);
    newComment = { ...newComment, ["post_id"]: item.post_id };
    handleAddComment(newComment);
  };

  const handleAddComment = (item) => {
    fetch(`http://localhost:7000/post/addComment`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setText("");
        } else {
          alert("Comment Not Added");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <Textarea
        placeholder="Type in here…"
        value={text}
        onChange={(event) => setText(event.target.value)}
        minRows={2}
        maxRows={4}
        startDecorator={
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <IconButton
              variant="outlined"
              color="neutral"
              onClick={addEmoji("👍")}
            >
              👍
            </IconButton>
            <IconButton
              variant="outlined"
              color="neutral"
              onClick={addEmoji("🏖")}
            >
              🏖
            </IconButton>
            <IconButton
              variant="outlined"
              color="neutral"
              onClick={addEmoji("😍")}
            >
              😍
            </IconButton>
          </Box>
        }
        endDecorator={
          <Typography level="body3" sx={{ ml: "auto" }}>
            {text.length} character(s)
          </Typography>
        }
        sx={{ minWidth: 300 }}
      />
      <Button sx={{ ml: "auto" }} onClick={handleSave}>
        Send
      </Button>
    </>
  );
};

export default AddComment;
