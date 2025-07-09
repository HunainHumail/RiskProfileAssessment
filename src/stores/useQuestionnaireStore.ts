import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Answer = {
  questionId: number;
  selectedOptionScore: number;
};

export interface QuestionnaireState {
  answers: Answer[];
  currentIndex: number;
  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
  addAnswer: (questionId: number, selectedOptionScore: number) => void;
  setCurrentIndex: (index: number) => void;
  reset: () => void;
}

export const useQuestionnaireStore = create<QuestionnaireState>()(
  persist(
    (set, get) => ({
      answers: [],
      currentIndex: 0,
      hasHydrated: false,
      setHasHydrated: (value) => set({ hasHydrated: value }),
      addAnswer: (questionId, selectedOptionScore) =>
        set((state) => ({
          answers: [
            ...state.answers.filter((a) => a.questionId !== questionId),
            { questionId, selectedOptionScore },
          ],
        })),
      setCurrentIndex: (index) => set({ currentIndex: index }),
      reset: () => set({ answers: [], currentIndex: 0 }),
    }),
    {
      name: 'questionnaire-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        console.log('🧠 Zustand store hydrated');
        state?.setHasHydrated(true);
      },
    }
  )
);
