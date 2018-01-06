// based on https://github.com/hakimel/reveal.js/issues/1365#issue-107518558
MathJax.Hub.Register.StartupHook("TeX Jax Ready", function () {
    var TeX = MathJax.InputJax.TeX;
    TeX.Definitions.Add({macros: {'fragment': 'FRAGMENT_INDEX_attribute'}});
    TeX.Parse.Augment({
        FRAGMENT_INDEX_attribute: function (name) {
            var d = {'class': 'fragment'};

            var index = this.GetBrackets(name);
            if (index !== undefined && index !== '') {
                d.attr = {'data-fragment-index': index};
                d.attrNames = ['data-fragment-index'];
            }

            var extraclass = this.GetBrackets(name);
            if (extraclass !== undefined) {
                d.class += ' ' + extraclass;
            }

            var arg = this.ParseArg(name);

            this.Push(arg.With(d));
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
// <% if (dirname.endsWith('/')) { dirname = dirname.slice(0, -1); } %>
MathJax.Ajax.loadComplete("file://<%= dirname %>/fragments.js");
