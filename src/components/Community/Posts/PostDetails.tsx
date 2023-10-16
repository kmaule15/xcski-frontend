import React, { useState, useEffect } from 'react'
import { Params, useParams } from 'react-router-dom';
import PostComments from './PostComments'
import axios from 'axios'

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
  
function PostDetails() {
    const postId = useParams<Params>()
    const [post, setPost] = useState<Post>()

    useEffect(() => {
        async function fetchPost() {
           try {
            const response = await axios.get(`http://localhost:3000/posts/${postId.postId}`) //This is due to how the postId is passed into the function. the intial post Id is an object
            console.log(response.data)
            setPost(response.data)
           } catch (error) {
            console.error("Error fetching post:", error);
           }
        }
        fetchPost()
    }, [postId])

    if (!post) return <div>Loading...</div>

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <PostComments postId={Number(postId.postId)} />
        </div>
    )

}

export default PostDetails