// src/components/CreatePostModal.js
import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./CreatePostModal.css";
import { useAuth } from "../../../../AuthContext";

interface CreatePostModalProps {
  onPostCreated?: () => void;
}

function CreatePostModal({ onPostCreated }: CreatePostModalProps) {
  const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit() {
    if (!title.trim() || !content.trim()) {
      alert('Title and content are required!');
      return;
    }

    const accessToken = localStorage.getItem('accesstoken');

    if (!accessToken) {
      console.error("No access token found");
      return;
    }

    try {
      await axios.post(
        `http://localhost:3000/posts`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setTitle("");
      setContent("");
      setIsOpen(false);
      if (onPostCreated) {
        onPostCreated();
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }

  return (
    <div>
      {isLoggedIn ? (
        <button onClick={() => setIsOpen(true)}>Create Post</button>
      ) : (
        <p>Users must be logged in to create posts.</p>
      )}

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Create Post"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div>
          <button className="close-button" onClick={() => setIsOpen(false)}>
            X
          </button>
          <h2>Create Post</h2>
          <input
            className="title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            className="content-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
          />
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default CreatePostModal;
