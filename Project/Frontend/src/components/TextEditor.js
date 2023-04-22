import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button, Grid } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const TextEditor = () => {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      editorRef.current.setContent('');
    }
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose1 = () => {
    log();
    setOpen(false);
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
              selector: "#editor",
              height: 500,
              menubar: false,
              statusbar: false,
              icons: 'material',
              toolbar_mode: 'floating',
              plugins: [
                'advlist', 'autolink', 'lists', 'charmap', 'searchreplace', 'wordcount', 'code', 'fullscreen', 'table', 'codesample'
              ],
              //toolbar: 'undo redo | blocks | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | charmap table  codesample |  searchreplace wordcount code | fullscreen | customInsertButton',
              toolbar: [
                { name: 'history', items: [ 'undo', 'redo' ] },
                { name: 'styles', items: [ 'blocks' ] },
                { name: 'formatting', items: [ 'bold', 'italic', 'underline' ] },
                { name: 'alignment', items: [ 'alignleft', 'aligncenter', 'alignright', 'alignjustify' ] },
                { name: 'Add post', items: [ 'customAddButton' ] },
                { name: 'indentation', items: [ 'bullist', 'numlist','outdent', 'indent' ] },
                { name: 'special', items: [ 'charmap', 'table', 'codesample' ] },
                { name: 'tools', items: [ 'searchreplace', 'wordcount', 'code' ] }
                
              ],
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px } + .blue { color: blue; }',

              setup: (editor) =>  {
                editor.ui.registry.addButton('customAddButton', {
                  text: 'ADD POST',
                  onAction: (_) => {
                    setOpen(true);
                  }
                });
              }
            }}
          />
        </Grid>
        <Grid item xs={1} md={2}></Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={4} md={3}></Grid>
        <Grid item xs={4} md={6}>
          <Button  variant="contained" fullWidth onClick={handleClickOpen}>
            Add post
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            maxWidth = 'xs'
          >
            <DialogTitle id="responsive-dialog-title">
              {"Add the post?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to add the post? You will not be able to edit it afterwards.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={handleClose}>
                Return
              </Button>
              <Button onClick={handleClose1}  variant="contained" autoFocus>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        <Grid item xs={4} md={3}></Grid>
      </Grid>
    </>
  );
}

export default TextEditor;