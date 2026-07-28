import { createEmptyCard, fsrs, generatorParameters, Rating, State } from "ts-fsrs";
import type { Card } from "@/db/schema";
import type { RecordLogItem, Grade } from "ts-fsrs";

const params = generatorParameters({ request_retention: 0.9 });
export const f = fsrs(params);

export function createNewTsFsrsCard() {
  return createEmptyCard();
}

export interface TsFsrsCard {
  due: Date;
  stability: number;
  difficulty: number;
  elapsed_days: number;
  scheduled_days: number;
  reps: number;
  lapses: number;
  state: State;
  last_review?: Date;
}

export function tsFsrsCardFromDb(card: Card): TsFsrsCard {
  return {
    due: new Date(card.due * 1000),
    stability: card.stability,
    difficulty: card.difficulty,
    elapsed_days: card.elapsed_days,
    scheduled_days: card.scheduled_days,
    reps: card.reps,
    lapses: card.lapses,
    state: card.state as State,
    last_review: card.last_review ? new Date(card.last_review * 1000) : undefined,
  };
}

export function dbCardFromTsFsrs(
  tsCard: TsFsrsCard
) {
  return {
    due: Math.floor(tsCard.due.getTime() / 1000),
    stability: tsCard.stability,
    difficulty: tsCard.difficulty,
    elapsed_days: tsCard.elapsed_days,
    scheduled_days: tsCard.scheduled_days,
    reps: tsCard.reps,
    lapses: tsCard.lapses,
    state: tsCard.state as number,
    last_review: tsCard.last_review
      ? Math.floor(tsCard.last_review.getTime() / 1000)
      : Math.floor(Date.now() / 1000),
  };
}

export function rateCard(dbCard: Card, rating: Rating) {
  const tsCard = tsFsrsCardFromDb(dbCard);
  const scheduling = f.repeat(tsCard, new Date());
  const result: RecordLogItem = scheduling[rating as Grade];
  return {
    updated: dbCardFromTsFsrs(result.card),
    log: {
      card_id: dbCard.id,
      rating: result.log.rating as number,
      state: result.log.state as number,
      due: Math.floor(result.log.due.getTime() / 1000),
      stability: result.log.stability,
      difficulty: result.log.difficulty,
      elapsed_days: result.log.elapsed_days,
      last_elapsed_days: result.log.last_elapsed_days,
      scheduled_days: result.log.scheduled_days,
      review: Math.floor(result.log.review.getTime() / 1000),
    },
  };
}

export { Rating, State };
