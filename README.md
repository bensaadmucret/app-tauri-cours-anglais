# Cours Anglais

Application de bureau pour apprendre l'anglais, construite avec **Tauri** (Rust) + **React** + **TailwindCSS**.

## Fonctionnalités

- **Cartes de révision (Flashcards)** — Algorithme FSRS pour la mémorisation optimale
- **Verbes irréguliers** — Mode apprentissage séquentiel, quiz aveugle et flashcards
- **Synthèse vocale** — Écoute des prononciations directement dans l'app
- **Progression XP** — Système de points pour suivre ton avancement
- **Base de données SQLite locale** — Tout est stocké sur ton ordinateur

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Frontend | React 18 + TypeScript + Vite |
| Styling | TailwindCSS + Framer Motion |
| State | Zustand |
| Backend | Tauri 2 (Rust) |
| Base de données | SQLite via `tauri-plugin-sql` |
| Algorithme révision | ts-fsrs |

## Prérequis

- [Node.js](https://nodejs.org/) + [pnpm](https://pnpm.io/)
- [Rust](https://rustup.rs/)

## Installation

```bash
pnpm install
```

## Lancer en développement

```bash
pnpm tauri dev
```

## Build

```bash
pnpm tauri build
```

## Structure du projet

```
src/
  components/   — Composants réutilisables
  views/        — Pages (Dashboard, StudySession, IrregularVerbs...)
  db/           — Types et requêtes SQLite
  store/        — Zustand store
  hooks/        — Hooks personnalisés (TTS, speech recognition)
src-tauri/
  src/          — Code Rust (main.rs)
  migrations/   — Migrations SQL
```

## Licence

GPL v3 — Copyright (C) 2026 Mohammed Bensaadmucret
