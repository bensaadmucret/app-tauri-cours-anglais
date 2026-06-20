import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Card } from "@/db/schema";

export type View = "dashboard" | "study" | "builder" | "verbs" | "phrasal" | "translation" | "grammar" | "numbers" | "dictation";

interface PersistedState {
  xp: number;
  dailyGoal: number;
  lastReviewDate: string;
}

interface LearnState extends PersistedState {
  currentView: View;
  setView: (view: View) => void;

  sessionCards: Card[];
  currentIndex: number;
  sessionComplete: boolean;

  setSessionCards: (cards: Card[]) => void;
  nextCard: () => void;
  resetSession: () => void;
  addXp: (amount: number) => void;
  setDailyGoal: (goal: number) => void;

  currentCard: Card | null;
}

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

export const useLearnStore = create<LearnState>()(
  persist(
    (set, get) => ({
      currentView: "dashboard",
      setView: (view) => set({ currentView: view }),

      sessionCards: [],
      currentIndex: 0,
      sessionComplete: false,
      xp: 0,
      dailyGoal: 20,
      lastReviewDate: getToday(),

      setSessionCards: (cards) =>
        set({
          sessionCards: cards,
          currentIndex: 0,
          sessionComplete: cards.length === 0,
          currentCard: cards[0] ?? null,
        }),

      nextCard: () => {
        const next = get().currentIndex + 1;
        const cards = get().sessionCards;
        if (next >= cards.length) {
          set({ sessionComplete: true, currentCard: null });
        } else {
          set({ currentIndex: next, currentCard: cards[next] });
        }
      },

      resetSession: () =>
        set({
          sessionCards: [],
          currentIndex: 0,
          sessionComplete: false,
          currentCard: null,
        }),

      addXp: (amount) =>
        set((state) => {
          const today = getToday();
          if (state.lastReviewDate !== today) {
            return { xp: amount, lastReviewDate: today };
          }
          return { xp: state.xp + amount };
        }),

      setDailyGoal: (goal) => set({ dailyGoal: goal }),

      currentCard: null,
    }),
    {
      name: "learn-store",
      partialize: (state) => ({
        xp: state.xp,
        dailyGoal: state.dailyGoal,
        lastReviewDate: state.lastReviewDate,
      }),
    }
  )
);
