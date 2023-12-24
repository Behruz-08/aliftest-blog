export const fetchPosts = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createPost = async (newPost) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create post");
  }
};
