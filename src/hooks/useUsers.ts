import { useAppStore } from "../store";

export default function useUsers() {
  const users = useAppStore((state) => state.users);
  const loading = useAppStore((state) => state.loadingUsers);
  const { getUsers, getUserById } = useAppStore.getState();
  return { users, loading, getUsers, getUserById };
}
