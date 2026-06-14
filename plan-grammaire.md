# Plan : Section Grammaire

## Vue d'ensemble
Ajouter un module d'apprentissage de la grammaire anglaise structuré en leçons + exercices interactifs, avec suivi de progression.

---

## 1. Base de données

### Migration SQL (`06_grammar.sql`)
```sql
CREATE TABLE IF NOT EXISTS grammar_lessons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  content TEXT NOT NULL,       -- explication en markdown/HTML
  category TEXT DEFAULT 'general',
  level TEXT CHECK(level IN ('A1','A2','B1','B2','C1','C2')) DEFAULT 'B1',
  order_index INTEGER DEFAULT 0,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS grammar_exercises (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  lesson_id INTEGER NOT NULL,
  type TEXT CHECK(type IN ('qcm','fill_blank','reorder','match')) NOT NULL,
  question TEXT NOT NULL,
  options TEXT,                -- JSON pour QCM
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  points INTEGER DEFAULT 1,
  order_index INTEGER DEFAULT 0,
  FOREIGN KEY (lesson_id) REFERENCES grammar_lessons(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS grammar_progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  lesson_id INTEGER NOT NULL UNIQUE,
  completed INTEGER DEFAULT 0,
  score INTEGER DEFAULT 0,
  total INTEGER DEFAULT 0,
  last_exercise_id INTEGER,
  completed_at INTEGER,
  FOREIGN KEY (lesson_id) REFERENCES grammar_lessons(id) ON DELETE CASCADE
);
```

### Contenu initial (~30 leçons)

| Catégorie | Leçons |
|-----------|--------|
| **Les temps** | Présent simple/continu, Prétérit, Present perfect simple/continu, Past perfect, Futur (will/be going to), Futur perfect, Conditionnel présent/passé |
| **Modaux** | can/could, must/have to, should/ought to, may/might, shall/will, need/dare |
| **Adverbes** | De fréquence, De manière, De lieu/temps, Degré (too/enough), encore/anymore/still/yet |
| **Prépositions** | De lieu (in/on/at), De temps (in/on/at/for/since), De mouvement (to/into/across/past), Phrasal prepositions |
| **Conjonctions** | Coordinating (and/but/or/so/yet), Subordinating (although/because/unless/if/when/while), Correlative (both...and/either...or/neither...nor) |
| **Déterminants** | Articles (a/an/the), Quantifiers (some/any/much/many), Démonstratifs (this/that/these/those), Possessifs |
| **Pronoms** | Personnels, Possessifs, Réflexifs, Relatifs, Interrogatifs, Indéfinis |
| **Structures** | Passif (be + past participle), Reported speech, Conditionnel (if 0-1-2-3), Wishes/regrets, Causative (have/get something done) |
| **Syntaxe** | Ordre des mots, Inversion, Question tags, Relatives (defining/non-defining), Cleft sentences, Emphatic do |

---

## 2. Types d'exercices interactifs

1. **QCM** — Choisir la bonne forme grammaticale
   > *"She ___ to London last week."* → a) goes / b) went / c) has gone / d) going

2. **Fill in the blank** — Compléter avec la bonne forme
   > *"If I ___ (be) you, I would accept."*

3. **Reorder** — Réordonner les mots pour former une phrase correcte
   > *"never / I / been / have / there"*

4. **Match** — Relier une règle à son exemple

---

## 3. Composants React

### `Grammar.tsx` (vue principale)
- **Mode "Leçons"** : grille de leçons par catégorie/niveau
  - Indicateur de progression (barre ou pourcentage)
  - Étoile si complété
- **Mode "Exercice"** : interface d'exercice interactive
  - Question en haut
  - Zone de réponse selon le type
  - Feedback immédiat (juste/faux + explication)
  - Barre de progression de la session
- **Mode "Résultat"** : score final + récapitulatif des erreurs + bouton "Recommencer"

### `GrammarLesson.tsx`
- Affiche le contenu de la leçon (texte + exemples)
- Bouton "Passer à l'exercice"

### Filtres
- Par niveau CECRL (A1 → C2)
- Par catégorie
- Par statut (tous / en cours / complétés)

---

## 4. Flux utilisateur

```
Dashboard → "Grammaire" → Liste des leçons
                                 ↓
                    ┌────────────┼────────────┐
                    ↓            ↓            ↓
               (Nouveau)    (En cours)   (Complété)
                    ↓            ↓            ↓
              Lire leçon   Reprendre      Réviser
                    ↓            ↓            ↓
               Faire exos   Continuer    Exercices
                    ↓            ↓            ↓
              Sauvegarder   Sauvegarder   Sauvegarder
```

---

## 5. API / Queries (`src/db/queries.ts`)

```typescript
getGrammarLessons(level?, category?)      // Liste filtrée
getGrammarLessonBySlug(slug)               // Détail d'une leçon
getGrammarExercises(lessonId)             // Exercices d'une leçon
getGrammarProgress()                       // Progression globale
getGrammarProgressByLesson(lessonId)       // Progression d'une leçon
saveGrammarProgress(lessonId, score, total) // Sauvegarder
```

---

## 6. Store & Navigation

- Ajouter `'grammar'` dans `View` du store Zustand
- Bouton "Grammaire" dans le Dashboard (icône : `BookOpen`)

---

## 7. Détails UX

- **Feedback** : animation verte si juste, rouge si faux avec explication
- **XP** : +1 XP par bonne réponse
- **Sauvegarde** : après chaque exercice, pas à la fin de la leçon
- **Reprise** : si l'utilisateur quitte en cours, il revient au même exercice

---

## Ordre d'implémentation suggéré

1. Migration SQL `06_grammar.sql`
2. `main.rs` — ajouter migration v6
3. Types dans `schema.ts`
4. Queries dans `queries.ts`
5. Composant `Grammar.tsx`
6. Intégration Dashboard + App + Store
7. Seed des 30 leçons + exercices
8. Tester et push
