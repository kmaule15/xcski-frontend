import CommentProps from "./Interfaces/CommentProps";

const Comment = (cp: CommentProps) => {
    return (<>
    <p>By {cp.creatorName}</p>
    <p>{cp.commentText}</p>
    </>);
};

export default Comment;