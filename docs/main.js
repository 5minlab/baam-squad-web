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

  // video-hero-height
  // 동영상이 차지할 영역은 하드코딩. 좌표계는 px
  var origElementHeight = 630;
  var origElementWidth = origVideoWidth * origElementHeight / origVideoHeight;

  if(w >= origElementWidth) {
    // 스크린 가로폭이 동영상 가로폭보다 큰 경우
    // 동영상을 가로폭에 맞춰서 확대후 위아래를 자른다
    var nextVideoWidth = w;
    var nextVideoHeight = origVideoHeight * nextVideoWidth / origVideoWidth;

    var e = $('.embed-container');
    var gap = (nextVideoHeight - origElementHeight) * 0.5;
    e.css('height', nextVideoHeight + 'px');
    e.css('width', nextVideoWidth + 'px');
    e.css('top', -gap+'px');
    e.css('left', '0px');
    e.css('clip-path', 'inset(0 0 ' + gap + 'px 0)');

  } else {
    // 스크린 가로폭보다 동영상 가로폭이 좁은 경우
    // 동영상을 세로높이에 맞춰서 확대후 좌우를 자른다
    var nextVideoHeight = origElementHeight;
    var nextVideoWidth = origVideoWidth * origElementHeight / origVideoHeight;

    var e = $('.embed-container');
    var verticalGap = (nextVideoHeight - origElementHeight) * 0.5;
    var horizontalGap = (nextVideoWidth - w) * 0.5;
    e.css('height', nextVideoHeight+'px');
    e.css('width', nextVideoWidth+'px');
    e.css('left', -horizontalGap+'px');
    e.css('top', -verticalGap+'px');
    e.css('clip-path', 'inset(0 0 0 0');
  }
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
