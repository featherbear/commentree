use rfd::FileDialog;
use walkdir::WalkDir;

pub fn select_dir() -> String {
    println!("select_dir() called");
    let res = FileDialog::new().pick_folder();
    if res.is_none() {
        return "".into();
    }

    res.unwrap().as_path().display().to_string()
}

pub fn list_dir(path: String) -> Vec<String> {
    println!("list_dir(path={}) called", path);

    let mut results: Vec<String> = vec![];

    for file in WalkDir::new(path).into_iter().filter_map(|file| file.ok()) {
        if file.metadata().unwrap().is_file() {
            results.push(file.path().display().to_string());
        }
    }

    results
}

#[cfg(target_os = "unix")]
use std::os::unix::fs::PermissionsExt;

use std::sync::Mutex;
use lazy_static::lazy_static;

use flate2::write::ZlibEncoder;
use flate2::Compression;
use std::fs::File;
use std::io::prelude::{Read, Seek, Write};
use std::io::{SeekFrom};

lazy_static! {
    static ref LAST_FILE_PATH: Mutex<Option<String>> = Mutex::new(None);
    static ref LAST_FILE_HANDLE: Mutex<Option<File>> = Mutex::new(None);
}

pub fn read_file_chunk(path: String, chunk: u64) -> Vec<u8> {
    println!("read_file_chunk(path={}, chunk={}) called", path, chunk);

    let mut current_file_path = LAST_FILE_PATH.lock().unwrap();
    let mut current_file_handle = LAST_FILE_HANDLE.lock().unwrap();
    
    if current_file_path.is_none() || current_file_path.as_ref().unwrap().ne(&path) {
        println!("Read new file, path={}, chunk={}", path, chunk);

        *current_file_path = Some(path.clone());
        *current_file_handle = Some(File::open(path).unwrap());
    } else {
        println!("Read existing file, path={} chunk={}", path, chunk);
    }

    let mut f = (current_file_handle.as_ref()).unwrap();
    f.seek(SeekFrom::Start(chunk * 2048)).ok();
    
    compress_data(f.take(2048))
}

fn compress_data(mut f: impl Read) -> Vec<u8> {
    println!("compress_data() called");

    let mut input_buffer = Vec::new();
    f.read_to_end(&mut input_buffer).ok();

    let mut z = ZlibEncoder::new(Vec::new(), Compression::default());
    z.write(&mut input_buffer).ok();

    let mut output_buffer = z.finish().unwrap();

    if input_buffer.len() != 0 {
        println!("Compression ratio = {:.2}:1", input_buffer.len() as f64 / output_buffer.len() as f64);
    }
    
    // Check if zlib compression was worth it
    if input_buffer.len() >= output_buffer.len() {
        // result[0] == 0

        output_buffer.insert(0, 1);
        return output_buffer;
    } else {
        // result[0] == 1
        // Well that was a waste of time, no space savings
        input_buffer.insert(0, 0);
        return input_buffer;
    }
}

pub fn read_file(path: String) -> Vec<u8> {
    println!("read_file(path={}) called", path);

    let f = File::open(path).unwrap();
    
    // let metadata = f.metadata().unwrap();
    // metadata.len();
    // let perm = metadata.permissions();
    // println!("{:?}", perm);

    // #[cfg(target_os = "unix")]
    // println!("{:o}", perm.mode());
    

    // metadata.created();
    // metadata.modified();

    compress_data(&f)
}
