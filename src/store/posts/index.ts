import { StateCreator } from "zustand";
import { Post } from "../../types";
import { fetchPosts } from "../../api";

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | undefined;
}

interface PostActions {
  getPosts: () => void;
}

export type PostSlice = PostState & PostActions;

export const createPostsSlice: StateCreator<PostSlice> = (set) => ({
  posts: [],
  loading: false,
  error: undefined,
  getPosts: async () => {
    try {
      set({ loading: true });
      const posts = await fetchPosts();
      set({ posts });
    } catch (error) {
      set({ error: "An error occured trying to fetch the users" });
    } finally {
      set({ loading: false });
    }
  },
});
