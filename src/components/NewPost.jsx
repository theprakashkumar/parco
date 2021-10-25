import "./NewPost.css";
import getPhotoLink from "../utils/getPhotoLink";
import { useRef, useState } from "react";
import { newPost } from "../features/post/request";
import { useDispatch } from "react-redux";

const NewPost = () => {
    const [photo, setPhoto] = useState("");
    const photoRef = useRef("");
    const [photoLink, setPhotoLink] = useState("");
    const [caption, setCaption] = useState("");

    const dispatch = useDispatch();

    const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
    const CLOUD_URL = process.env.REACT_APP_CLOUD_URL;
    const PRESET = process.env.REACT_APP_PRESET;

    const photoUrl = () => {
        const photoLink = getPhotoLink(PRESET, CLOUD_NAME, CLOUD_URL, photo);
        setPhotoLink(photoLink);
    };

    const captionHandler = (e) => {
        setCaption(e.target.value);
    };

    const photoHandler = async (e) => {
        setPhoto(e.target.files[0]);
        photoRef.current = e.target.files[0];
        const photoLink = await getPhotoLink(
            PRESET,
            CLOUD_NAME,
            CLOUD_URL,
            photoRef.current
        );
        setPhotoLink(photoLink);
    };

    const postHandler = (e) => {
        e.preventDefault();
        dispatch(newPost({ caption, photo: photoLink }));
    };

    return (
        <div className="NewPost">
            <form onSubmit={postHandler}>
                <textarea
                    name="caption"
                    value={caption}
                    rows="4"
                    cols="50"
                    onChange={captionHandler}
                    placeholder="What's Up?"
                ></textarea>
                <label>
                    <span class="material-icons-outlined">file_upload</span>
                    <input type="file" hidden onChange={photoHandler}></input>
                </label>
                <button>Post</button>
                {photoLink && (
                    <img
                        src={photoLink}
                        alt="Girl in a jacket"
                        width="500"
                        height="600"
                    />
                )}
            </form>
        </div>
    );
};

export default NewPost;
