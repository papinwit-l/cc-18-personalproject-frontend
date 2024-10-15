import { act } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const utilStore = (set, get) => ({
  messageImageModal: "",
  setMessageImageModal: (imgUrl) => {
    set({ messageImageModal: imgUrl });
  },
  groupMessageImageModal: "",
  setGroupMessageImageModal: (imgUrl) => {
    set({ groupMessageImageModal: imgUrl });
  },
  groupPending: [],
  setGroupPending: (pending) => {
    set({ groupPending: pending });
  },
});

const usePersist = {
  name: "state",
  storage: createJSONStorage(() => sessionStorage),
};

// const useUtilStore = create(persist(utilStore, usePersist));
const useUtilStore = create(utilStore);

export default useUtilStore;
