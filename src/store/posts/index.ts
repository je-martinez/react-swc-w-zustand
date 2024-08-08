import { StateCreator } from "zustand";
import { Post } from "../../types";
import { fetchPosts } from "../../api";

interface PostState {
  posts: Post[];
  loadingPosts: boolean;
  error: string | undefined;
}

interface PostActions {
  getPosts: () => void;
  getPostsByUserId: (userId: number) => Post[];
  getPostById: (postId: number) => Post | undefined;
}

export type PostSlice = PostState & PostActions;

export const createPostsSlice: StateCreator<PostSlice> = (set, get) =>
  ({
    posts: [],
    loadingPosts: false,
    error: undefined,
    getPosts: async () => {
      try {
        set({ loadingPosts: true });
        const posts = await fetchPosts();
        set({ posts });
      } catch (error) {
        set({ error: "An error occured trying to fetch the users" });
      } finally {
        set({ loadingPosts: false });
      }
    },
    getPostsByUserId: (userId: number) => {
      return get().posts.filter((post) => post.userId === userId);
    },
    getPostById: (postId: number) => {
      return get().posts.find((post) => post.id === postId);
    },
  } satisfies PostSlice as PostSlice);
