import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Card } from "@/db/schema";

export type View = "dashboard" | "study" | "builder" | "verbs" | "phrasal" | "translation" | "grammar" | "numbers" | "dictation" | "stats" | "settings" | "matching" | "listening" | "mixed" | "builder-sentences" | "tenses" | "prepositions" | "vocabulary";

interface PersistedState {
  xp: number;
  dailyGoal: number;
  lastReviewDate: string;
  theme: "dark" | "light";
  streak: number;
  lastStreakDate: string;
  soundEnabled: boolean;
}

interface LearnState extends PersistedState {
  currentView: View;
  setView: (view: View) => void;

  sessionCards: Card[];
  currentIndex: number;
  sessionComplete: boolean;
  cramMode: boolean;

  setSessionCards: (cards: Card[]) => void;
  nextCard: () => void;
  resetSession: () => void;
  addXp: (amount: number) => void;
  setDailyGoal: (goal: number) => void;
  toggleTheme: () => void;
  toggleSound: () => void;
  setCramMode: (enabled: boolean) => void;

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
      theme: "dark",
      streak: 0,
      lastStreakDate: "",
      soundEnabled: true,
      cramMode: false,

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
          let newStreak = state.streak;
          let newLastStreakDate = state.lastStreakDate;
          if (state.lastStreakDate !== today) {
            const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
            if (state.lastStreakDate === yesterday) {
              newStreak = state.streak + 1;
            } else {
              newStreak = 1;
            }
            newLastStreakDate = today;
            return { xp: amount, lastReviewDate: today, streak: newStreak, lastStreakDate: newLastStreakDate };
          }
          return { xp: state.xp + amount };
        }),

      setDailyGoal: (goal) => set({ dailyGoal: goal }),

      toggleTheme: () => set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),

      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),

      setCramMode: (enabled) => set({ cramMode: enabled }),

      currentCard: null,
    }),
    {
      name: "learn-store",
      partialize: (state) => ({
        xp: state.xp,
        dailyGoal: state.dailyGoal,
        lastReviewDate: state.lastReviewDate,
        theme: state.theme,
        streak: state.streak,
        lastStreakDate: state.lastStreakDate,
        soundEnabled: state.soundEnabled,
      }),
    }
  )
);
