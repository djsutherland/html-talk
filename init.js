
// More info: https://github.com/hakimel/reveal.js#configuration
Reveal.initialize({
    history: true,
    progress: false,
    controls: false,

    math: {
        mathjax: 'node_modules/mathjax/MathJax.js',
        config: 'TeX-AMS_HTML-full'
    },

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
        { src: 'mymath.js', async: true }
    ]
});
