use rfd::FileDialog;
use walkdir::WalkDir;

pub fn select_dir() -> String {
    println!("select_dir called");
    let res = FileDialog::new().pick_folder();
    if res.is_none() {
        return "".into();
    }

    res.unwrap().as_path().display().to_string()
}

pub fn list_dir(path: String) -> Vec<String> {
    println!("list_dir({}) called", path);

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
    static ref lastFilePath: Mutex<Option<String>> = Mutex::new(None);
    static ref lastFileHandle: Mutex<Option<File>> = Mutex::new(None);
}

pub fn read_file_chunk(path: String, chunk: u64) -> Vec<u8> {
    let mut currentFilePath = lastFilePath.lock().unwrap();
    let mut currentFileHandle = lastFileHandle.lock().unwrap();
    
    if currentFilePath.is_none() || currentFilePath.as_ref().unwrap().ne(&path) {
        println!("Read new file, path={}, chunk={}", path, chunk);

        *currentFilePath = Some(path.clone());
        *currentFileHandle = Some(File::open(path).unwrap());
    } else {
        println!("Read existing file, path={} chunk={}", path, chunk);
    }

    let mut f = (currentFileHandle.as_ref()).unwrap();
    f.seek(SeekFrom::Start(chunk * 2048));
    
    zlibEncode(f.take(2048).into_inner())
}

fn zlibEncode(mut f: &File) -> Vec<u8> {
    let mut inputBuffer = Vec::new();
    f.read_to_end(&mut inputBuffer);

    let mut z = ZlibEncoder::new(Vec::new(), Compression::default());
    z.write(&mut inputBuffer);

    let mut zlibBuffer = z.finish().unwrap();

    // Check if zlib compression was worth it
    if inputBuffer.len() >= zlibBuffer.len() {
        // result[0] == 0
        zlibBuffer.insert(0, 1);
        return zlibBuffer;
    } else {
        // result[0] == 1
        // Well that was a waste of time, no space savings
        inputBuffer.insert(0, 0);
        return inputBuffer;
    }
}

pub fn read_file(path: String) -> Vec<u8> {
    let mut f = File::open(path).unwrap();
    let metadata = f.metadata().unwrap();
    metadata.len();
    let perm = metadata.permissions();
    println!("{:?}", perm);

    #[cfg(target_os = "unix")]
    println!("{:o}", perm.mode());
    

    metadata.created();
    metadata.modified();

    zlibEncode(&f)
}
