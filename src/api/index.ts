import axios from "axios";
import { config } from "../config";
import { Post, User, Comment } from "../types";

const api = axios.create({
  baseURL: config().baseURL,
});

const fetchPosts = async () => {
  const response = await api.get<Post[]>("/posts");
  return response.data;
};

const fetchComments = async () => {
  const response = await api.get<Comment[]>(`/comments`);
  return response.data;
};

const fetchUsers = async () => {
  const response = await api.get<User[]>(`/users`);
  return response.data;
};

export { fetchPosts, fetchComments, fetchUsers };
