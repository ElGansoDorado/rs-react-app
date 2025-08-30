import { persist, createJSONStorage } from 'zustand/middleware';
import { create } from 'zustand';

interface ConfigState {
  config: string[];
  search: string;
  year: number;
  setSearch: (str: string) => void;
  setConfig: (str: string) => void;
  setYear: (newYear: number) => void;
}

export const useConfig = create<ConfigState>()(
  persist(
    (set, get) => ({
      config: [],
      search: '',
      year: 2023,

      setSearch: (str) => {
        set({ search: str });
      },

      setConfig: (str) => {
        const configList = get().config;

        if (configList.includes(str)) {
          set({ config: configList.filter((item) => str !== item) });
        } else {
          set({ config: [...configList, str] });
        }
      },

      setYear: (newYear) => {
        set({ year: newYear });
      },
    }),
    {
      name: 'CONFIG-STORAGE',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
