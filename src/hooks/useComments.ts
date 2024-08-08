import { useAppStore } from "../store";

export default function useComments() {
  const comments = useAppStore((state) => state.comments);
  const loading = useAppStore((state) => state.comments);
  const { getComments, getCommentsByPostId } = useAppStore.getState();
  return { comments, loading, getComments, getCommentsByPostId };
}
