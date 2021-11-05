const Post = ({ caption }) => {
    return (
        <div className="post">
            <div className="post__user">User Details</div>
            <div className="post__post">{caption}</div>
        </div>
    );
};

export default Post;
