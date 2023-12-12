// src/components/CreatePostModal.js
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
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
      alert("Title and content are required!");
      return;
    }

    const accessToken = localStorage.getItem("accesstoken");

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
        <Button onClick={() => setIsOpen(true)}>Create Post</Button>
      ) : (
        <p>Users must be logged in to create posts.</p>
      )}

      <Modal
        show={isOpen}
        onHide={() => setIsOpen(false)}
        // onRequestClose={() => setIsOpen(false)}
        // contentLabel="Create Post"
        // className="modal-content"
        // overlayClassName="modal-overlay"
      >
        <Modal.Header>Post Details</Modal.Header>
        <Modal.Body>
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
          <Button className="submit-button" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CreatePostModal;
