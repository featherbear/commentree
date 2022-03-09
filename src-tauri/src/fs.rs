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

use std::io::prelude::Read;
use flate2::Compression;
use flate2::read::ZlibEncoder;
use std::fs::File;

pub fn read_file(path: String) -> Vec<u8> {
    let f = File::open(path).unwrap();
    let mut z = ZlibEncoder::new(f, Compression::default());
    
    let mut buffer = vec![0; z.total_out() as usize];
    z.read(&mut buffer);

    buffer
}