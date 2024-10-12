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

const usePersistSession = {
  name: "state",
  storage: createJSONStorage(() => sessionStorage),
};

// const useFriendStore = create(persist(friendStore, usePersist));
const useFriendStore = create(persist(friendStore, usePersistSession));
// const useFriendStore = create(friendStore);

export default useFriendStore;
