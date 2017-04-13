#!/bin/bash
set -e

cd $(dirname $0)

git submodule update --init
(cd reveal.js/css/theme/source && ln -sf ../../../../djs.scss .)
(cd reveal.js && npm install && node_modules/grunt-cli/bin/grunt css-themes)

# TODO: could get MathJax via npm; would get a system cache and such
ver=2.7.0
if [[ ! -d MathJax-$ver ]]; then
    wget -c https://github.com/mathjax/MathJax/archive/$ver.zip
    unzip $ver.zip -x MathJax-$ver/fonts/HTML-CSS/TeX/png/*
    rm $ver.zip
    sed -i -e 's/imageFont: "TeX"/imageFont: null/' MathJax-$ver/config/default.js
fi
