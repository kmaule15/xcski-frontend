import { useState, useEffect } from "react";
import Comment from "../Comments/Comment";
import axios from "axios";
import { useAuth } from "../../../AuthContext";
import "./PostComments.css";

interface CommentInterface {
  id: number;
  content: string;
  userId: number;
  postId?: number | null;
  trailId?: number | null;
  createdAt: string;
  updatedAt: string;
  childComments?: CommentInterface[];
}

interface PostCommentsProps {
  postId: number;
}

const PostComments: React.FC<PostCommentsProps> = ({ postId }) => {
  const { isLoggedIn } = useAuth();
  const [comments, setComments] = useState<CommentInterface[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/post/${postId}/comments`)
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
        `http://localhost:3000/comments`,
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
          <button className="postCommentsButton" onClick={handleAddComment}>
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
