A base for a talk using [reveal.js](http://lab.hakim.se/reveal-js/). Features:
- Slides are written in [pug](https://pugjs.org), which is more pleasant than writing raw HTML but also allows more control than reveal.js's markdown support.
- Static-rendered support for math via [MathJax-node](https://github.com/mathjax/MathJax-node): more reliable than live-rendering with the reveal.js math plugin, in my experience.
- Pull in reveal.js and similar via npm, instead of writing your presentation in a reveal.js fork like many people seem to do.
- Easily customize the theme settings in SCCS.
- Builds with a Makefile instead of Grunt/Gulp/whatever. Those are fine, but I tried for a while to add things to those to run Python code to make figures, and it was so much work! Switching back to tried-and-true Make just feels right.
- The one really nice thing you don't get for free with Make is [node-livereload](https://github.com/napcs/node-livereload) integration; that's set up here.

Using it:

- To install dependencies: `npm install`.
- To build it just once, without putting in the livereload support: `npm run build`. (This just runs `make`; you can do that too.)
- Once it's built, you can use `index.html`; everything should work just opening that file except for the timer in the speaker notes. Use `npm run serve` to start a web browser if you want that.
- To continually rebuild as you change files, including livereload in the browser: `npm run watch`. This will run a web server too unless you tell it not to: `npm run watch -- --http=false`. (You need the `--` to tell `npm` to pass the arguments along to the subcommand, unfortunately.)
- When you're done and want to put just the rendered talk somewhere, without pulling in 100mb of dependencies:
  - run `npm run bundle` to make a `.tgz` file
  - `tar xf html-talk-0.1.0.tgz --strip-components=1` to extract it somewhere

For fully offline use, install the fonts. On Mac, with homebrew:
   - `brew tap caskroom/fonts`
   - `brew cask install font-open-sans font-montserrat font-inconsolata`
   
You might be able to just have the web fonts cached or something, though.


