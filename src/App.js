import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";
import PostList from "./components/postlist/PostList";
import PostDetails from "./components/postdetails/PostDetails";
import { fetchPosts, createPost } from "./api/Api";
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
    const createdPost = await createPost(newPost);
    setPosts([...posts, createdPost]);
  };

  return (
    <div>
      <Container>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Routes>
            {/* <Link to="/posts">Перейти к списку</Link> */}
            <Route
              path="/posts"
              element={<PostList posts={posts} handleAddPost={handleAddPost} />}
            />
            <Route path="/posts/:id" element={<PostDetails />} />
          </Routes>
        )}
      </Container>
    </div>
  );
};

export default App;
