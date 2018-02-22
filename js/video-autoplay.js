(function () {
  Reveal.addEventListener('fragmentshown', function (event) {
    if (event.fragment.nodeName == 'VIDEO' &&
        event.fragment.classList.contains('fragment-autoplay')) {
      event.fragment.play();
    }
  });
  Reveal.addEventListener('fragmenthidden', function (event) {
    if (event.fragment.nodeName == 'VIDEO' &&
        event.fragment.classList.contains('fragment-autoplay')) {
      event.fragment.pause();
      event.fragment.currentTime = 0;
    }
  });
})();
