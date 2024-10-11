import { act } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const utilStore = (set, get) => ({
  activePage: location.pathname == "/" ? "chat" : location.pathname,
  setActivePage: (page) => {
    set({ activePage: page });
  },
});

const usePersist = {
  name: "state",
  storage: createJSONStorage(() => sessionStorage),
};

const useUtilStore = create(persist(utilStore, usePersist));

export default useUtilStore;
