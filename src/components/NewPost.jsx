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
        <div className="new-post">
            <form onSubmit={postHandler}>
                <div className="new-post__upper-element">
                    <textarea
                        name="caption"
                        value={caption}
                        onChange={captionHandler}
                        placeholder="What's Up?"
                        className="new-post__textarea"
                    ></textarea>
                </div>
                <div className="new-post__lower-element">
                    <div className="new-post__lower-element__button-container">
                        <label>
                            <span class="material-icons-round new-post__add-photo">
                                add_photo_alternate
                            </span>
                            <input
                                type="file"
                                hidden
                                onChange={photoHandler}
                            ></input>
                        </label>
                        <button className="new-post__btn">
                            <span class="material-icons-round">send</span>
                        </button>
                    </div>
                    {photoLink && (
                        <img
                            src={photoLink}
                            alt="post-image"
                            className="new-post__image"
                        />
                    )}
                </div>
            </form>
        </div>
    );
};

export default NewPost;
