import { useQuery } from "@tanstack/react-query";
import { getStats, getDueCards, getAllCards } from "@/db/queries";

export function useStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: getStats,
  });
}

export function useDueCards() {
  return useQuery({
    queryKey: ["dueCards"],
    queryFn: () => getDueCards(1),
  });
}

export function useAllCards() {
  return useQuery({
    queryKey: ["allCards"],
    queryFn: getAllCards,
  });
}
