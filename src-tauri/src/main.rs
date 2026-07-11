// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations(
                    "sqlite:cours-anglais.db",
                    vec![
                        tauri_plugin_sql::Migration {
                            version: 1,
                            description: "init schema",
                            sql: include_str!("../migrations/01_init_schema.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 2,
                            description: "irregular verbs",
                            sql: include_str!("../migrations/02_irregular_verbs.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 3,
                            description: "phrasal verbs",
                            sql: include_str!("../migrations/03_phrasal_verbs.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 4,
                            description: "translation exercises",
                            sql: include_str!("../migrations/04_translation_exercises.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 5,
                            description: "translation progress",
                            sql: include_str!("../migrations/05_translation_progress.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 6,
                            description: "grammar lessons and exercises",
                            sql: include_str!("../migrations/06_grammar.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 7,
                            description: "add french translation to cards",
                            sql: include_str!("../migrations/07_add_translation_fr_to_cards.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 8,
                            description: "long translation exercises",
                            sql: include_str!("../migrations/08_long_translation_exercises.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 9,
                            description: "news articles cache table",
                            sql: include_str!("../migrations/09_news_articles.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 10,
                            description: "extended translation exercises",
                            sql: include_str!("../migrations/10_extended_translation_exercises.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 11,
                            description: "number exercises",
                            sql: include_str!("../migrations/11_number_exercises.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 12,
                            description: "grammar translations 1-5",
                            sql: include_str!("../migrations/12_grammar_add_translations_1_5.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 13,
                            description: "grammar translations 6-10",
                            sql: include_str!("../migrations/13_grammar_add_translations_6_10.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 14,
                            description: "grammar translations 11-15",
                            sql: include_str!("../migrations/14_grammar_add_translations_11_15.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 15,
                            description: "grammar translations 16-23",
                            sql: include_str!("../migrations/15_grammar_add_translations_16_23.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 16,
                            description: "grammar translations 24-35",
                            sql: include_str!("../migrations/16_grammar_add_translations_24_35.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 17,
                            description: "grammar translations 36-50",
                            sql: include_str!("../migrations/17_grammar_add_translations_36_50.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 18,
                            description: "grammar translations 51-75",
                            sql: include_str!("../migrations/18_grammar_add_translations_51_75.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 19,
                            description: "grammar translations 76-85",
                            sql: include_str!("../migrations/19_grammar_add_translations_76_85.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 20,
                            description: "grammar translations 86-110",
                            sql: include_str!("../migrations/20_grammar_add_translations_86_110.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 21,
                            description: "dictation sentences",
                            sql: include_str!("../migrations/21_dictation_sentences.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 22,
                            description: "everyday translation exercises",
                            sql: include_str!("../migrations/22_everyday_translation_exercises.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 23,
                            description: "dictation work health education technology",
                            sql: include_str!("../migrations/23_dictation_work_health.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 24,
                            description: "translation exercises work health education technology",
                            sql: include_str!("../migrations/24_everyday_translation_exercises.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 25,
                            description: "dictation travel",
                            sql: include_str!("../migrations/25_dictation_travel.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 26,
                            description: "phrasal verbs travel from Vocable",
                            sql: include_str!("../migrations/26_phrasal_verbs_travel.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 27,
                            description: "grammar lessons from Vocable (conditionals, reported speech, question tags)",
                            sql: include_str!("../migrations/27_grammar_vocable.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 28,
                            description: "vocabulary flashcards from Vocable (environment, travel, business, technology)",
                            sql: include_str!("../migrations/28_vocabulary_vocable.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 29,
                            description: "dictation sentences from Vocable (technology, environment, work, fashion, sport, education, travel)",
                            sql: include_str!("../migrations/29_dictation_vocable.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 30,
                            description: "translation exercises from Vocable articles",
                            sql: include_str!("../migrations/30_translation_vocable.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 31,
                            description: "dictation sentences from Vocable Mars 2025 p13-20 (music, social media, conversation, volunteering)",
                            sql: include_str!("../migrations/31_dictation_vocable2.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 32,
                            description: "translation exercises from Vocable Mars 2025 p13-20",
                            sql: include_str!("../migrations/32_translation_vocable2.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 33,
                            description: "vocabulary flashcards from Vocable Mars 2025 p13-20 (music, social media, conversation, volunteering)",
                            sql: include_str!("../migrations/33_vocabulary_vocable2.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 34,
                            description: "dictation sentences from Vocable Juillet 2025 p13-20 (food, public speaking, mindfulness, gig economy)",
                            sql: include_str!("../migrations/34_dictation_vocable3.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 35,
                            description: "translation exercises from Vocable Juillet 2025 p13-20",
                            sql: include_str!("../migrations/35_translation_vocable3.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 36,
                            description: "vocabulary flashcards from Vocable Juillet 2025 p13-20 (food, public speaking, mindfulness, gig economy)",
                            sql: include_str!("../migrations/36_vocabulary_vocable3.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 37,
                            description: "grammar lessons from Bescherelle - tenses, modals, passive, conditionals, relatives, prepositions, articles, etc.",
                            sql: include_str!("../migrations/37_grammar_bescherelle.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 38,
                            description: "grammar exercises (QCM, fill_blank) linked to Bescherelle grammar lessons",
                            sql: include_str!("../migrations/38_grammar_exercises_bescherelle.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 39,
                            description: "additional irregular verbs from Bescherelle irregular verb tables",
                            sql: include_str!("../migrations/39_irregular_verbs_bescherelle.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 40,
                            description: "phrasal verbs from Bescherelle - comprehensive list of common and advanced phrasal verbs",
                            sql: include_str!("../migrations/40_phrasal_verbs_bescherelle.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 41,
                            description: "additional grammar exercises from Bescherelle - reorder, match, transformation, translation, error correction",
                            sql: include_str!("../migrations/41_grammar_exercises_bescherelle2.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 42,
                            description: "turnover HR meaning",
                            sql: include_str!("../migrations/42_turnover_hr_meaning.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 43,
                            description: "merge turnover definitions on one card",
                            sql: include_str!("../migrations/43_turnover_merge.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 44,
                            description: "fix rush definition",
                            sql: include_str!("../migrations/44_rush_definition.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 45,
                            description: "fix channel definition",
                            sql: include_str!("../migrations/45_channel_definition.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 46,
                            description: "vocabulary flashcards from Vocable Juin 2025 (environment, business, travel, idioms, health, society, science)",
                            sql: include_str!("../migrations/46_vocabulary_vocable4.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 47,
                            description: "grammar lessons from Vocable Juin 2025 (passive voice, modal verbs of deduction, future perfect & continuous)",
                            sql: include_str!("../migrations/47_grammar_vocable4.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 48,
                            description: "dictation sentences from Vocable Juin 2025 (AI, green energy, remote work, mental health, public transport, cultural heritage, space economy)",
                            sql: include_str!("../migrations/48_dictation_vocable4.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 49,
                            description: "translation exercises from Vocable Juin 2025 articles",
                            sql: include_str!("../migrations/49_translation_vocable4.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                        tauri_plugin_sql::Migration {
                            version: 50,
                            description: "clear translation_fr for rush",
                            sql: include_str!("../migrations/50_rush_translation_fr_null.sql"),
                            kind: tauri_plugin_sql::MigrationKind::Up,
                        },
                    ],
                )
                .build(),
        )
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
