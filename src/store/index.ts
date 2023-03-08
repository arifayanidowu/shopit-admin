import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

export interface State {
  adminData: any;
  pageHistory: any[];
}

export interface StoreActions {
  setAdminData: (data: any) => void;
  setPageHistory: (data: any) => void;
}

const initialState = {
  adminData: {},
  pageHistory: [],
};

export const useStore = create<State & StoreActions>()(
  devtools(
    persist(
      (set) => ({
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
          const mapper = new Map();
          mapper.set(data?.pathname, data.pathname);
          set(
            {
              pageHistory: Array.from(mapper, ([key, pathname]) => ({
                key,
                pathname,
              })),
            },
            undefined,
            "setPageHistory"
          );
        },
      }),
      { name: "shopit", storage: createJSONStorage(() => localStorage) }
    )
  )
);
