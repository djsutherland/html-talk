A base for talks using [reveal.js](http://lab.hakim.se/reveal-js/).

## Features
- Slides are written in [pug](https://pugjs.org), which is more pleasant than writing raw HTML but also allows more control than reveal.js's markdown support.
- Static-rendered support for math via [MathJax-node](https://github.com/mathjax/MathJax-node): more reliable than live-rendering with the reveal.js math plugin, in my experience.
- Live-reload (with [node-livereload](https://github.com/napcs/node-livereload)) with extra features:
  - Shift-control (or shift-command) click somewhere in the presentation, and open the source in your editor!
  - Keyboard shortcut in your editor to jump to that point in the presentation!
  - Set up to work with a Makefile, because that's way easier (for me at least) to customize to e.g. run Python code to make figures than Grunt/Gulp/whatever.
- Pull in reveal.js and other dependencies via npm, instead of writing your presentation in a reveal.js fork like many people seem to do.
- Easily customize the theme settings in the SCSS template ([scss/djs.scss](scss/djs.scss)).

## Setup
- Make sure you have at least `node` version 6 (preferably version 8); you might like [nvm](https://github.com/creationix/nvm) or, if you use `zsh`, especially [zsh-nvm](https://github.com/lukechilds/zsh-nvm).
- Clone the repo somewhere. I like to work on a different branch for my actual talks:
```
git clone https://github.com/dougalsutherland/html-talk awesome-talk
cd awesome talk
git checkout -b nobel-lecture
```
- Install the dependencies: `npm install`.

## Using it
- Edit `slides.pug` to write your slides. Pug syntax is relatively straightforward, and the examples there should get you most of the way through the basics; full docs are at [pugjs.org](https://pugjs.org).
- To build `index.html` from your slides, you have some options.

### Boring way
- `npm run build` will make `index.html` from `slides.pug`. (This just runs `make`; you can do that too.)
- You can then just open `index.html` in a browser. Everything should work there **except** for the timer in the speaker notes.

### Web server
To get the speaker notes timer to work, run a webserver: `npm run serve`.

### Livereload
The livereload server uses [node-livereload](https://github.com/napcs/node-livereload) and [chokidar](https://github.com/paulmillr/chokidar) to watch your filesystem for changes, rebuild (with `make`) when it sees anything change, then reload it in the browser. (It'll reload the full page for HTML changes, but pull in CSS and image changes without a reload.)

Run it with `npm run watch`. This will also run an HTTP server and the sync server (below) unless you tell it not to: `npm run watch -- --http=false --sync=false`. (The `--` is needed to tell `npm` to pass the arguments along.) They don't really use substantial resources if you're not using them, though, so whatever.

Note that if you build the HTML file with livereload turned on, the page will pause in loading for a while if the livereload server isn't actually present. So run `make clean-html` if you're switching from a livereload build to a non-livereload build; this should be done automatically if you use the `npm run build`/etc commands.

### Sync
This repo also includes SuperCool™ code for jumping from the browser to the relevant part of your editor, and from the editor to the browser. This is set up by default in `npm run watch`.

#### Browser to editor
When you run `npm run watch`, it needs to know what editor command to call. Set the environment variable `TALK_EDITOR` to tell it; current valid values are `subl` (for Sublime Text), `gvim`, `mvim`, `kate` (default `subl`). Then, shift-command / shift-super / shift-control click somewhere in the webpage to run that command and jump to the nearest spot in the Pug source that we can figure out.

It's easy to add support for other editors (PRs welcome); check out the `scrollEditorTo` section of [`bin/serve`](bin/serve).

#### Editor to browser
The core part of this is the [`bin/slide-to`](bin/slide-to) command, which when `npm run watch` is running will tell any webbrowsers to slide to the closest it can get to the passed line/column. (This is a little bit iffy for fragments defined inside MathJax, but we do our best guess.)

You'll want to configure your editor to call this:
- Sublime Text: see [`support/sublime`](support/sublime/README.md). It unfortunately requires a stupid plugin that I wrote.
- Vim: see [`support/vim`](support/vim/README.md); this is pretty easy.

### Distributing a final version of the talk
If you want to distribute just the rendered talk, without the 100mb of dependencies to build it:

- Run `npm run bundle` to make a `.tgz` file.
- Check that the `.tgz` includes everything you want (`tar tf html-talk-0.1.0.tgz | less`); it'll include only `index.html` and the `css`, `img`, `js` directories by default, along with `reveal.js` and `reveal.js-menu` sources.
  - If you need any other files at runtime, fiddle with the `.npmignore` files to make sure they're included.
  - If you added any `npm` dependencies that you need for the talk, add them to `bundledDependencies` in `package.json` (and make sure they're in `dependencies`, not `devDependencies`).
- Run `tar xf html-talk-0.1.0.tgz --strip-components=1` to extract it somewhere (a webserver directory).

### Offline use
For fully offline use, install the fonts. On Mac, with homebrew:
   - `brew tap caskroom/fonts`
   - `brew cask install font-open-sans font-montserrat font-inconsolata`

You might be able to just have the web fonts cached, though, depending on your browser.
