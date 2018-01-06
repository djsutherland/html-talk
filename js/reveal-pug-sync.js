var queryAll = document.querySelectorAll.bind(document);

// http://youmightnotneedjquery.com/#ready
function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete"
                             : document.readyState !== "loading") {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

// https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
        thisArg = thisArg || window;
        for (var i = 0; i < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
}

function findPugElement(file, line, col) {
    var max, maxLine = -1, maxCol = -1;
    queryAll('[data-pug-file="' + file + '"]').forEach(function (obj) {
        var objLine = parseInt(obj.dataset.pugLine, 10),
            objCol = parseInt(obj.dataset.pugColumn, 10);
        // Intentionally be lax about column matching,
        // and intentionally take the last one on a tie.
        if (objLine <= line && (objLine > maxLine ||
                (objLine == maxLine && objCol <= col && objCol >= maxCol))) {
            max = obj;
            maxLine = objLine;
            maxCol = objCol;
        }
    });
    return max;
}

function slideToElement(elt) {
    var slide = elt.closest("section");
    var inds = Reveal.getIndices(slide);
    Reveal.slide(inds.h, inds.v);

    // getIndices won't get the fragment index for us,
    // but we can try to figure it out ourself.
    var nFragments = slide.querySelectorAll('.fragment').length;
    if (nFragments != 0) {
        var fragment = elt.closest('section .fragment');
        // If the object isn't currently visible, try out all the fragment
        // indices that might possibly affect it until it is.
        while (fragment !== null && !elt.classList.contains("visible")) {
            // Hack for mathjax fragments: first try the max index inside
            // this element, if we've defined one (in the function below).
            if (fragment.dataset.maxFragmentIndex !== undefined) {
                Reveal.navigateFragment(fragment.dataset.maxFragmentIndex);
                if (elt.classList.contains("visible")) {
                    break;
                }
            }
            var f = parseInt(fragment.dataset.fragmentIndex, 10);
            Reveal.navigateFragment(f);
            fragment = fragment.parentNode.closest('section .fragment');
        }
        // Well, hopefully the element is visible now.
    }
}

// Patch up elements (from mathjax) that have a fragment class but no pug data
ready(function() {
    queryAll(".fragment:not([data-pug-file])").forEach(function (elt) {
        var parent = elt.closest("[data-pug-file]");
        elt.dataset.pugFile = parent.dataset.pugFile;
        elt.dataset.pugLine = parent.dataset.pugLine;
        elt.dataset.pugColumn = parent.dataset.pugColumn;

        var f = parseInt(elt.dataset.fragmentIndex, 10);
        if (parent.dataset.maxFragmentIndex === undefined ||
                parent.dataset.maxFragmentIndex < f) {
            parent.dataset.maxFragmentIndex = elt.dataset.fragmentIndex;
        }
    });
});

var socket = new WebSocket(
    'ws://' + (location.host || 'localhost').split(':')[0] + ':35730');

socket.addEventListener('open', function() {
    // tell the server that this client is a browser
    socket.send(JSON.stringify(["hello", "browser"]));

    ready(function() {
        // Handle commands from the sync server
        socket.onmessage = function (event) {
            var msg = JSON.parse(event.data);

            switch (msg[0]) {
                case "slide-to":
                    var file = msg[1],
                        line = parseInt(msg[2], 10),
                        col = parseInt(msg[3], 10);
                    slideToElement(findPugElement(file, line, col));
                    break;
                default:
                    console.log("Unknown command " + msg[1]);
            }
        };

        // Set up listeners to send commands to the sync server
        queryAll('.slides [data-pug-line]').forEach(function (elt) {
            elt.addEventListener('click', function (evt) {
                if (evt.shiftKey && (evt.metaKey || evt.ctrlKey)) {
                    msg = JSON.stringify([
                        'editor', 'scroll-to',
                        elt.dataset.pugFile,
                        elt.dataset.pugLine,
                        elt.dataset.pugColumn]);
                    socket.send(msg);
                    evt.stopPropagation();
                }
            }, false);
        });
    });
});
