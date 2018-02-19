// Avoid `console` errors in browsers that lack a console.
(function () {
  var method;
  var noop = function () { };
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());

// Place any jQuery/helper plugins in here.
window.onload = function () {
  // http://stackoverflow.com/questions/15164942/stop-embedded-youtube-iframe
  var trailer = $('.trailer-video');
  trailer.click(function () {
    trailer.hide(500, function () {
      $('.youtube-player-iframe').each(function () {
        this.contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*')
      });
    });
  })

  $('.play-trailer').click(function () {
    trailer.show(500, function () {
      $('.youtube-player-iframe').each(function () {
        this.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*')
      });
    });
  });



  $('.popup-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    }
  });
};


// background video
//YouTube events
var tag = document.createElement('script');
tag.id = 'iframe-demo';
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var bg_video;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('video-embed', {});
  bg_video = new YT.Player('bg-video-embed', {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      loop: 1,
      playlist: 'rIYPUo8NAtE',
      controls: 0,
      autohide: 1,
      modestbranding: 1,
      vq: 'hd720'
    },
    videoId: 'rIYPUo8NAtE',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}
// 3. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  bg_video.mute();
  $('#bg-video').addClass('show');
}

var done = false;
function onPlayerStateChange(event) {

}
