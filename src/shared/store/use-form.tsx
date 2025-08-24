import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface FormState {
  formOne: boolean;
  formTwo: boolean;

  showFormOne: () => void;
  closeFormOne: () => void;

  showFormTwo: () => void;
  closeFormTwo: () => void;
}

export const useShowForm = create<FormState>()(
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

      showFormTwo: () => {
        set({ formTwo: !get().formOne });
      },

      closeFormTwo: () => {
        set({ formTwo: false });
      },
    }),
    {
      name: 'USER-STORAGE',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
