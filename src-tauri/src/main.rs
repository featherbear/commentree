#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

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

#[tauri::command]
fn read_file(path: String) -> String {
    let res = fs::read_file(path);
    base64::encode(res)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![select_dir, list_dir, read_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
