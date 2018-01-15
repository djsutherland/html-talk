How to set up forward search, from vim to the website:

```
:nnoremap <leader>j :execute "!node bin/slide-to -f " . shellescape(expand("%")) . " -l " . line(".") . " -c " . col(".")<cr><cr>
```

Replace `node` above with a valid path, if vim won't otherwise have a path to a good version of node; I use [`nvm`](https://github.com/creationix/nvm) in a way where vim doesn't get its path, and so use e.g. `~/.nvm/versions/node/v8.9.4/bin/node`. You could do `~/.nvm/nvm-exec` to have it automatically pick the version from `.nvmrc`, but that takes like half a second each time you run the command, so don't.

Explaining the `<cr><cr>` above: the first bit of the command only puts the command on the ex command line. The first `<cr>` executes it; the second `<cr>` clears the ouptut that was shown. If it's not working and you want to see the command line output to debug, remove the second `<cr>`.

This runs with `<LocalLeader>j`; `<LocalLeader>` is by default backslash, but I like to use `,`; some people use the spacebar. ([more](http://learnvimscriptthehardway.stevelosh.com/chapters/06.html))
