#!/bin/bash
set -e

cd $(dirname $0)/reveal.js
node_modules/grunt-cli/bin/grunt css-themes serve --root=..
