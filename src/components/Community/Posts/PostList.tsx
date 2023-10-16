import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    username: string;
  };
}

function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fecthPosts() {
      try {
        const response = await axios.get(`http://localhost:3000/posts`);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fecthPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <Link to={`/posts/${post.id}`}>
            <h3>{post.title}</h3>
          </Link>
          <p>
            Posted by {post.user.username} on{" "}
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default PostsList;
