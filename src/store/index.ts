import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

type AdminDataType = {
  id: string;
  email: string;
  name: string;
  username: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  active: boolean;
  validateToken: string | null;
};

export interface State {
  adminData: AdminDataType;
  pageHistory: any[];
}

export interface StoreActions {
  setAdminData: (data: any) => void;
  setPageHistory: (data: any) => void;
  resetState: () => void;
}

const initialState = {
  adminData: {} as AdminDataType,
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
