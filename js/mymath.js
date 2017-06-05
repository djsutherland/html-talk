/**
 * A plugin which enables rendering of math equations inside
 * of reveal.js slides. Essentially a thin wrapper for MathJax.
 *
 * Minor modification adding a \fragment command.
 *
 * @author Hakim El Hattab
 */
var RevealMath = window.RevealMath || (function(){

	var options = Reveal.getConfig().math || {};
	options.mathjax = options.mathjax || 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js';
	options.config = options.config || 'TeX-AMS_HTML-full';

	loadScript( options.mathjax + '?config=' + options.config, function() {

		MathJax.Hub.Config({
			messageStyle: 'none',
			tex2jax: {
				inlineMath: [['$','$'],['\\(','\\)']] ,
				skipTags: ['script','noscript','style','textarea','pre']
			},
			skipStartupTypeset: true
		});

		// Typeset followed by an immediate reveal.js layout since
		// the typesetting process could affect slide height
		MathJax.Hub.Queue( [ 'Typeset', MathJax.Hub ] );
		MathJax.Hub.Queue( Reveal.layout );

		// Reprocess equations in slides when they turn visible
		Reveal.addEventListener( 'slidechanged', function( event ) {

			MathJax.Hub.Queue( [ 'Typeset', MathJax.Hub, event.currentSlide ] );

		} );

		// add fragment command:  x \fragment{2}{+ y}
		// https://github.com/hakimel/reveal.js/issues/1365#issue-107518558
        MathJax.Hub.Register.StartupHook("TeX Jax Ready",function () {
            var TEX = MathJax.InputJax.TeX;
            TEX.Definitions.Add({macros: {'fragment': 'FRAGMENT_INDEX_attribute'}});
            TEX.Parse.Augment({
             FRAGMENT_INDEX_attribute: function (name) {
                 var index = this.GetArgument(name);
                 var arg   = this.ParseArg(name);
                 this.Push(arg.With({
                    'class': 'fragment',
                    attrNames: ['data-fragment-index'],
                    attr: {'data-fragment-index':index}
                 }));
             }
            });
        });
	} );

	function loadScript( url, callback ) {

		var head = document.querySelector( 'head' );
		var script = document.createElement( 'script' );
		script.type = 'text/javascript';
		script.src = url;

		// Wrapper for callback to make sure it only fires once
		var finish = function() {
			if( typeof callback === 'function' ) {
				callback.call();
				callback = null;
			}
		}

		script.onload = finish;

		// IE
		script.onreadystatechange = function() {
			if ( this.readyState === 'loaded' ) {
				finish();
			}
		}

		// Normal browsers
		head.appendChild( script );

	}

})();
