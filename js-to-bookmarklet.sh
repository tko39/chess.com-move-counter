#!/bin/bash

## It has an issue with template strings. This comes from this being a regex replace for speed of implementation.

if [ $# -ne 1 ]; then
    echo "Usage: $0 <javascript-file>"
    exit 1
fi

input_file="$1"

if [ ! -f "$input_file" ]; then
    echo "Error: File '$input_file' not found."
    exit 1
fi

minified_code=$(cat "$input_file" \
    | tr -d '\n' \
    | tr -d '\t' \
    | sed -e 's|//.*||g' -e 's|/\*.*\*/||g' -e 's|[[:space:]]\+| |g' \
    | sed -E 's| *([-{}()+*=/;,:\|<>=^]) *|\1|g' \
)


bookmarklet="javascript:${minified_code}"

echo "$bookmarklet"
