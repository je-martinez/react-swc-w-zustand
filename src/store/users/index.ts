import { StateCreator } from "zustand";
import { fetchUsers } from "../../api";
import { User } from "../../types";

interface UserState {
  users: User[];
  loadingUsers: boolean;
  error: string | undefined;
}

interface UserActions {
  getUsers: () => void;
  getUserById: (userId: number) => User | undefined;
}

export type UserSlice = UserState & UserActions;

export const createUserslice: StateCreator<UserSlice> = (set, get) =>
  ({
    users: [],
    loadingUsers: false,
    error: undefined,
    getUsers: async () => {
      try {
        set({ loadingUsers: true });
        const users = await fetchUsers();
        set({ users });
      } catch (error) {
        set({ error: "An error occured trying to fetch the users" });
      } finally {
        set({ loadingUsers: false });
      }
    },
    getUserById: (userId: number) => {
      return get().users.find((user) => user.id === userId);
    },
  } satisfies UserSlice as UserSlice);
