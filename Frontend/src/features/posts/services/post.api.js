import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});


export async function getFeed() {
  const response = await api.get("/api/posts/feed");
  return response.data;
}


export async function createPost(formData) {


  formData.append("chacha", imageFile);
  formData.append('caption', caption);

  const response = await api.post("/api/posts", formData);
  return response.data;
}


export async function likePost(postId) {
  const response = await api.post("/api/posts/like/" + postId);
  return response.data;
}

export async function disLikePost(postId) {
    const response = await api.post("/api/posts/dislike/" + postId)
    return response.data
}

// // Add a comment to a post
// export async function addComment(postId, text) {
//   const response = await api.post(`/${postId}/comment`, { text });
//   return response.data;
// }

// // Delete a post by id
// export async function deletePost(postId) {
//   const response = await api.delete(`/${postId}`);
//   return response.data;
// }
