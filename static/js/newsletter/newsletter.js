function validCheck(email) {
  console.log("hear");
 
  //var email = document.querySelector('input[name=email]').value;
  if (email === '') {
    popup('뉴스레터 신청', '이메일을 입력해 주세요.', null);
    return false;
  }
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email)) {
    popup('뉴스레터 신청', '이메일 형식이 아닙니다.', null);
    return false;
  }
  return true;
}

function createNewsletter(url, isMobile) {
  var email = document.querySelector('input[name=email]').value;
  if (isMobile) {
    email = document.querySelector('input[name=email-mobile]').value;
  }
  if (!validCheck(email)) {
    return false;
  }
  
  checkPortalEmail(email, url);
}

function checkPortalEmail(email, url) {
  

  const COUNTURL = url + 'count';
  $.ajax({
    url: COUNTURL,
    async: false, 
    type: 'GET', 
    data: {where: {email: email}}, 
    dataType: 'json', 
    success: function(jqXHR) {
      if (jqXHR.count !== 0) {
        popup('뉴스레터 신청', '이미 신청된 이메일입니다.', null);
      } else {
        createComplete(email, url);
      }
    }, 
    error: function(jqXHR) {
      popup('뉴스레터 신청', '뉴스레터 신청에 실패했습니다. 잠시 후 다시 시도해 주세요.', null);
      console.log(jqXHR);
    }
  });
}

function createComplete(email, url) {
  const CREATEURL = url;

  $.ajax({
    url: CREATEURL,
    async: false, 
    type: 'POST', 
    data: {email: email}, 
    dataType: 'json', 
    success: function(jqXHR) {
      popup('뉴스레터 신청', '뉴스레터를 신청하였습니다.', null);
    }, 
    error: function(jqXHR) {
      popup('뉴스레터 신청', '뉴스레터 신청에 실패했습니다. 잠시 후 다시 시도해 주세요.', null);
      console.log(jqXHR);
    }
  });
}