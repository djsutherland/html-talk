A base for a talk using [reveal.js](http://lab.hakim.se/reveal-js/). Features:
- slides written in [pug](https://pugjs.org), which is more pleasant than writing raw HTML but also allows more control than reveal.js's markdown support
- static-rendered support for math via [MathJax-node](https://github.com/mathjax/MathJax-node)

Initial setup: `npm install`. Then, to build the files and run a webserver, which will rebuild the files and reload the page when you change something: `./serve.sh`.

When you're done and want to put the talk somewhere without pulling a few hundred meg of libraries, `./distribute.sh`.

For fully offline use, install the fonts. On Mac, with homebrew:
   - `brew tap caskroom/fonts`
   - `brew cask install font-open-sans font-montserrat`
You might be able to just have the web fonts cached or something, though, I don't know.


