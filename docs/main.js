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

function updateVideoContainerSize() {
  var w = window.innerWidth;
  var h = window.innerHeight;

  // 유튜브에 업로드된 동영상 크기. 하드코딩하기
  var origVideoWidth = 1280;
  var origVideoHeight = 720;

  var nextVideoWidth = w;
  var nextVideoHeight = origVideoHeight * nextVideoWidth / origVideoWidth;

  var e = $('.embed-container');
  // video-hero-height
  var origElementHeight = 630;
  var gap = (nextVideoHeight - origElementHeight) * 0.5;
  e.css('height', nextVideoHeight);
  e.css('top', -gap+'px');
  e.css('clip-path', 'inset(0 0 ' + gap + 'px 0)');
}

window.onresize = function(evt) {
  updateVideoContainerSize();
}

// Place any jQuery/helper plugins in here.
window.onload = function () {
  updateVideoContainerSize();

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
  // 실제 동영상
  var videoId = 'FZIsM6d9m1Y';
  // 테스트용 시계
  //var videoId = 'NSuNpiW-LwI';

  // background video
  // 같은 동영상을 playlist, videoId에 넣으면 무한루프가 된다
  // 플레이 리스트 따로 안만들어도 되더라
  player = new YT.Player('video-embed', {});
  bg_video = new YT.Player('bg-video-embed', {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      loop: 1,
      playlist: videoId,
      controls: 0,
      autohide: 1,
      modestbranding: 1,
      vq: 'hd720'
    },
    videoId: videoId,
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
