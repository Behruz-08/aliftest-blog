import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const NewPostForm = ({ onPostCreated, updatePostlist }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://jsonplaceholder.typicode.com/posts",
        {
          title,
          body,
          userId: 1, // Измени это значение, если нужно указать другого пользователя
        }
      );

      // Сброс формы и вызов колбэка для обновления списка постов
      setTitle("");
      setBody("");
      onPostCreated(response.data);
      updatePostlist();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="body">
        <Form.Label>Body</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={body}
          onChange={(event) => setBody(event.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Create Post 🚀
      </Button>
    </Form>
  );
};

export default NewPostForm;
