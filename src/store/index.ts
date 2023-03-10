import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

export interface State {
  adminData: any;
  pageHistory: any[];
}

export interface StoreActions {
  setAdminData: (data: any) => void;
  setPageHistory: (data: any) => void;
  resetState: () => void;
}

const initialState = {
  adminData: {},
  pageHistory: [],
};

export const useStore = create<State & StoreActions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        setAdminData: (data) => {
          set(
            {
              adminData: {
                ...data,
                email: data.email,
              },
            },
            undefined,
            "setAdminData"
          );
        },
        setPageHistory(data) {
          const history = get().pageHistory;
          const withoutDuplicates = history.filter(
            (item) => item.pathname !== data.pathname
          );
          set(
            {
              pageHistory: withoutDuplicates,
            },
            undefined,
            "setPageHistory"
          );
        },
        resetState: () => {
          set(initialState, undefined, "resetState");
        },
      }),
      {
        name: "shopit",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
