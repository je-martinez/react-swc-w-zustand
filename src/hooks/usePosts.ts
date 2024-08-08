import { useAppStore } from "../store";

export default function usePosts() {
  const posts = useAppStore((state) => state.posts);
  const loading = useAppStore((state) => state.loadingPosts);
  const { getPosts, getPostsByUserId, getPostById } = useAppStore.getState();
  return { posts, loading, getPosts, getPostsByUserId, getPostById };
}
