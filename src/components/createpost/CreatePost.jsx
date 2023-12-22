import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    marginTop: "2rem",
  },
  textField: {
    width: "300px",
  },
  button: {
    marginTop: "5rem",
  },
  modal: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[8],
    padding: theme.spacing(2, 4, 3),
    width: "500px",
    height: "400px",
  },
}));

const CreatePost = ({ addPost }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPost = {
      title,
      body,
    };
    addPost(newPost);
    setTitle("");
    setBody("");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/posts");
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        type="submit"
      >
        Add Post
      </Button>

      <Modal
        className={classes.modal}
        open={showModal}
        onClose={handleCloseModal}
      >
        <div className={classes.modalContent}>
          <h2>Добавьте пост !</h2>
          <div>
            <div>
              <TextField
                className={classes.textField}
                type="text"
                label="Title"
                value={title}
                onChange={handleTitleChange}
                required
              />
            </div>
            <div>
              <TextField
                className={classes.textField}
                type="text"
                label="Body"
                value={body}
                onChange={handleBodyChange}
                required
                multiline
                rows={4}
              />
            </div>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              type="submit"
            >
              Сохранить
            </Button>
          </div>
          {/* <p>Your new post has been added.</p> */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleCloseModal}
          >
            X
          </Button>
        </div>
      </Modal>
    </form>
  );
};

export default CreatePost;
