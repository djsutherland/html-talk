A base for a talk using [reveal.js](http://lab.hakim.se/reveal-js/). Features:
- Slides are written in [pug](https://pugjs.org), which is more pleasant than writing raw HTML but also allows more control than reveal.js's markdown support.
- Static-rendered support for math via [MathJax-node](https://github.com/mathjax/MathJax-node): more reliable than live-rendering with the reveal.js math plugin, in my experience.
- Pull in reveal.js and similar via npm, instead of writing your presentation in a reveal.js fork like many people seem to do.
- Easily customize the theme settings in SCCS.

Using it:

- To install dependencies: `npm install`.
- To build: `npm run build`.
- To continually rebuild as you change things: `npm run watch`. (TODO: integrate [make-livereload](https://github.com/mklabs/make-livereload) or similar to refresh the browser too.)
- When you're done and want to put just the rendered talk somewhere, without pulling in 100mb of dependencies:
  - run `npm pack` to make a `.tgz` file
  - `tar xf html-talk-0.1.0.tgz --strip-components=1` to extract it somewhere
  - `npm install --only=prod` in that directory to install just the javascript libs needed at runtime

For fully offline use, install the fonts. On Mac, with homebrew:
   - `brew tap caskroom/fonts`
   - `brew cask install font-open-sans font-montserrat font-inconsolata`
   
You might be able to just have the web fonts cached or something, though.


