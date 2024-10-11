import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";

const friendStore = (set, get) => ({
  friend: null,
  setFriend: (friend) => {
    set({ friend: friend });
  },
  activeChat: null,
  setActiveChat: (chat) => {
    set({ activeChat: chat });
  },
});

const usePersist = {
  name: "state",
  storage: createJSONStorage(() => localStorage),
};

const useFriendStore = create(persist(friendStore, usePersist));

export default useFriendStore;
