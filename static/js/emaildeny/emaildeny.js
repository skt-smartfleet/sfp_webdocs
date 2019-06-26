'use strict';

function emaildeny() {
//   <div id="emaildenyModal" class="emaildeny-modal">
//   <div class="emaildeny-modal-content">
//     <span class="close">&times;</span>
//     <div class="emaildeny-modal-title">이메일 무단 수집거부</div>
//     <div class="emaildeny-modal-line"></div>
//     <div class="emaildeny-read">본 사이트에 게시되어 있는 이메일 주소가 전자우편 수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 거부하여 이를 위반시 정보통신망법에 의해 형사처벌됨을 유념하시기 바랍니다.</div>
//   </div>
// </div>

  //html 추가
  var emailDenyBox = $('<div>', {id: 'emaildenyModal'}).addClass('emaildeny-modal');
  var emailDenyContent = $('<div>').addClass('emaildeny-modal-content');
  $('body').append(emailDenyBox)
  .find('#emaildenyModal').append(emailDenyContent)
  .find('.emaildeny-modal-content').append($('<span>').addClass('close').html('&times;'))
  .append($('<div>').addClass('emaildeny-modal-title').text('이메일 무단 수집 거부'))
  .append($('<div>').addClass('emaildeny-modal-line'))
  .append($('<div>').addClass('emaildeny-read').text('본 사이트에 게시되어 있는 이메일 주소가 전자우편 수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 거부하여 이를 위반시 정보통신망법에 의해 형사처벌됨을 유념하시기 바랍니다.'));

  //닫기 아이콘 클릭 시 팝업 닫음
  $('#emaildenyModal .close').on('click', function() {  
    $('#emaildenyModal').remove();
  });

  //윈도우 객체에 클릭 이벤트 걸고 이벤트 타겟이 이메일 무단 수집 거부일 시 팝업 닫음
  $(window).click(function(e) {
    if ($(e.target).attr('id') === 'emaildenyModal') {
      $('#emaildenyModal').remove();
    }
  });
}