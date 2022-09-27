const isAlreadyLiked = (likeArray, userId) => {
    return likeArray.includes(userId);
};

export default isAlreadyLiked;
