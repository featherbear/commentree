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

use flate2::read::ZlibEncoder;
use flate2::Compression;
use std::fs::File;
use std::io::prelude::{Read, Seek};
use std::io::{SeekFrom};

lazy_static! {
    static ref lastFilePath: Mutex<Option<String>> = Mutex::new(None);
    static ref lastFileHandle: Mutex<Option<File>> = Mutex::new(None);
}

pub fn read_file_chunk(path: String, chunk: usize) {
    let mut currentFilePath = lastFilePath.lock().unwrap();
    let mut currentFileHandle = lastFileHandle.lock().unwrap();
    
    if currentFilePath.is_none() || currentFilePath.as_ref().unwrap().ne(&path) {
        println!("Read new file");

        *currentFilePath = Some(path.clone());
        *currentFileHandle = Some(File::open(path).unwrap());
    }
    // let mut fl = my_mutex.lock().unwrap();
    // *fl = File::open(path).unwrap();
    // static af = 2;
    // lastFile.
    // return 0;
}

pub fn read_file(path: String) -> Vec<u8> {
    let mut f = File::open(path).unwrap();
    // let metadata = f.metadata().unwrap();
    // metadata.len();
    // metadata.permissions();
    // metadata.created();
    // metadata.modified();

    let mut z = ZlibEncoder::new(&mut f, Compression::default());

    let mut zlibBuffer: Vec<u8> = Vec::new();
    z.read_to_end(&mut zlibBuffer);

    // Check if zlib compression was worth it
    if z.total_in() >= z.total_out() {
        // result[0] == 0
        zlibBuffer.insert(0, 1);
        return zlibBuffer;
    } else {
        // result[0] == 1
        // Well that was a waste of time, no file savings
        let mut data: Vec<u8> = vec![0];
        f.seek(SeekFrom::Start(0));
        f.read_to_end(&mut data);
        return data;
    }
}
