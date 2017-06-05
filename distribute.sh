#!/bin/bash
set -e

# this is some hacky crap that's easy to trick...try not to :)
qq='"'"'"
deps=$(git grep "[$qq]node_modules/[^$qq]*[$qq]" \
      | grep -v ':@import' \
      | grep -o "node_modules/[^$qq]*" \
      | grep -v 'node_modules/mathjax/')

node_modules/.bin/grunt default
tar czf talk.tar.gz index.html css js img $deps
echo "Output in talk.tar.gz"
echo "Make sure to check everything works; this is all a horrible hack. :)"
