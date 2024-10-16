import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const friendStore = (set, get) => ({
  friend: null,
  setFriend: (friend) => {
    set({ friend: friend });
  },
  activeChat: null,
  setActiveChat: (chat) => {
    set({ activeChat: chat });
  },
  activeGroup: null,
  setActiveGroup: (group) => {
    set({ activeGroup: group });
  },
  activeGroupPending: null,
  setActiveGroupPending: (pending) => {
    set({ activeGroupPending: pending });
  },
  activeProfile: null,
  setActiveProfile: (profile) => {
    set({ activeProfile: profile });
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
