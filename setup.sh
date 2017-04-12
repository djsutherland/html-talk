#!/bin/bash
set -e

cd $(dirname $0)

git submodule update --init
(cd reveal.js/css/theme/source && ln -s ../../../../djs.scss .)
(cd reveal.js && npm install)

# TODO: could get MathJax via npm; would get a system cache and such
ver=2.7.0
if [[ ! -d MathJax-$ver ]]; then
    wget https://github.com/mathjax/MathJax/archive/2.7.0.zip
    unzip $ver.zip
    rm $ver.zip
fi
