#!/bin/bash

if [ -z $1 ]; then
    echo "Missing directory parameter"
    exit 0
fi

dir="${1%/}"

if [ ! -d $dir ]; then
    echo "Directory $dir does not exist"
    exit 0
fi

git add $dir
git commit -m "[blog][$dir] Added new post"

python3 update_manifest.py

git add manifest.json
git commit -m "[blog] Updated manifest"