(function () {
  function start(video) {
    // TODO: ideally would use reveal handlers for data loading
    //       but they're not in the API...
    video.play();
  }
  function stop(video) {
    video.pause();
    video.currentTime = 0;
  }

  Reveal.addEventListener('fragmentshown', function(event) {
    for (var elt of event.fragments) {
      if (elt.nodeName == 'VIDEO' && elt.classList.contains('fragment-autoplay')) {
        start(elt);
      } else if (elt.classList.contains('fragment-autostop')) {
        for (var video of elt.querySelectorAll('video.fragment-autoplay')) {
          stop(video);
        }
      }
    }
  });

  Reveal.addEventListener('fragmenthidden', function(event) {
    for (var elt of event.fragments) {
      if (elt.nodeName == 'VIDEO' && elt.classList.contains('fragment-autoplay')) {
        stop(elt);
      } else if (elt.classList.contains('fragment-autostop')) {
        for (var video of elt.querySelectorAll('video.fragment-autoplay')) {
          start(video);
        }
      }
    }
  });

  // Reveal's stopEmbeddedContent() handles when we slide away for us
})();
