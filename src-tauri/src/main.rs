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
                    ],
                )
                .build(),
        )
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
