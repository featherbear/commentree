/**
 * Tauri's fs module prevents the access of arbitrary file paths so we will need to implement some functionality in the core layer ourselves
 * 
 * Whitelist feature pending: https://github.com/tauri-apps/tauri/discussions/3567#discussioncomment-2261797
 */

import { invoke } from '@tauri-apps/api/tauri'

export async function select_dir(): Promise<string> {
   return invoke('select_dir')
}
export async function list_dir(dir): Promise<string[]> {
   let res: string = await invoke('list_dir', { dir })
   return JSON.parse(res)
}