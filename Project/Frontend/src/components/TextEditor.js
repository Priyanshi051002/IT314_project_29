import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button, Grid } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { BiImageAdd, BiVideoPlus, BiFile } from 'react-icons/bi';

const TextEditor = () => {
  const [title, setTitle] = useState("");
  //const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [document, setDocument] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log(`Submitting post ${title} with content: ${content}`);
    console.log(`Image: ${image ? image.name : "none"}`);
    console.log(`Video: ${video ? video.name : "none"}`);
    console.log(`Document: ${document ? document.name : "none"}`);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleVideoChange = (event) => {
    setVideo(event.target.files[0]);
  };

  const handleDocumentChange = (event) => {
    setDocument(event.target.files[0]);
  };

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
      <div>
        {/* <Navbar /> */}
        <h1 > Add Post </h1>
        <form onSubmit={handleSubmit}>

          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>


          <div>
            <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ p: "1em" }}>
              <Editor
                apiKey='gu0fysg21lqeq36qwa8mjpn5i0n7bqnvfkrzl5dbsujw6u22'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue="<p>Share your thoughts here..</p>"
                init={{
                  selector: "#editor",
                  height: 500,
                  width: 1000,
                  menubar: false,
                  statusbar: false,
                  icons: 'material',
                  toolbar_mode: 'floating',
                  plugins: [
                    'advlist', 'autolink', 'lists', 'charmap', 'searchreplace', 'wordcount', 'code', 'fullscreen', 'table', 'codesample'
                  ],
                  toolbar: 'undo redo | blocks | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | charmap table codesample | searchreplace wordcount code | fullscreen ',
                  // toolbar: [
                  //   { name: 'history', items: [ 'undo', 'redo' ] },
                  //   { name: 'styles', items: [ 'blocks' ] },
                  //   { name: 'formatting', items: [ 'bold', 'italic', 'underline' ] },
                  //   { name: 'alignment', items: [ 'alignleft', 'aligncenter', 'alignright', 'alignjustify' ] },
                  //   { name: 'indentation', items: [ 'bullist', 'numlist','outdent', 'indent' ] },
                  //   { name: 'special', items: [ 'charmap', 'table', 'codesample' ] },
                  //   { name: 'tools', items: [ 'searchreplace', 'wordcount', 'code' ] }

                  // ],
                  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px } + .blue { color: blue; }',

                  // setup: (editor) =>  {
                  //   editor.ui.registry.addButton('customAddButton', {
                  //     text: 'ADD POST',
                  //     onAction: (_) => {
                  //       setOpen(true);
                  //     }
                  //   });
                  // }
                }}
              />
            </Grid>
          </div>


          <Grid container spacing={2} style={{ marginLeft: "4%" }}>


            <Grid item xs={3} style={{ margin: "3%" }} className="file-card" id="upload_img">
              <div className="file-inputs">
                <input type="file" accept="image/png, image/jpeg" id="image" onChange={handleImageChange} />
                <button type="Upload" >
                  <i>
                    <BiImageAdd />
                  </i>
                  Upload Image
                </button>

              </div>
              <p className="main">Supported files : JPG,PNG</p>
              {image && <p> {image.name}</p>}

            </Grid>


            <br></br>


            <Grid item xs={3} style={{ margin: "3%" }} className="file-card" id='upload_video'>
              <div className="file-inputs">

                <input type="file" accept="video/mp4" id="video" onChange={handleVideoChange} />
                <button type="Upload">
                  <i>
                    <BiVideoPlus />
                  </i>
                  Upload Video
                </button>

              </div>
              <p className="main">Supported files : mp4</p>
              {video && <p>Selected video: {video.name}</p>}
            </Grid>


            <br></br>


            <Grid item xs={3} style={{ margin: "3%" }} className="file-card" id='upload_file'>
              <div className="file-inputs">

                <input type="file" accept="application/pdf" id="document" onChange={handleDocumentChange} />
                <button type="Upload">
                  <i>
                    <BiFile />
                  </i>
                  Upload File
                </button>

              </div>
              <p className="main">Supported files : PDF</p>
              {document && <p>Selected document: {document.name}</p>}
            </Grid>


          </Grid>

          <br></br>
        </form >

      </div >

      <Grid container spacing={2}>
        <Grid item xs={4} md={3}></Grid>
        <Grid item xs={4} md={6}>
          <Button variant="contained" fullWidth onClick={handleClickOpen}>
            Add post
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            maxWidth='xs'
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
              <Button onClick={handleClose1} variant="contained" autoFocus>
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