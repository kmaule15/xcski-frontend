import { useState, useEffect } from "react";
import Comment from "../Comments/Comment";
import axios from "axios";
import { useAuth } from "../../../AuthContext";
import "./PostComments.css";
import { CommentInterface } from "../../../Interfaces/comment.types";

interface PostCommentsProps {
  postId: number;
}

const PostComments: React.FC<PostCommentsProps> = ({ postId }) => {
  const { isLoggedIn } = useAuth();
  const [comments, setComments] = useState<CommentInterface[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/post/${postId}/comments`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, [postId]);

  const handleAddComment = async () => {
    const accessToken = localStorage.getItem("accesstoken");

    if (!isLoggedIn) {
      console.error("No access token found");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/comments`,
        { content: newComment, postId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setNewComment("");
      setComments([...comments, response.data]);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="postCommentsContainer">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
      {isLoggedIn ? (
        <div className="postCommentsNewCommentContainer">
          <textarea
            className="postCommentsTextarea"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button
            disabled={newComment === ""}
            className="postCommentsButton"
            onClick={handleAddComment}
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="postCommentsLoginMessage">
          Please log in to submit comments.
        </div>
      )}
    </div>
  );
};

export default PostComments;
