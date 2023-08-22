import "./NewPost.css";
import getPhotoLink from "../utils/getPhotoLink";
import { useRef, useState } from "react";
import { getFeed, newPost } from "../features/post/request";
import { useDispatch, useSelector } from "react-redux";
import Post from "../assets/paper-plane-svgrepo-com.svg";
import { PuffLoader } from "react-spinners";

const NewPost = () => {
  // eslint-disable-next-line
  const [photo, setPhoto] = useState("");
  const photoRef = useRef("");
  const [photoLink, setPhotoLink] = useState("");
  const [caption, setCaption] = useState("");

  const dispatch = useDispatch();
  const { postStatus } = useSelector((state) => state.post);

  const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
  const CLOUD_URL = process.env.REACT_APP_CLOUD_URL;
  const PRESET = process.env.REACT_APP_PRESET;

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

  const postHandler = async (e) => {
    e.preventDefault();
    await dispatch(newPost({ caption, photo: photoLink }));
    setCaption("");
    setPhoto("");
    await dispatch(getFeed());
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
              <span className="material-icons-round new-post__add-photo">
                add_photo_alternate
              </span>
              <input type="file" hidden onChange={photoHandler}></input>
            </label>
            <button className="btn new-post__btn">
              {postStatus === "newPostLoading" ? (
                <div className="new-post__btn__loading-container">
                  <PuffLoader
                    color={"#0f172a"}
                    size={30}
                    speedMultiplier={1.5}
                  />
                </div>
              ) : (
                <div className="new-post__btn_post">
                  <img src={Post} className="mr-0-5" alt="" />
                  <span className="new-post__btn_post__text">Post</span>
                </div>
              )}
            </button>
          </div>
          {photoLink && (
            <img src={photoLink} alt="post" className="new-post__image" />
          )}
        </div>
      </form>
    </div>
  );
};

export default NewPost;
