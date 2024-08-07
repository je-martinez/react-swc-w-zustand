import { create } from "zustand";
import { createPostsSlice, PostSlice } from "./posts";
import { createCommentsSlice, CommentSlice } from "./comments";
import { createUserslice, UserSlice } from "./users";

type AppState = PostSlice & CommentSlice & UserSlice;

const useAppStore = create<AppState>()((...a) => ({
  ...createUserslice(...a),
  ...createCommentsSlice(...a),
  ...createPostsSlice(...a),
}));

export { useAppStore };
