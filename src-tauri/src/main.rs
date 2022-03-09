#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use rfd::FileDialog;

#[tauri::command]
fn my_custom_command() -> String {
  println!("I was invoked from JS!");

  let directory = FileDialog::new()
    .pick_folder();
  "bbb".into()
}


#[tauri::command]
fn my_other_custom_command(invoke_message: String) -> String {
  println!("I was invoked from JS, with this message: {}", invoke_message);
  "aaa".into()
}

fn main() {
  tauri::Builder::default()
  .invoke_handler(tauri::generate_handler![my_custom_command, my_other_custom_command])

    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

