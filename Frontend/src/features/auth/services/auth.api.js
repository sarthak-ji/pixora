import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,  // means jo token cookies ke ander stored hai usse yahan pe padha jaa sake!
});

export async function register(username, email, password) {
  const response = await api.post("/register", {
    username,
    email,
    password,
  });

  return response.data;
}

export async function login(username, password) {
  const response = await api.post("/login", {
    username,
    password,
  });

  return response.data;
}

export async function getMe(){
    const response = await api.get("/getMe");
    return response.data;
}