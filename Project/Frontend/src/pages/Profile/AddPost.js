import React, { useState } from "react";
import './AddPost.css'


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
        <div><h1 > Add Post </h1>
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
                <div>
                    <label htmlFor="image">Image:</label>
                    <input type="file" id="image" onChange={handleImageChange} />
                    {image && <p>Selected image: {image.name}</p>}
                </div>
                <div>
                    <label htmlFor="video">Video:</label>
                    <input type="file" id="video" onChange={handleVideoChange} />
                    {video && <p>Selected video: {video.name}</p>}
                </div>
                <div>
                    <label htmlFor="document">Document:</label>
                    <input type="file" id="document" onChange={handleDocumentChange} />
                    {document && <p>Selected document: {document.name}</p>}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddPost;
