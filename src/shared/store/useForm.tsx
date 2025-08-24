import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface BagState {
  formOne: boolean;
  formTwo: boolean;

  showFormOne: () => void;
  closeFormOne: () => void;
}

export const useShowForm = create<BagState>()(
  persist(
    (set, get) => ({
      formOne: false,
      formTwo: false,

      showFormOne: () => {
        set({ formOne: !get().formOne });
      },

      closeFormOne: () => {
        set({ formOne: false });
      },
    }),
    {
      name: 'USER-STORAGE',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
