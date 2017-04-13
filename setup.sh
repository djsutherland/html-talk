#!/bin/bash
set -e

cd $(dirname $0)

git submodule update --init
(cd reveal.js/css/theme/source && ln -sf ../../../../djs.scss .)
(cd reveal.js && npm install && node_modules/grunt-cli/bin/grunt css-themes)

# TODO: could get MathJax via npm; would get a system cache and such
ver=2.7.0
if [[ ! -d MathJax-$ver ]]; then
    wget https://github.com/mathjax/MathJax/archive/2.7.0.zip
    unzip $ver.zip
    rm $ver.zip
    sed -i -e 's/imageFont: "TeX"/imageFont: null/' MathJax-$ver/config/default.js
    rm -r MathJax-$ver/fonts/HTML-CSS/TeX/png/
fi
