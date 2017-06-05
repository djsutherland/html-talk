// figure out if offline mathjax is available, then initialize
math_config = {
    config: 'TeX-AMS_HTML-full'
};
mathjax_offline_path = 'node_modules/mathjax/MathJax.js';

var client = new XMLHttpRequest();
client.onreadystatechange = function() {
    if (this.readyState == 4) {
        if (this.status == 200) {
            math_config.mathjax = mathjax_offline_path;
        }  // otherwise use default from CDN
        console.log("Mathjax status: " + this.status + "; initializing");
        init();
    }
}
console.log("Checking for offline mathjax...")
// NOTE: this won't work if on file:// in webkit;
//       if you need to work offline, run a web server (e.g. serve.sh)
client.open("HEAD", mathjax_offline_path);
client.send();

// More info: https://github.com/hakimel/reveal.js#configuration
function init() {
    Reveal.initialize({
        history: true,
        progress: true,
        controls: false,

        math: math_config,

        keyboard: {
            40: 'next',
            38: 'prev'
        },

        // More info https://github.com/hakimel/reveal.js#dependencies
        dependencies: [
            { src: 'node_modules/reveal.js/plugin/markdown/marked.js' },
            { src: 'node_modules/reveal.js/plugin/markdown/markdown.js' },
            { src: 'node_modules/reveal.js/plugin/notes/notes.js', async: true },
            { src: 'node_modules/reveal.js/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
            { src: 'js/mymath.js', async: true }
        ]
    });
}
