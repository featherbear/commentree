/**
 * Tauri's fs module prevents the access of arbitrary file paths so we will need to implement some functionality in the core layer ourselves
 * 
 * Whitelist feature pending: https://github.com/tauri-apps/tauri/discussions/3567#discussioncomment-2261797
 */

 import { invoke } from '@tauri-apps/api/tauri'

 export function listDir() {
    invoke('my_custom_command', { invokeMessage: 'Hello!' })

 }