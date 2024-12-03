#! /usr/bin/env bash

directory=${1:-.}

find $directory -type f -name "*.jsx" | while read -r file; do 
        new_file="${file%.jsx}.tsx"

        mv $file $new_file 
        echo "converted $file ==> $new_file"
done
