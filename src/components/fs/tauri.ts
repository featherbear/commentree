/**
 * Tauri's fs module prevents the access of arbitrary file paths so we will need to implement some functionality in the core layer ourselves
 * 
 * Whitelist feature pending: https://github.com/tauri-apps/tauri/discussions/3567#discussioncomment-2261797
 */

import { invoke } from '@tauri-apps/api/tauri'
import { inflate } from 'pako'

export async function select_dir(): Promise<string> {
   return invoke('select_dir')
}

export async function list_dir(dir): Promise<string[]> {
   let res: string = await invoke('list_dir', { dir })
   return JSON.parse(res)
}

export async function read_file(path): Promise<string> {
   let res: string = await invoke('read_file', { path })

   var binary_string = window.atob(res);
   var len = binary_string.length;
   var bytes = new Uint8Array(len);
   for (var i = 0; i < len; i++) bytes[i] = binary_string.charCodeAt(i);

   if (bytes[0] === 1) {
      // Do zlib inflate
      try {
         console.debug("Performing zlib inflate");
         const result = inflate(bytes.slice(1));
         console.debug(`Expanded ${bytes.slice(1).length} zlib payload to ${result.length} bytes`)
         return new TextDecoder().decode(result)
      } catch (err) {
         console.log(err);
         return null
      }

   } else {
      // No need for zlib inflate
      return new TextDecoder().decode(bytes.slice(1))
   }
}