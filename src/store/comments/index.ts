import { StateCreator } from "zustand";
import { fetchComments } from "../../api";
import { Comment } from "../../types";

interface CommentState {
  comments: Comment[];
  loadingComments: boolean;
  error: string | undefined;
}

interface CommentActions {
  getComments: () => void;
  getCommentsByPostId: (postId: number) => Comment[];
}

export type CommentSlice = CommentState & CommentActions;

export const createCommentsSlice: StateCreator<
  CommentState & CommentActions
> = (set, get) =>
  ({
    comments: [],
    loadingComments: false,
    error: undefined,
    getComments: async () => {
      try {
        set({ loadingComments: true });
        const comments = await fetchComments();
        set({ comments });
      } catch (error) {
        set({ error: "An error occured trying to fetch the comments" });
      } finally {
        set({ loadingComments: false });
      }
    },
    getCommentsByPostId: (postId: number) => {
      return get().comments.filter((comment) => comment.postId === postId);
    },
  } satisfies CommentSlice as CommentSlice);
