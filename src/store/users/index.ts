import { StateCreator } from "zustand";
import { User } from "../../types";
import { fetchUsers } from "../../api";

interface UserState {
  users: User[];
  loading: boolean;
  error: string | undefined;
}

interface UserActions {
  getUsers: () => void;
}

export type UserSlice = UserState & UserActions;

export const createUserslice: StateCreator<UserSlice> = (set) => ({
  users: [],
  loading: false,
  error: undefined,
  getUsers: async () => {
    try {
      set({ loading: true });
      const users = await fetchUsers();
      set({ users });
    } catch (error) {
      set({ error: "An error occured trying to fetch the users" });
    } finally {
      set({ loading: false });
    }
  },
});
