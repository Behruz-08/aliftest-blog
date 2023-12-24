import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import CreatePost from "../createpost/CreatePost";

const useStyles = makeStyles((theme) => ({
  select: {
    fontSize: "0.8rem",
    padding: theme.spacing(1),
    width: "12rem",
    height: "2rem",
    marginLeft: "10rem",
  },
  container: {
    padding: theme.spacing(2),
    margin: theme.spacing(4),
    boxShadow: "0 0 15px 1px rgba(0, 0, 0, 0.5)",
  },
  textField: {
    marginBottom: theme.spacing(1),
  },
  postContainer: {
    marginBottom: theme.spacing(4),
    padding: theme.spacing(2),
    boxShadow: "0 0 15px 1px rgba(0, 0, 0, 0.3)",
  },
  button: {
    marginRight: theme.spacing(3),
  },
  deleteButton: {
    color: "red",
  },
  smallButton: {
    width: "100px",
    height: "32px",
    fontSize: "0.8rem",
    padding: "6px 12px",
  },
}));

function PostList({ posts }) {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  const classes = useStyles();

  const filteredPosts = posts
    .filter((post) => post.title.toLowerCase().includes(filter.toLowerCase()))
    .slice(0, itemsPerPage);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteClick = (postId) => {
    setDeleteConfirmation(postId);
  };

  const handleDeleteConfirmation = () => {
    setDeleteConfirmation(null);
  };

  const handleCloseConfirmation = () => {
    setDeleteConfirmation(null);
  };

  return (
    <div className={classes.container}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <TextField
            className={classes.textField}
            type="text"
            placeholder="Фильтр постов по имени"
            value={filter}
            onChange={handleFilterChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Select
            value={itemsPerPage}
            onChange={(event) => setItemsPerPage(Number(event.target.value))}
            fullWidth
            variant="outlined"
            className={classes.select}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={4}>
          {/* <Button variant="contained" color="primary" onClick={handleOpenModal}>
            Создать пост
          </Button> */}
          <CreatePost />
        </Grid>
      </Grid>

      {filteredPosts.map((post) => (
        <div key={post.id} className={classes.postContainer}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <Link to={`/posts/${post.id}`}>Подробнее</Link>
          <button
            className={classes.deleteButton}
            onClick={() => handleDeleteClick(post.id)}
          >
            Удалить
          </button>
        </div>
      ))}

      {currentPosts.map((post) => (
        <div key={post.id} className={classes.postContainer}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <Link to={`/posts/${post.id}`}>Подробнее</Link>
        </div>
      ))}

      <Dialog
        open={Boolean(deleteConfirmation)}
        onClose={handleCloseConfirmation}
      >
        <DialogTitle>Удаление поста</DialogTitle>
        <DialogContent>
          <p>Вы уверены, что хотите удалить этот пост?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation} color="primary">
            Отмена
          </Button>
          <Button onClick={handleDeleteConfirmation} color="primary">
            Удалить
          </Button>
        </DialogActions>
      </Dialog>

      <div>
        {Array.from({ length: Math.ceil(posts.length / itemsPerPage) }).map(
          (currentPage, index) => (
            <Button
              key={index}
              className={classes.button}
              variant="contained"
              color={currentPage === index + 1 ? "primary" : "default"}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Button>
          )
        )}
      </div>
    </div>
  );
}

export default PostList;
