import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CreatePostModal from "./Create Post Modal/CreatePostModal";
import { Card } from "react-bootstrap";

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
        <Card>
          <div key={post.id}>
            <Card.Body>
              <Link to={`/posts/${post.id}`}>
                <Card.Title>{post.title}</Card.Title>
              </Link>
              <p>
                Posted by {post.author?.username} on{" "}
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </Card.Body>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default PostsList;
