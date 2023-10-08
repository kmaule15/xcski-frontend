import React, { useState, useEffect } from 'react'
import Comment from './Comment'

interface CommentInterface {
    id: number
    content: string
    userId: number
    postId?: number | null
    trailId?: number | null
    createdAt: string
    updatedAt: string
    childComments?: CommentInterface[]
}

interface PostCommentsProps {
    postId: number
}

const PostComments: React.FC<PostCommentsProps> = ({ postId }) => {
    const [comments, setComments] =useState<CommentInterface[]>([])

    useEffect(() => {
        fetch(`http://localhost:3000/post/${postId}/comments`)
        .then(response => response.json())
        .then(data => {
            setComments(data)
        })
    }, [postId])

    return (
        <div>
            {comments.map(comment => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </div>
    )
}

export default PostComments