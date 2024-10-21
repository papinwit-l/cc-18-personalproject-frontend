import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import useFriendStore from "./friendStore";

const setFriend = useFriendStore.getState().setFriend;
const setActiveChat = useFriendStore.getState().setActiveChat;

const userStore = (set, get) => ({
  user: null,
  token: "",
  login: async (input) => {
    const res = await axios.post(
      import.meta.env.VITE_HOST_IP + "/auth/login",
      input
    );
    // console.log(res.data);
    set({ token: res.data.accessToken, user: res.data.user });
    return res.data;
  },
  logout: () => {
    set({ token: "", user: null });
    setFriend(null);
    setActiveChat(null);
  },
  register: async (input) => {
    const res = await axios.post(
      import.meta.env.VITE_HOST_IP + "/auth/register",
      input
    );
    // console.log(res.data);
    set({ token: res.data.accessToken, user: res.data.user });
    return res.data;
  },
  setUser: (user) => {
    set({ user: user });
  },
});

const usePersist = {
  name: "state",
  storage: createJSONStorage(() => localStorage),
};

const useUserStore = create(persist(userStore, usePersist));

export default useUserStore;
