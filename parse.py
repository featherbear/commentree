#!/usr/bin/python3

from io import FileIO
import json
import os
from typing import Union
import re


class Commentree:
    def __init__(self,  file: Union[FileIO, str], baseDir: str):
        isFileString = type(file) is str
        if isFileString:
            file = open(file, "r")

        self._data = json.load(file)
        self._base = os.path.normpath(baseDir)

        if isFileString:
            file.close()

    def __enter__(self):
        return self

    def __exit__(self, *_):
        # save?
        return self

    @property
    def favourites(self):
        return self._data["favourites"]

    @property
    def files(self):
        return self._data["files"]

    @property
    def comments(self):
        return self._data["comments"]

    # @property
    # def application(self):
    #     return self._data["application"]


with Commentree("data.json", "D:\\thesis\\extract") as c:
    print(c._data.keys())
    items = sorted(c.comments.items(), key=lambda i: i[0])
    for key, value in items:
        if not value:
            continue

        key: str
        value: str

        key = os.path.normpath(key) # Normalise
        key = re.sub(r'^[/\\]', '', key.replace(c._base, "", 1)) # Replace base
        key = key.replace("\\", "/") # The superior path separator

        print("=====", key, "=====")
        print("\n".join(
            ["> " + line for line in re.sub("\n{2,}", "\n", value.strip()).split("\n")]))
        print()
