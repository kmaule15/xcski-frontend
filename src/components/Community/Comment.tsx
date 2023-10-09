import React, { useState } from 'react'
import './Comment.css'
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

const Comment: React.FC<{ comment: CommentInterface }> = ({ comment }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [childComments, setChildComments] = useState<CommentInterface[]>([])

    const toggleChildComments = async () => {
        if (isOpen) {
            setIsOpen(false)
        } else {
            if (childComments.length === 0) {
                try { 
                    const response = await fetch(`http://localhost:3000/child-comments/${comment.id}`)
                    const data = await response.json()
                    setChildComments(data)
                } catch (error) {
                    console.error('Failed to fetch child comment:', error)
                }
            }
            setIsOpen(true)
        }
    }

    return (
        <div className='commentClass'>
            <p>{comment.content}</p>
            {((childComments && childComments.length > 0) || (comment.childComments && comment.childComments.length > 0)) && (
                <button onClick={toggleChildComments}>
                    {isOpen ? 'Hide Replies' : 'Show Replies'}
                </button>
            )}
            {isOpen && childComments.map(child => (
                <Comment key={child.id} comment={child} />
            ))}
        </div>
    )
}

export default Comment