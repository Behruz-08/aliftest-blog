import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      navigate("/posts");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <button onClick={handleDelete}>Delete Post</button>
    </div>
  );
}

export default PostDetails;
