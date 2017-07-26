// based on https://github.com/hakimel/reveal.js/issues/1365#issue-107518558
MathJax.Hub.Register.StartupHook("TeX Jax Ready", function () {
    var TeX = MathJax.InputJax.TeX;
    TeX.Definitions.Add({macros: {'fragment': 'FRAGMENT_INDEX_attribute'}});
    TeX.Parse.Augment({
        FRAGMENT_INDEX_attribute: function (name) {
            var index = this.GetArgument(name);
            var arg = this.ParseArg(name);
            this.Push(arg.With({
                class: 'fragment',
                attrNames: ['data-fragment-index'],
                attr: {'data-fragment-index': index}
            }));
        }
    });
});

// This is running inside a jsdom page, so can't use node stuff to find our
// location or anything. Instead, this file is actually just a template
// where we'll plug in our filepath. Gross, right?
// Relevant:
//    https://github.com/dougalsutherland/grunt-mathjax-node-page/issues/2
//    https://github.com/mathjax/MathJax-node/issues/134
//    https://github.com/mathjax/MathJax-node/issues/318#issuecomment-293890752
MathJax.Ajax.loadComplete('file://<%= dirname %>/mathjaxFragments.js');
