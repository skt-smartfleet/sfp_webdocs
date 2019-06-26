'use strict';

function popup(title, text, callback) {
  $('body').append($('<div>').addClass('modalpop'));
  $('.modalpop').append($('<div>').addClass('modalpop-content'));
  $('.modalpop-content').append($('<div>').addClass('modalpop-header'));
  $('.modalpop-header').append($('<div>').addClass('title').text(title));
  $('.modalpop-header').append($('<div>').addClass('close'));
  $('.close').append($('<img>').attr('src','../images/icon-popup-close.svg'))
  $('.modalpop-content').append($('<div>').addClass('modalpop-sub'));
  $('.modalpop-sub').append($('<div>').addClass('choose'));
  $('.choose').append($('<span>').text(text));
  $('.modalpop-sub').append($('<div>').addClass('action-items'));
  $('.action-items').append($('<button>').addClass('btn').text('확인'));

  //닫기 아이콘 클릭 시 팝업 닫음
  $('.modalpop .close').on('click', function() {  
    if (typeof callback === 'function') {
      callback();
    }
    $('.modalpop').remove();
  });

  $('.modalpop .btn').on('click', function() {  
    if (typeof callback === 'function') {
      callback();
    }
    $('.modalpop').remove();
  });

  //윈도우 객체에 클릭 이벤트 걸고 이벤트 타겟이 이메일 무단 수집 거부일 시 팝업 닫음
  $(window).click(function(e) {
    if ($(e.target).attr('class') === 'modalpop') {
      if (typeof callback === 'function') {
        callback();
      }
      $('.modalpop').remove();
    }
  });
}