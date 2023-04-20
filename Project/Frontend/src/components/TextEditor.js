import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button, Grid } from "@mui/material";

const TextEditor = () => {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      editorRef.current.setContent('');
    }
  };
  return (
    <>
      <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ p: "1em" }}>
        <Grid item xs={1} md={2}></Grid>
        <Grid item xs={10} md={8}>
          <Editor
            apiKey='gu0fysg21lqeq36qwa8mjpn5i0n7bqnvfkrzl5dbsujw6u22'
            onInit={(evt, editor) => editorRef.current = editor}
            initialValue="<p>Share your thoughts here..</p>"
            init={{
              selector: "#myTextarea",
              height: 500,
              menubar: false,
              statusbar: false,
              icons: 'material',
              toolbar_mode: 'floating',
              plugins: [
                'advlist', 'autolink', 'lists', 'charmap', 'searchreplace', 'wordcount', 'code', 'fullscreen', 'table', 'codesample'
              ],
              toolbar: 'undo redo | blocks | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | charmap table  codesample |  searchreplace wordcount code | fullscreen',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px } + .blue { color: blue; }'
            }}
          />
        </Grid>
        <Grid item xs={1} md={2}></Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={4} md={3}></Grid>
        <Grid item xs={4} md={6}>
          <Button onClick={log} variant="contained" fullWidth> Add Post</Button>
        </Grid>
        <Grid item xs={4} md={3}></Grid>
      </Grid>
    </>
  );
}

export default TextEditor;