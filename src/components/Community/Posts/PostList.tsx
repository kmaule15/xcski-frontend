import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CreatePostModal from "./Create Post Modal/CreatePostModal";

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    username: string;
  };
}

function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const response = await axios.get(`http://localhost:3000/posts`);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  function handlePostCreated() {
    // Refresh the posts list when a new post is created
    fetchPosts();
  }

  

  return (
    <div>
      <CreatePostModal onPostCreated={handlePostCreated} />  
      {posts.map((post) => (
        <div key={post.id}>
          <Link to={`/posts/${post.id}`}>
            <h3>{post.title}</h3>
          </Link>
          <p>
            Posted by {post.author?.username} on{" "}
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default PostsList;
