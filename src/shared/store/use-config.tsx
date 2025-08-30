import { persist, createJSONStorage } from 'zustand/middleware';
import { create } from 'zustand';

interface ConfigState {
  config: string[];
  search: string;
  updateSearch: (str: string) => void;
  updateConfig: (str: string) => void;
}

export const useConfig = create<ConfigState>()(
  persist(
    (set, get) => ({
      config: [],
      search: '',

      updateSearch: (str) => {
        set({ search: str });
      },

      updateConfig: (str) => {
        const configList = get().config;

        if (configList.includes(str)) {
          set({ config: configList.filter((item) => str !== item) });
        } else {
          set({ config: [...configList, str] });
        }
      },
    }),
    {
      name: 'CONFIG-STORAGE',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
