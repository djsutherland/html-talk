A base for a talk using [reveal.js](http://lab.hakim.se/reveal-js/). Features:
- Slides are written in [pug](https://pugjs.org), which is more pleasant than writing raw HTML but also allows more control than reveal.js's markdown support.
- Static-rendered support for math via [MathJax-node](https://github.com/mathjax/MathJax-node): more reliable than live-rendering with the reveal.js math plugin, in my experience.
- Live-reload (with [node-livereload](https://github.com/napcs/node-livereload)) with extra features:
  - Shift-control (or shift-command) click somewhere in the presentation, and open the source in your editor!
  - Keyboard shortcut in your editor to jump to that point in the presentation!
  - Set up to work with a Makefile, because that's way easier (for me at least) to customize to e.g. run Python code to make figures than Grunt/Gulp/whatever.
- Pull in reveal.js and similar via npm, instead of writing your presentation in a reveal.js fork like many people seem to do.
- Easily customize the theme settings in SCCS.

Using it:

- To install dependencies: `npm install`.
- To build it just once, without putting in the livereload support: `npm run build`. (This just runs `make`; you can do that too.)
- Once it's built, you can use `index.html`; everything should work just opening that file except for the timer in the speaker notes. Use `npm run serve` to start a web browser if you want that.
- To continually rebuild as you change files, including livereload in the browser and biderectional sync: `npm run watch`. This will run a web server too unless you tell it not to: `npm run watch -- --http=false`. (You need the `--` to tell `npm` to pass the arguments along to the subcommand, unfortunately.)
  - For sync from browser to editor: `npm run watch -- --editor=subl`. Currently only `subl`, for Sublime Text, is supported, but it's easy to add others.
  - For sync from editor to browser: the core workhorse is the `bin/slide-to` command; you'll want to configure your editor to call that with the current file/line/column. See [`support/sublime`](support/sublime/) for how to do that with Sublime.
- When you're done and want to put just the rendered talk somewhere, without pulling in 100mb of dependencies:
  - run `npm run bundle` to make a `.tgz` file
  - `tar xf html-talk-0.1.0.tgz --strip-components=1` to extract it somewhere

For fully offline use, install the fonts. On Mac, with homebrew:
   - `brew tap caskroom/fonts`
   - `brew cask install font-open-sans font-montserrat font-inconsolata`
   
You might be able to just have the web fonts cached or something, though.


