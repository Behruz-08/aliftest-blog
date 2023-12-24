import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";
import PostList from "./components/postlist/PostList";
import PostDetails from "./components/postdetails/PostDetails";
import { fetchPosts, createPost } from "./api/Api";
import CreatePost from "./components/createpost/CreatePost";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPosts();
      setPosts(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleAddPost = async (newPost) => {
    try {
      const createdPost = await createPost(newPost);
      setPosts([...posts, createdPost]);
      console.log(createPost);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Container>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <Link to="/posts">
                  <button>Go to Post List</button>
                </Link>
              }
            />
            <Route path="/posts" element={<PostList posts={posts} />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            {/* <Route
              path="/createpost/:id"
              element={<CreatePost addPost={handleAddPost} />}
            /> */}
            <Route
              path="/CreatePost"
              element={<CreatePost handleAddPost={handleAddPost} />}
            />
          </Routes>
        )}
      </Container>
    </div>
  );
};

export default App;
