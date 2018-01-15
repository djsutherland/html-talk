How to set up forward search in Sublime:

- You'll want to install my stupid little [RunWithFileLine extension](https://github.com/dougalsutherland/Sublime-RunWithFileLine), because I couldn't find a better extension that could do this. It's too dumb to put on Package Control:
```bash
# on Mac:
$ cd ~/Library/Application\ Support/Sublime\ Text\ 3/Packages
# on Linux:
$ cd ~/.config/sublime-text-3/Packages
# then:
$ git clone https://github.com/dougalsutherland/Sublime-RunWithFileLine RunWithFileLine
```

- Make sure you have [the Pug syntax](https://packagecontrol.io/packages/Pug) from Package Control.

- You'll need to be editing the talk in a Sublime project. One way to do that is to create a `YOUR_TALK_NAME.sublime-project` file in the root of the repo, with the following contents, then open the project by double-clicking on it in the GUI or using `subl --project YOUR_TALK_NAME.sublime-project`:
```json
{
    "folders":
    [
        {
            "path": "."
        }
    ],
    "settings": {
        "run_with_file_line": {
            "command": "node bin/slide-to -f {file} -l {line} -c {col}",
            "syntax": "Pug"
        }
    }
}
```

 - Replace `node` above with a valid path, if Sublime won't have a path to a good version of node; I use [`nvm`](https://github.com/creationix/nvm) in a way where Sublime doesn't get its path, and so use e.g. `~/.nvm/versions/node/v8.9.4/bin/node`. You could do `~/.nvm/nvm-exec` to have it automatically pick the version from `.nvmrc`, but that takes like half a second each time you run the command, so don't.

- Hit cmd-alt-J on Mac / ctrl-alt-J on Linux / ctrl-shift-alt-J on Windows to run the command.

- Rejoice!
