#!/bin/bash
# This script will generate a representation of an Entity Relationship diagram from /erd/diagram.er file
# You can optionally pass the format of the output as the first argument of the script
# Default output format is a visual PNG file;
# Other supported formats are listed in https://graphviz.org/docs/outputs/
# Examples of execution:
# /scripts/generate-erd.sh (will output diagram to /erd/diagram.png)
# /scripts/generate-erd.sh pdf (will output diagram to /erd/diagram.pdf)
# /scripts/generate-erd.sh json (will output diagram to /erd/diagram.json)

# This script's relative path
readonly SCRIPT_DIR="${0%/*}"

readonly DEFAULT_FORMAT="png"

if [[ -z "$1" ]]; then
    FORMAT="${DEFAULT_FORMAT}"
elif [[ -n "$1" ]]; then
    FORMAT="${1}"
fi

cat "${SCRIPT_DIR}/../erd/diagram.er" | docker run --rm -i kaishuu0123/erd-go | docker run --rm -i risaacson/graphviz dot -T "${FORMAT}" > "${SCRIPT_DIR}/../erd/diagram.${FORMAT}"
