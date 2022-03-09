#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

// use serde;
mod fs;

#[tauri::command]
fn select_dir() -> String {
    fs::select_dir()
}

#[tauri::command]
fn list_dir(dir: String) -> String {
    let res = fs::list_dir(dir);
    serde_json::to_string(&res).unwrap()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            select_dir,
            list_dir
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
