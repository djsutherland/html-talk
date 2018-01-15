To set up forward search, from vim to the website, put this in your `~/.vimrc`:

```
autocmd BufRead,BufNewFile slides.pug nnoremap <LocalLeader>j :execute "!node " . expand("%:p:h") . "/bin/slide-to -f " . shellescape(expand("%")) . " -l " . line(".") . " -c " . col(".")<cr><cr>
```

- This runs with `<LocalLeader>j`; `<LocalLeader>` is by default `\`, but I like to use `,`; some people use the spacebar. ([more](http://learnvimscriptthehardway.stevelosh.com/chapters/06.html))

- The `autocmd BufRead,BufNewFile slides.pug` will set up this mapping in any file named `slides.pug`. If you use pug inclusions/whatever, change this appropriately, or just run `:nnoremap <LocalLeader>j [...]`.

- Replace `node` above with a valid path, if vim won't otherwise have a path to a good version of node; I use [`nvm`](https://github.com/creationix/nvm) in a way where vim doesn't get its path, and so use e.g. `~/.nvm/versions/node/v8.9.4/bin/node`. You could do `~/.nvm/nvm-exec` to have it automatically pick the version from `.nvmrc`, but that takes like half a second each time you run the command, so don't.

- The `expand("%:p:h") . "/bin/slide-to"` bit means that we're running the command in `bin/slide-to` relative to the current `slides.pug` being edited. If you've rearranged the directory layout, change this accordingly.

- If it doesn't work, remove the final `<cr>` so you can see the command's output to help debug. (The first `<cr>` runs the command; the second one clears the output screen.)
