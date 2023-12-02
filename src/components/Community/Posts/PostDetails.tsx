import React, { useState, useEffect } from "react";
import { Params, useNavigate, useParams } from "react-router-dom";
import PostComments from "./PostComments";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useAuth } from "../../../AuthContext";
import { Post } from "../../../Interfaces/post.types";

function PostDetails() {
  const postId = useParams<Params>();
  const [post, setPost] = useState<Post>();
  const navigate = useNavigate();
  const { AuthUsername } = useAuth();

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await axios.get(
          `http://localhost:3000/posts/${postId.postId}`
        ); //This is due to how the postId is passed into the function. the intial post Id is an object
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    }
    fetchPost();
    console.log(post);
  }, [postId]);

  function deletePost() {
    try {
      axios.delete(`http://localhost:3000/posts/${postId.postId}`);
      alert("Post has been deleted");
      navigate(`/community`);
    } catch (error) {
      console.error("Error deleting event: ", error);
    }
  }

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      {AuthUsername === post.author.username && (
        <Button onClick={deletePost}>Delete Post</Button>
      )}
      <PostComments postId={Number(postId.postId)} />
    </div>
  );
}

export default PostDetails;
