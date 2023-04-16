import React, { useState } from "react";
import './AddPost.css'
import { BiImageAdd, BiVideoPlus, BiFile } from 'react-icons/bi';
import Navbar from "../../components/Navbar";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFileAlt } from '@fortawesome/free-solid-svg-icons'

function AddPost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [document, setDocument] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Submitting post ${title} with content: ${content}`);
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

    return (

        <div>
            <Navbar />
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
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                    ></textarea>
                </div>
                <div className="file-card">
                    <div className="file-inputs">
                        <input type="file" accept="image/png, image/jpeg" id="image" onChange={handleImageChange} />
                        <button type="Upload">
                            <i>
                                <BiImageAdd />
                            </i>
                            Upload Image
                        </button>

                    </div>
                    <p className="main">Supported files : JPG,PNG</p>
                    {image && <p> {image.name}</p>}
                    {/* <li className="list-item">
                        <FontAwesomeIcon icon={faFileAlt} />
                        <p>{image.name}</p>
                        <div className="actions">
                            {image.isUploading}
                        </div>
                         </li> */}

                </div>
                <div className="file-card">
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
                </div>
                <div className="file-card">
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
                </div>

                <button type="submit">Submit</button>
            </form >
        </div >
    );
}

export default AddPost;
