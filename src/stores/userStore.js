import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import socketIO from "socket.io-client";

const userStore = (set, get) => ({
  user: null,
  token: "",
  login: async (input) => {
    const res = await axios.post("http://localhost:8000/auth/login", input);
    console.log(res.data);
    set({ token: res.data.accessToken, user: res.data.user });
    return res.data;
  },
  logout: () => {
    set({ token: "", user: null });
  },
  register: async (input) => {
    const res = await axios.post("http://localhost:8000/auth/register", input);
    console.log(res.data);
    set({ token: res.data.accessToken, user: res.data.user });
    return res.data;
  },
});

const usePersist = {
  name: "state",
  storage: createJSONStorage(() => localStorage),
};

const useUserStore = create(persist(userStore, usePersist));

export default useUserStore;
