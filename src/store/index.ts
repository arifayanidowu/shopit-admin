import { create } from "zustand";
import {
  devtools,
  persist,
  createJSONStorage,
  StateStorage,
} from "zustand/middleware";

const hashStorage: StateStorage = {
  getItem: (key): string => {
    const searchParams = new URLSearchParams(window.location.hash.slice(1));
    const storedValue = searchParams.get(key)!;
    return JSON.parse(storedValue);
  },
  setItem: (key, newValue): void => {
    const searchParams = new URLSearchParams(window.location.hash.slice(1));
    searchParams.set(key, JSON.stringify(newValue));
    window.location.hash = searchParams.toString();
  },
  removeItem: (key): void => {
    const searchParams = new URLSearchParams(window.location.hash.slice(1));
    searchParams.delete(key);
    window.location.hash = searchParams.toString();
  },
};

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
      {
        name: "shopit",
        storage: createJSONStorage(() => hashStorage),
      }
    )
  )
);
