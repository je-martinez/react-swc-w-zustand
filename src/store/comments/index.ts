import { StateCreator } from "zustand";
import { fetchComments } from "../../api";
import { Comment } from "../../types";

interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string | undefined;
}

interface CommentActions {
  getComments: () => void;
}

export type CommentSlice = CommentState & CommentActions;

export const createCommentsSlice: StateCreator<
  CommentState & CommentActions
> = (set) => ({
  comments: [],
  loading: false,
  error: undefined,
  getComments: async () => {
    try {
      set({ loading: true });
      const comments = await fetchComments();
      set({ comments });
    } catch (error) {
      set({ error: "An error occured trying to fetch the comments" });
    } finally {
      set({ loading: false });
    }
  },
});
